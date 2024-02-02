"use client"
import {useSearchParams} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {RxCross2} from "react-icons/rx";
import {createLink} from "@/app/api/api";
import toast from "react-hot-toast";

const Modal = ({onClose, user}) => {
    const searchParams = useSearchParams()
    const dialogRef = useRef(null)
    const showDialog = searchParams.get('showDialog')
    const [loading, setLoading] = useState(false)
    const [inputData, setInputData] = useState('')

    useEffect(() => {
        if (showDialog === 'true') {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [showDialog])

    const closeDialog = () => {
        onClose()
        setInputData('')
    }

    const handleOk = async (e) => {
        try{
            setLoading(true)
            let res = await createLink(inputData, user?.accessToken)
            if(!res?.ok){
                res = await res.json()
                toast.error(res? res?.message : "Server not responding!")
                setLoading(false)
            }
            else{
                toast.success("Successfully created!")
                closeDialog()
                setLoading(false)
            }
        }catch (err){
            toast.error(err.message)
            setLoading(false)
        }
    }

    return showDialog  === 'true' ?
        (
            <dialog className="card w-1/2 rounded-xl shadow-xl" ref={dialogRef} onClose={(e) => {
                closeDialog()
            }}>
                {/*heading*/}
                <div className="flex flex-row justify-between p-5 items-center">
                    <h1 className="font-bold">Add new link item</h1>
                    <button
                        className="hover:bg-neutral-200 active:bg-red-500 rounded-full flex justify-center items-center w-7 h-7"
                        onClick={closeDialog}><RxCross2 className="w-5 h-5"/></button>
                </div>

                {/*content*/}
                <div className="p-5 flex items-center flex-col gap-5">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text font-bold">Input url</span>
                        </div>
                        <input type="text"
                               placeholder="https://example.com"
                               className="input input-bordered input-error w-full max-w-xs"
                               required
                               autoComplete='url'
                               value = {inputData}
                               onChange={(event) => {
                                   setInputData(event.currentTarget.value)
                               } }
                        />
                    </label>
                    <button className="btn w-44"
                            disabled={loading || !inputData}
                            onClick={handleOk}
                    >
                        {loading ? "Please wait..." : "Submit"}
                    </button>
                </div>
            </dialog>
        )
        : null
}
export default Modal