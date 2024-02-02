"use client"
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await signIn('credentials', {
                redirect: false,
                username,
                password
            })

            if(res?.error) {
                toast.error(res?.error)
                setLoading(false)
            }
            else{
                toast.success('Successfully logged in!')
                router.push('/')
            }
        } catch (err) {
            toast.error(err)
            setLoading(false)
        }
    }
    return (
        <div className="flex min-h-full flex-col justify-center h-screen bg-gray-100 w-full items-center">
            <div className="border-2 rounded-xl shadow-2xl bg-neutral-100 p-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image className="mx-auto h-10 w-auto"
                           src="/logo.png" alt="Your Company" height={70} width={70}/>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-700">Sign in
                        to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={event => handleLoginSubmit(event)}>
                        <div>
                            <label htmlFor="username"
                                   className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <div className="mt-2">
                                <input id="username" name="username" type="text" autoComplete="username" required
                                       value={username}
                                       onChange={event => {
                                           setUsername(event.currentTarget.value)
                                       }}
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password"
                                       required
                                       value={password}
                                       onChange={event => {
                                           setPassword(event.currentTarget.value)
                                       }}
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    className="flex w-full justify-center rounded-md bg-neutral-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
                                    disabled={loading || !username || !password}
                            >
                                {loading ? "Please wait.." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoginForm