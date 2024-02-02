"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import styles from "../app/styles.module.css";

const ActiveLink = ({children, ...props}) => {
    const path = usePathname()
    return(
        <Link {...props} className={path === props.href ? styles.active : styles.link}>
            {children}
        </Link>
    )
}
export default ActiveLink