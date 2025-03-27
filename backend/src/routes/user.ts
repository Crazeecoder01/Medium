import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
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
  