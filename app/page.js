"use client"
import {useState} from "react";
import List from "@/components/links/List";
import Modal from "@/components/Modal";
import AddNewButton from "@/components/buttons/AddNewButton";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export default function Home() {
    const router = useRouter()
    const {data} = useSession()
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <Modal onClose={() => router.push('/')} user={data?.user}/>
            <AddNewButton href="/?showDialog=true">Add new item</AddNewButton>
            <List/>
        </>
    )
}
