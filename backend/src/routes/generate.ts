import { suggestionInput } from "@himanshu01/blog-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

export const generateRouter = new Hono<{
  Bindings: {
    A_DATABASE_URL: string;
    JWT_SECRET: string;
    OPENROUTER_API_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

generateRouter.post("/generate", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.A_DATABASE_URL,
  }).$extends(withAccelerate());

  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    c.status(401);
    return c.json({ message: "User not signed in" });
  }

  const body = await c.req.json();
  const parse = suggestionInput.safeParse(body);

  if (!parse.success) {
    return c.json({ error: "Invalid request body" }, 400);
  }

  const { title, content } = parse.data;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${c.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1:free",
          "messages": [
            {
               role: "system",
               content: "You are a helpful assistant that completes blog articles.",
            },
            {
               role: "user",
               content: `Continue the following blog post creatively and helpfully:\n\nTitle: ${title}\n\nContent:\n${content}\n\nContinue writing below:`,
            }
          ]
        })
      });

    if (!response.ok) {
      const err = await response.json();
      console.error("OpenRouter API error:", err);
      return c.json({ error: "Failed to generate AI suggestion" }, 500);
    }

    const data = await response.json();
    const suggestion = data.choices?.[0]?.message?.content ?? "No suggestion generated.";

    return c.json({ suggestion });
  } catch (err) {
    console.error("Unexpected error:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});
