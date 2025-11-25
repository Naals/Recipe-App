'use client'
import Image from "next/image";
import Link from "next/link";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@heroui/react";
import {usePathname} from "next/navigation";
import React from "react";
import RegistrationModal from "@/components/UI/modals/registration.modals";
import LoginModal from "@/components/UI/modals/login.modals";
import {signOutFunc} from "@/actions/sign-out";
import {useSession} from "next-auth/react";
import {useAuthStore} from "@/store/auth.store";

export const Logo = () => {
    return (
        <Image
            src="/vercel.svg"
            alt="Logo"
            width={26}
            height={26}
            priority
        />
    );
};

export default function Header() {

    const [isRegistrationOpen, setIsRegistrationOpen] = React.useState(false);
    const [isLoginOpen, setIsLoginOpen] = React.useState(false);
    const {isAuth, session, status, setAuthState} = useAuthStore();

    const pathname = usePathname();

    const navItems = [
        {href: '/', label: 'Recipes'},
        {href: '/ingredients', label: 'Ingredients'},
        {href: '/about', label: 'About Us'},
    ]

    const handleSignOut = async () => {
        try {
            await signOutFunc();
        } catch (err) {
            console.log("Error: " + err);
        }

        setAuthState("unauthenticated", null)
    }

    const handleLogIn = () => {
        try {
            setAuthState("authenticated", session)
            setIsLoginOpen(true);
        } catch (err) {
            console.log("Error: " + err);
        }
    }

    const getNavItems = () => {
        return (navItems.map((item) => {
            const isActive = pathname === item.href
            return (
                <NavbarItem key={item.href}>
                    <Link
                        color="foreground"
                        href={item.href}
                        className={`px-3 py-1 ${isActive ? "text-blue-500" : "text-foreground"} 
                                hover: text-blue-300 hover:border
                                hover: border-blue-300 hover: rounded-md
                                transition-colors
                                transition-border
                                duration-200`
                        }>
                        {item.label}
                    </Link>
                </NavbarItem>
            )
        }))
    }

    if (status === 'loading') {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <Navbar className='h-[60px]'>

            <NavbarBrand>
                <Link href="/public" className='flex gap-1'>
                    <Logo/>
                    <p className="font-bold text-inherit">Tatarian kitchen</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {getNavItems()}
            </NavbarContent>

            <NavbarContent justify="end">
                {isAuth ?
                    <NavbarItem className="hidden lg:flex">
                        <Button
                            as={Link}
                            href='#'
                            color='secondary'
                            variant='flat'
                            onPress={handleSignOut}>
                            Log out
                        </Button>
                    </NavbarItem>
                    :
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Button
                                as={Link}
                                href='#'
                                color='secondary'
                                variant='flat'
                                onPress={() => setIsLoginOpen(true)}>
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                as={Link}
                                href='#'
                                color='primary'
                                variant='flat'
                                onPress={handleLogIn}>
                                Register
                            </Button>
                        </NavbarItem>
                    </>
                }
            </NavbarContent>

            <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)}/>
            <LoginModal onClose={() => setIsLoginOpen(false)} isOpen={isLoginOpen}/>
        </Navbar>
    );
}
