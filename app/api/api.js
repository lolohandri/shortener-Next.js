import toast from "react-hot-toast";

export const getAllLinks = async () => {
    return await fetch(`${process.env.BASE_URL}/links`, {cache: 'no-store'})
        .then(res => res.json())
        .catch(err => {toast.error(err.message)})
}
export const login = async (username, password) => {
    return await fetch(`${process.env.BASE_URL}/auth/login`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
        .then(res => {return res.json()})
        .catch(err => {toast.error(err.message)})
}

export const createLink = async (originUrl, accessToken) => {
    return await fetch(`${process.env.BASE_URL}/links`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            originUrl
        })
    })
        .then((res) => {
            return res
        })
        .catch(err => {
            console.log(err.message)
        })
}

export const deleteLink = async(id, accessToken) =>{
    return await fetch(`${process.env.BASE_URL}/links/${id}`, {
        method: 'DELETE',
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
        .catch(err=> {
            toast.error(err.message)
        })
}