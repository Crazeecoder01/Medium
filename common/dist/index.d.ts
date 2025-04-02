import { z } from "zod";
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    authorId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    authorId: string;
}, {
    title: string;
    content: string;
    authorId: string;
}>;
export declare const createCommentInput: z.ZodObject<{
    content: z.ZodString;
    userId: z.ZodString;
    postId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    userId: string;
    postId: string;
}, {
    content: string;
    userId: string;
    postId: string;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const signupInput: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const tipInput: z.ZodObject<{
    writerId: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    writerId: string;
    amount: number;
}, {
    writerId: string;
    amount: number;
}>;
export declare const subscriptionInput: z.ZodObject<{
    writerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    writerId: string;
}, {
    writerId: string;
}>;
export declare const premiumAccessInput: z.ZodObject<{
    postId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postId: string;
}, {
    postId: string;
}>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type SignupInput = z.infer<typeof signupInput>;
export type CreateCommentInput = z.infer<typeof createCommentInput>;
export type TipInput = z.infer<typeof tipInput>;
export type SubscriptionInput = z.infer<typeof subscriptionInput>;
export type PremiumAccessInput = z.infer<typeof premiumAccessInput>;
