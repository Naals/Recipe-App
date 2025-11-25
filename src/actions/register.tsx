"use server";


import { saltAndHashPassword } from "@/utils/password";
import { ZodError } from "zod";
import {registerSchema} from "@/schema/register.zod";
import prisma from "../../lib/prisma";
import {FormData} from "@/types/form-data";

export async function registerUser(data: FormData) {
    try {
        const parsed = await registerSchema.parseAsync(data);
        const { email, password, confirmPassword } = parsed;

        if (password !== confirmPassword) {
            return { error: "Passwords do not match" };
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "User with this email already exists" };
        }

        const pwHash = await saltAndHashPassword(password);

        await prisma.user.create({
            data: {
                email,
                password: pwHash,
            },
        });

        return { success: true };

    } catch (err) {
        console.error("Register error:", err);

        if (err instanceof ZodError) {
            return { error: err.flatten().fieldErrors };
        }

        return { error: "Something went wrong during registration" };
    }
}
