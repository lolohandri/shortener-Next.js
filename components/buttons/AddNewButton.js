"use client"
import {AiOutlinePlus} from "react-icons/ai";
import {useSession} from "next-auth/react";
import Link from "next/link";

const AddNewButton = ({children, ...props}) => {
    const {data} = useSession()
    return (
        <>
            {data?.user ?
                <div className="flex flex-row text-xs text-neutral-500 items-center m-5">
                    <Link className="btn" {...props}><AiOutlinePlus/>{children}</Link>
                </div>
                : null
            }
        </>
    )
}
export default AddNewButton