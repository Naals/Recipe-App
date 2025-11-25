import {create} from "zustand/react";
import {Session} from "next-auth";

type sessionStatus = "authenticated" | "unauthenticated" | "loading";

interface AuthState {
    isAuth: boolean,
    session: Session | null,
    status: sessionStatus,
    setAuthState: (status: sessionStatus, session: Session | null) => void,
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: false,
    status: "unauthenticated",
    session: null,
    setAuthState: (status: sessionStatus, session: Session | null) => {
        set({
            isAuth: status === "authenticated",
            status,
            session,
        });
    }
}))