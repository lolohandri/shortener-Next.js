"use client"
import {useRouter} from "next/navigation";
import {deleteLink} from "@/app/api/api";
import {FaRegTrashAlt} from "react-icons/fa";
import {useSession} from "next-auth/react";

const DeleteButton = ({id}) =>{
    const {data} = useSession()
    const router = useRouter()
    const handleDelete = async (e) => {
        await deleteLink(id, data.user.accessToken)
        router.push('/')
    }
    return(
    <button onClick={handleDelete} className="btn btn-outline btn-error">
        <FaRegTrashAlt/>
    </button>)
}
export default DeleteButton