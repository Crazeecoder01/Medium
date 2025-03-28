import { createBlogInput, updateBlogInput } from "@himanshu01/blog-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        A_DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables:{
        userId: string
    }
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
        // we signed the jwt with an id so we can get the id from the response
        if(payload){
            c.set('userId', payload.id )
            await next()
        }else{
            c.status(401)
            return c.json({message: 'invalid token'})
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
                        name: true    
                    }
                },
                tags: true
            }
        })
        return c.json({blogs})
    }catch(e){
        c.status(411)
        return c.json({message: 'Error while fetching blogs'})
    }
})


blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id")
    const prisma =  new PrismaClient({
        datasourceUrl: c.env.A_DATABASE_URL,
    }).$extends(withAccelerate())
    try{

        const blog = await prisma.post.findFirst({
            where:{
                id: id
            },
            select:{
                id: true,
                title: true,
                content: true,
                publishedAt: true,
                published:true,
                author:{
                    select:{
                        name: true    
                    }
                },
                tags: true
            }
        })
        return c.json({blog})
    }catch(e){
        c.status(411)
        return c.json({message: 'Error while fetching blog'})
    }
})



