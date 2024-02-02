import styles from '@/app/styles.module.css';
import {TfiFaceSad} from "react-icons/tfi";
const NoData = () => {
    return(
        <div className="flex flex-col items-center">
            <TfiFaceSad />
            <p>Nothing to display</p>
        </div>
    )
}
export default NoData