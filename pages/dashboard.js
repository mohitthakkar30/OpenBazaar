import styles from "../styles/dashboard.module.scss";
import Link from "next/link";
import React from "react";
export default function Dashboard() {
    return (
    
        <>
        <div className={styles.dashboard}>
            <h1>Dashboard</h1>
            </div>
       
            {/* <div className={styles.dashboard}>
                <div className={styles.btngrp}>
                    <Link href="/publish">
                        <a
                            className={
                                currentRoute === "/publish" ? styles.active : ""
                            }
                        >
                            <h2>Publish</h2>
                        </a>
                    </Link>
                    <Link href="/listings">
                    <a
                            className={
                                currentRoute === "/listings" ? styles.active : ""
                            }
                        >
                        <h2>Listings</h2>
                        </a>
                    </Link>
                    <Link href="/inventory">
                    <a
                            className={
                                currentRoute === "/inventory" ? styles.active : ""
                            }
                        >
                        <h2>Inventory</h2>
                        </a>
                    </Link>
                </div>
            </div> */}
        </>
    );
}
