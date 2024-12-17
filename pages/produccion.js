import React from "react";  
import Navbar from "./navbar";
import styles from './produccion.module.css';

export default function Produccion() {
    return (
        <div>
            <Navbar />
            <h1 className={styles.title}>Panel de Administración de Producción</h1>
            <div className={styles.parent}>
                <div className={`${styles.panel} ${styles.div2}`}>Este panel es el footer</div>
                <div className={`${styles.panel} ${styles.div3}`}>Este es el panel de órdenes en espera</div>
                <div className={`${styles.panel} ${styles.div4}`}>Este es el panel de órdenes en producción</div>
                <div className={`${styles.panel} ${styles.div5}`}>Este es el panel de órdenes finalizadas</div>
                <div className={`${styles.panel} ${styles.div6}`}>Este es un panel gráfico de órdenes activas</div>
                <div className={`${styles.panel} ${styles.div7}`}>Este es un panel con órdenes en espera de atención</div>
                <div className={`${styles.panel} ${styles.div8}`}>Este es un panel con las órdenes terminadas durante el día</div>
            </div>
        </div>
    );
}
