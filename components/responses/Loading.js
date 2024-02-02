import styles from "@/app/styles.module.css";

const Loading = () => {
    return (
        <div className="flex justify-center items-center">
            <div className={styles.elipsis}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
export default Loading