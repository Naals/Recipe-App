'use client'

import {useSession} from "next-auth/react";
import {useAuthStore} from "@/store/auth.store";
import React, { useEffect} from "react";
import { useIngredientStore } from "@/store/ingredient.store";
import { useRecipeStore } from "@/store/recipe.store";

interface Props {
    children: React.ReactNode;
}

export const AppLoader = ({children}: Props) => {
    const {data: session, status} = useSession();
    const {ingredients, loadIngredients} = useIngredientStore();
    const {isAuth, setAuthState} = useAuthStore();
    const {loadRecipes} = useRecipeStore();

    useEffect(() => {
        setAuthState(status, session);
    }, [status, session, setAuthState]);

    useEffect(() => {
        if(isAuth) {
            loadIngredients();
        }
    }, [isAuth, loadIngredients]);

    useEffect(() => {
        loadRecipes();
    }, [loadRecipes]);

    return (
        <>{children}</>
    )
}