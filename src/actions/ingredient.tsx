'use server'

import prisma from "../../lib/prisma";
import {ingredientSchema} from "@/schema/zod";
import {ZodError} from "zod";


export async function createIngredient(formData: FormData) {
    try{
        console.log('Creating Ingredient...')

        const data = {
            name: formData.get("name") as string,
            category: formData.get("category") as string,
            unit: formData.get("unit") as string,
            pricePerUnit: formData.get("pricePerUnit")
                ? Number.parseFloat(formData.get("pricePerUnit") as string)
                : null,
            description: formData.get("description") as string
        }

        const validatedData = ingredientSchema.parse(data);

        const ingredient = await prisma.ingredients.create({
            data: {
                name: validatedData.name,
                category: validatedData.category,
                unit: validatedData.unit,
                pricePerUnit: validatedData.pricePerUnit,
                description: validatedData.description
            }
        });

        return { success: true, ingredient };
    } catch (err) {
        if(err instanceof ZodError) {
            return { error: err.issues.map((e) => e.message).join(", ") };
        }
        return err;
    }
}

export async function getIngredients() {
    try{
        const ingredients = await prisma.ingredients.findMany();
        console.log('Fetched Ingredients: ', ingredients);
        return {success: true, ingredients};
    } catch (err) {
        console.error(err);
        return {error: "Ingredients not found"}
    }
}

export async function deleteIngredient(id: string) {
    try{
        const ingredient = await prisma.ingredients.delete({
            where: {id}
        });

        return {success: true, ingredient};
    } catch (err) {
        console.error(err);
        return {error: "Error deleting ingredient"}
    }
}