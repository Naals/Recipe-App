import NextAuth from "next-auth"
import {ZodError} from "zod"
import Credentials from "next-auth/providers/credentials"
import {signInSchema} from "@/schema/zod"
import bcrypt from "bcryptjs"
import {getUserFromDb} from "@/utils/user"
import prisma from "../../lib/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        console.log("1error")
                        throw new Error("Email and password are required")
                    }
                    const {email, password} = await signInSchema.parseAsync(credentials)
                    console.log(credentials)

                    const user = await getUserFromDb(email)

                    if (!user) {
                        console.log("2error")
                        throw new Error("User does not exist")
                    }

                    const isPasswordValid = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if(!isPasswordValid){
                        console.log("3error")
                        throw new Error("Invalid credentials")
                    }

                    return {id: user.id, email: user.email}

                } catch (error) {
                    if (error instanceof ZodError) {
                        // Return `null` to indicate that the credentials are invalid
                        console.log("4error")
                        throw new Error("Error: "+error.message)
                    }
                    console.log("5error")
                    return null
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 3600
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token;
        }
    }
})