import Login from "./Login";
import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <div className={styles.nav}>
            <div className={styles.logo}>
                {/* <Image src="/logo.png" width={400} height={400} alt="" /> */}
            </div>
            {/* <div className={styles.rightDiv}>
                <Link href="/store">
                    <a className={
                            currentRoute === "/store" ? styles.active : ""
                        }
                    >
                        <h3>Store</h3>
                    </a>
                </Link>
                <Link href="/publish">
                    <a className={
                            currentRoute === "/publish" ? styles.active : ""
                        }
                    >
                        <h3>Dashboard</h3>
                    </a>
                </Link> */}
                <div>
                <Login />
            </div>
        </div>
    );
}
