'use server'


import {FormData} from "@/types/form-data";
import prisma from "../../lib/prisma";

export async function registerUser(data: FormData) {

    try {
        await prisma.user.create({
            data: {
                email: data.email,
                password: data.password
            }
        });
    } catch (err) {
        console.error(err);
        return "Error: " +err;
    }

}