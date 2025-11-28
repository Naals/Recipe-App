'use client'

import {useSession} from "next-auth/react";
import {useAuthStore} from "@/store/auth.store";
import React, { useEffect} from "react";
import { useIngredientStore } from "@/store/ingredient.store";

interface Props {
    children: React.ReactNode;
}

export const AppLoader = ({children}: Props) => {
    const {data: session, status} = useSession();
    const {ingredients, loadIngredients} = useIngredientStore();
    const {isAuth, setAuthState} = useAuthStore();

    useEffect(() => {
        setAuthState(status, session);
    }, [status, session, setAuthState]);

    useEffect(() => {
        if(isAuth) {
            loadIngredients();
        }
    }, [isAuth, loadIngredients]);

    console.log('Ingredients1', ingredients);

    return (
        <>{children}</>
    )
}