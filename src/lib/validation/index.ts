import * as z from "zod";

// Schema
export const SignupValidation = z.object({
    name: z.string().min(2, {message: 'Too short'}),
    username: z.string().min(2, "Too short").max(50, "Too long"),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'})
})

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'})
})