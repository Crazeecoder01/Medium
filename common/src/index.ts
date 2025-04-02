import { z } from "zod"
export const createBlogInput = z.object({
    title: z.string().min(3),
    content: z.string(),
    authorId: z.string()
})
export const createCommentInput = z.object({
    content: z.string().min(1, "Comment cannot be empty"),
    userId: z.string(),
    postId: z.string(),
});
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const signupInput = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
})

export const updateBlogInput = z.object({
    title: z.string().min(3),
    content: z.string(),
})
export const tipInput = z.object({
    writerId: z.string().uuid("Invalid writer ID format"),
    amount: z.number().min(1, "Tip amount must be at least 1"),
});

export const subscriptionInput = z.object({
    writerId: z.string().uuid("Invalid writer ID format"),
});

export const premiumAccessInput = z.object({
    postId: z.string().uuid("Invalid post ID format"),
});
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type SigninInput = z.infer<typeof signinInput>
export type SignupInput = z.infer<typeof signupInput>
export type CreateCommentInput = z.infer<typeof createCommentInput>
export type TipInput = z.infer<typeof tipInput>;
export type SubscriptionInput = z.infer<typeof subscriptionInput>;
export type PremiumAccessInput = z.infer<typeof premiumAccessInput>;
