import { createBlogInput, updateBlogInput, createCommentInput } from "@himanshu01/blog-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { getCachedBlogs, setCachedBlogs } from '../utils/blogCache';

export const blogRouter = new Hono<{
    Bindings: {
        A_DATABASE_URL: string,
        JWT_SECRET: string,
        UPSTASH_REDIS_REST_URL: string,
        UPSTASH_REDIS_REST_TOKEN: string,
    },
    Variables:{
        userId: string
    },
 
}>()

blogRouter.use('/*', async(c, next)=>{
    const header = c.req.header('Authorization') || ""
    // Bearer token => ['Bearer', 'token']
    const token = header?.split(' ')[1]
    
    if(!token){
      c.status(401)
      return c.json({message: 'no token provided'})
    }
    try{
        const payload = await verify(token, c.env.JWT_SECRET)
        // a type check to ensure that the payload.id is a string
        if (typeof payload.id !== "string") {
            throw new Error("Invalid token: userId must be a string");
        }
        // console.log("JWT_SECRET:", c.env.JWT_SECRET);

        // we signed the jwt with an id so we can get the id from the response
        if(payload){
            c.set('userId', payload.id )
            await next()
        }else{
            c.status(401)
            return c.json({message: 'invalid token, no payload'})
        }
    }catch(e){
        c.status(401)
        return c.json({message: 'invalid token'})
    }
   
})
  
  
blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    const prisma =  new PrismaClient({
        datasourceUrl: c.env.A_DATABASE_URL,
    }).$extends(withAccelerate())
    const {success} = createBlogInput.safeParse(body)
    if(!success){
        c.status(400)
        return c.json({message: 'invalid input'})
    }
    const userId = c.get('userId')
    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: userId, //string
            publishedAt: new Date(),
            tags: body.tags,
            isPremium: body.isPremium,
            // coverImage: body.coverImage
        }
    })
    return c.json({id: blog.id})
})

blogRouter.put('/', async(c) => {
    const body = await c.req.json()
    const prisma =  new PrismaClient({
        datasourceUrl: c.env.A_DATABASE_URL,
    }).$extends(withAccelerate())
     const {success} = updateBlogInput.safeParse(body)
        if(!success){
          c.status(400)
          return c.json({message: 'invalid input'})
        }
    const blog = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })
    return c.json({id: blog.id})

})

// pagination

blogRouter.get('/bulk', async (c) => {
    const cached = await getCachedBlogs(c.env);
    if (cached) {
      return c.json({fromCache: true, blogs: cached });
    }
    
    const prisma =  new PrismaClient({
        datasourceUrl: c.env.A_DATABASE_URL,
    }).$extends(withAccelerate())
   
   
    try{
        const blogs = await prisma.post.findMany({
            select:{
                id: true,
                title: true,
                content: true,
                publishedAt: true,
                published:true,
                author:{
                    select:{
                        name: true,
                        id: true
                    }
                },
                tags: true,
                isPremium: true,
            }
        })
        

        await setCachedBlogs(c.env, blogs);
        return c.json({blogs})
    }catch(e){
        c.status(411)
        return c.json({message: 'Error while fetching blogs'})
    }
})


blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.A_DATABASE_URL,
    }).$extends(withAccelerate());
  
    const secret = c.env.JWT_SECRET;
  
    try {
      const blog = await prisma.post.findFirst({
        where: { id },
        select: {
          id: true,
          title: true,
          content: true,
          publishedAt: true,
          published: true,
          tags: true,
          isPremium: true,
          author: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
  
    //   if (!blog) {
    //     return c.json({ message: "Blog not found" });
    //   }
  
      if (blog?.isPremium) {
        const authHeader = c.req.header("Authorization");
  
        if (!authHeader) {
          return c.json({ message: "Authentication required" });
        }
  
        const token = authHeader.split(" ")[1];
        const decoded = await verify(token, secret);
        const userId = decoded.id as string;
  
        const subscription = await prisma.userSubscription.findUnique({
          where: { userId },
          include: { plan: true },
        });
        if(userId != blog.author.id){
            if (!subscription || new Date(subscription.expiresAt) < new Date()) {
            return c.json({ status: 403, message: "Premium subscription required"});
            }
        }
      }
  
      return c.json({ blog });
  
    } catch (e) {
      console.error("Error fetching blog:", e);
      return c.json({ status:500, message: "Internal server error" });
    }
  });
  

blogRouter.post('/comments', async (c) =>{
    const body = await c.req.json()
    const prisma =  new PrismaClient({
        datasourceUrl: c.env.A_DATABASE_URL,
    }).$extends(withAccelerate())
    const {success} = createCommentInput.safeParse(body)
    console.log("createCommentInput:", createCommentInput);
    console.log("safeParse function:", createCommentInput?.safeParse);

    if(!success){
        c.status(400)
        return c.json({message: 'invalid input'})
    }
    const userId = c.get('userId')
    const comment = await prisma.comment.create({
        data:{
            content: body.content,
            createdAt: new Date(),
            postId: body.postId,
            userId: userId,
        },
        // include: {
        //     user: true,
        // },
    })
    return c.json({id: comment.id, postid: comment.postId})
})
blogRouter.get('/comments/:id', async (c) => {
    const id = c.req.param('id')
    const prisma =  new PrismaClient({
        datasourceUrl: c.env.A_DATABASE_URL,
    }).$extends(withAccelerate())
    const comments = await prisma.comment.findMany({
        where:{
            postId: id
        },
        include:{
            user: true,
        }
    })
    return c.json(comments)
})

