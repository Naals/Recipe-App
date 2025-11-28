import {number, object, string, z} from "zod";

export const signInSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email"),

    password: z
        .string()
        .min(1, "Password is required")
});

export type SignInSchema = z.infer<typeof signInSchema>;


export const ingredientSchema = object({
    name: string().min(1, "Название обязательно"),
    category: z.enum([
        "VEGETABLES",
        "FRUITS",
        "MEAT",
        "DAIRY",
        "SPICES",
        "OTHER"
    ]),
    unit: z.enum(["GRAMS", "KILOGRAMS", "LITERS", "MILLILITERS", "PIECES"]),
    pricePerUnit: number({ invalid_type_error: "Цена должна быть числом" })
        .min(0, "Цена должна быть положительной")
        .nullable(),
    description: z.string().optional()
});