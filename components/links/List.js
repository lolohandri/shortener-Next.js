import LinkItem from "@/components/links/LinkItem";
import moment from "moment/moment";
import {getAllLinks} from "@/app/api/api";
import {useEffect, useState} from "react";
import Loading from "@/components/responses/Loading";
import NoData from "@/components/responses/NoData";

const List = () =>{
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getAllLinks().then((data) => {
            setResult(data)
            setLoading(false)
        })
    }, [])
    if (loading) return <Loading/>
    if (result?.length === 0 || !result) return <NoData/>
    return(
        <div>
            <ul>
                {result && result.map((link) => <li key={link.id}>
                    <LinkItem data={
                        {
                            id: link.id,
                            originLink: link.originUrl,
                            shortLink: link.shortUrl,
                            createdAt: moment(link.date).format('MMMM Do YYYY, h:mm:ss a'),
                            createdBy: link.createdBy
                        }
                    }/>
                </li>)}
            </ul>
        </div>
    )
}
export default List