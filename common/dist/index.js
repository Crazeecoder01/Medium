"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.signupInput = exports.signinInput = exports.createBlogInput = void 0;
const zod_1 = require("zod");
exports.createBlogInput = zod_1.z.object({
    title: zod_1.z.string().min(3),
    content: zod_1.z.string(),
    authorId: zod_1.z.string()
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
