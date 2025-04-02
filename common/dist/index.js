"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.premiumAccessInput = exports.subscriptionInput = exports.tipInput = exports.updateBlogInput = exports.signupInput = exports.signinInput = exports.createCommentInput = exports.createBlogInput = void 0;
const zod_1 = require("zod");
exports.createBlogInput = zod_1.z.object({
    title: zod_1.z.string().min(3),
    content: zod_1.z.string(),
    authorId: zod_1.z.string()
});
exports.createCommentInput = zod_1.z.object({
    content: zod_1.z.string().min(1, "Comment cannot be empty"),
    userId: zod_1.z.string(),
    postId: zod_1.z.string(),
});
exports.signinInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.signupInput = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.updateBlogInput = zod_1.z.object({
    title: zod_1.z.string().min(3),
    content: zod_1.z.string(),
});
exports.tipInput = zod_1.z.object({
    writerId: zod_1.z.string().uuid("Invalid writer ID format"),
    amount: zod_1.z.number().min(1, "Tip amount must be at least 1"),
});
exports.subscriptionInput = zod_1.z.object({
    writerId: zod_1.z.string().uuid("Invalid writer ID format"),
});
exports.premiumAccessInput = zod_1.z.object({
    postId: zod_1.z.string().uuid("Invalid post ID format"),
});
