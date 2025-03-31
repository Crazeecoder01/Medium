import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import {signinInput, signupInput } from "@himanshu01/blog-common";
export const userRouter = new Hono<{
    Bindings: {
        A_DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>()

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.A_DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const {success} = signinInput.safeParse(body)
    if(!success){
      c.status(400)
      return c.json({message: 'invalid input'})
    }
    try{

      const user =  await prisma.user.findUnique({
        where:{
          email: body.email,
          password: body.password
        }
      })
      
      if(!user){
        c.status(401);
        return c.json({message: 'user not found'})
      }
      
      const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
      return c.json({jwt, message: 'user found'})
    }catch(e){
      c.status(401)
      return c.json({message: 'error while signing in'})
    }
  })
  
userRouter.post('/signup', async (c) => {
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.A_DATABASE_URL,
      }).$extends(withAccelerate()) 

      const body = await c.req.json();

      const {success} = signupInput.safeParse(body)
      if(!success){
        c.status(400)
        return c.json({message: 'invalid input'})
      }
      try{
        const existingUser = await prisma.user.findUnique({
          where: { email: body.email },
        });
    
        if (existingUser) {
          c.status(409);
          return c.json({ message: 'User already exists', status: 409 });
        }
        const user = await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
            password: body.password,
          },
        })
        
        const secret = c.env.JWT_SECRET
        const token = await sign({id: user.id}, secret)
        return c.json({jwt: token})
      }catch(e){
        c.status(401)
        return c.json({message: "error while signing up"})
      }
})

userRouter.get('/me', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.A_DATABASE_URL,
  }).$extends(withAccelerate());

  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    c.status(401);
    return c.json({ message: "Unauthorized: No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload || !payload.id) {
        c.status(401);
        return c.json({ message: "Unauthorized: Invalid token" });
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.id.toString() },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,         
        }
    });

    if (!user) {
        c.status(404);
        return c.json({ message: "User not found" });
    }
    return c.json({success:true, user});
  } catch (error) {
    c.status(401);
    return c.json({ message: "Unauthorized: Token verification failed" });
  }
});
userRouter.post('/signout', async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.A_DATABASE_URL,
    }).$extends(withAccelerate());
    
    try{
      const authHeader = await c.req.header("Authorization");
      if (!authHeader) {
          c.status(401);
          return c.json({ message: "User not signed in" });
      }

   
      return c.json({ message: "Successfully signed out" });
      
    }catch(e){
      c.status(500);
      return c.json({ message: "Error while signing out" });
    }

})

userRouter.get('/plans', async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.A_DATABASE_URL,
    }).$extends(withAccelerate()) 

    try{
      const plans = await prisma.subscriptionPlan.findMany();
      return c.json(plans);
    }catch(e){
      c.status(500);
      return c.json({  message: "Error fetching plans" }); 
    }
})

userRouter.post('/subscribe', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.A_DATABASE_URL,
    }).$extends(withAccelerate()) 

    const body = await c.req.json();
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      c.status(401);
      return c.json({ message: "User not signed in" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = await verify(token, c.env.JWT_SECRET) ;
    let userId = decoded.id as string;
    try{
      const plan = await prisma.subscriptionPlan.findUnique({
        where:{
          id: body.planId
        }
      })
      if (!plan) {
        c.status(400);
        return c.json({ message: "Invalid plan" });
      }

      // Calculate expiration date
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + plan.duration);

      await prisma.userSubscription.upsert({
        where: { userId },
        update: { planId: body.planId, expiresAt },
        create: { userId, planId: body.planId, expiresAt },
      });

      return c.json({ message: "Subscribed successfully", expiresAt });

    }catch(error) {
      c.status(500);
      return c.json({ message: "Error subscribing", error });
    }

})

userRouter.get('/subscription-status', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.A_DATABASE_URL,
  }).$extends(withAccelerate()) 
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    c.status(401);
    return c.json({ message: "User not signed in" });
  }

  const token = authHeader.split(" ")[1];
  const secret = c.env.JWT_SECRET;
  const decoded = await verify(token, secret);
  const userId = decoded.id as string;

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
    include: { plan: true },
  });

  if (!subscription || new Date(subscription.expiresAt) < new Date()) {
    return c.json({ isSubscribed: false });
  }

  return c.json({ isSubscribed: true, plan: subscription.plan });
});
userRouter.post('/cancel-subscription', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.A_DATABASE_URL,
  }).$extends(withAccelerate()) 

  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    c.status(401);
    return c.json({ message: "User not signed in" });
  }

  const token = authHeader.split(" ")[1];
  const secret = c.env.JWT_SECRET;
  const decoded = await verify(token, secret);
  const userId = decoded.id as string;

  try {
    await prisma.userSubscription.delete({ where: { userId } });
    return c.json({ message: "Subscription canceled" });
  } catch (error) {
    c.status(500);
    return c.json({ message: "Error canceling subscription" });
  }
});
