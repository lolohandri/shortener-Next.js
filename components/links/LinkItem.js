"use client"
import Link from "next/link";
import {FaTrashCan} from "react-icons/fa6";
import {useSession} from "next-auth/react";
import DeleteButton from "@/components/buttons/DeleteButton";

const LinkItem = ({data}) => {
    const {data: session, status} = useSession()
    console.log(data.id)
    return (
        <div className="shadow-md flex flex-row bg-white m-5 p-5 rounded-lg">
            <div className="flex flex-col text-neutral-500 items-center">
                <span>Original</span>
                <span>Short</span>
                <span>Date</span>
            </div>
            <div className="border-2 ml-10 border-red-400"></div>
            <div key={data.id} className="flex flex-col ml-5">
                <Link className="hover:text-red-600" href={data.originLink}>{data.originLink}</Link>
                <Link className="hover:text-red-600"
                      href={`http://localhost:7575/${data.shortLink}`}>{`http://localhost:7575/${data.shortLink}`}</Link>
                <span>{data.createdAt}</span>
            </div>
            {session?.user.username === data.createdBy && status !== 'loading' ?
                <div className="flex ml-auto justify-center gap-5">
                    <div className="border-2 ml-10 border-red-400"></div>
                    <div className="flex items-center">
                        <DeleteButton id={data.id}/>
                    </div>
                </div> : null
            }
        </div>

    )
}
export default LinkItem