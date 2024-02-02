"use client"
import Link from "next/link";
import ActiveLink from "@/components/ActiveLink";
import Image from "next/image";
import {signOut, useSession} from "next-auth/react";

const Navbar = () => {
    const {data, status} = useSession();
    return (<nav
        className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 shadow-lg lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div className="ml-2 flex gap-5">
                <div className="flex flex-row gap-3">
                    <Image src="/images.png" alt="Company logo"
                           width={30}
                           height={30}/>
                    <Link className="text-xl font-semibold text-neutral-800" href='/'>
                        Shortener
                    </Link>
                </div>
                <div className="border-2 border-neutral-400"></div>
                <ActiveLink href="/">
                    Home
                </ActiveLink>
                <ActiveLink href="/about">
                    About
                </ActiveLink>
            </div>
            {data?.user ?
                <div className="flex gap-5">
                    {status === 'loading' ?
                        <span>Loading...</span>
                        :
                        <div className="flex gap-1">
                            <p>Welcome, </p>
                            <ActiveLink href='/dashboard'><strong>{`${data.user.username}`}</strong>!</ActiveLink>
                        </div>
                    }
                    <button
                        className="hover:transition-colors hover:text-black hover:duration-1000 transition-colors text-red-600 duration-1000"
                        onClick={() => signOut()}>Log out
                    </button>
                </div>
                :
                status === 'loading' ?
                    <span>Loading...</span>
                    :
                    <div className="ml-auto flex flex-row gap-3">
                        <ActiveLink href={'/login'}>
                            Login
                        </ActiveLink>
                        <Link href={'/register'}
                              className="hover:transition-colors hover:text-black hover:duration-1000 transition-colors text-red-600 duration-1000">Register</Link>
                    </div>
            }

        </div>
    </nav>)
}
export default Navbar