'use client'
import {useSession} from "next-auth/react";
import {useAuthStore} from "@/store/auth.store";
import React, {useEffect} from "react";

interface Props {
    children: React.ReactNode;
}

export const AppLoader = ({children}: Props) => {
    const {data: session, status} = useSession();
    const {setAuthState} = useAuthStore();

    useEffect(() => {
        setAuthState(status, session);
    }, [status, session, setAuthState]);

    return (
        <>{children}</>
    )
}