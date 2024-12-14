import { useRouter } from 'next/router';
import { Line, Bar, Doughnut } from 'react-chartjs-2'; // Importar gráficos de Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'; // Asegúrate de importar BarElement

import { FaHome, FaChartBar, FaBox, FaCogs } from 'react-icons/fa'; 
import styles from './dashboard.module.css';

// Registramos todos los elementos necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Esto registra el gráfico de barras
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const router = useRouter();

  // Datos de ejemplo para las gráficas
  const tiempoDeProcesoData = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Tiempo Promedio (horas)',
        data: [3, 2.5, 2, 1.5],
        fill: false,
        borderColor: '#053160',
        tension: 0.1,
      },
    ],
  };

  const stockDisponibleData = {
    labels: ['Producto A', 'Producto B', 'Producto C'],
    datasets: [
      {
        data: [85, 40, 60],
        backgroundColor: ['#053160', '#f9f638', '#ff4d4d'],
        borderColor: ['#053160', '#f9f638', '#ff4d4d'],
        borderWidth: 1,
      },
    ],
  };

  const pedidosEnColaData = {
    labels: ['Pedidos Pendientes'],
    datasets: [
      {
        data: [15],
        backgroundColor: ['#053160'],
        borderColor: ['#053160'],
        borderWidth: 1,
      },
    ],
  };

  const metasDeVentasData = {
    labels: ['Meta', 'Ventas Realizadas'],
    datasets: [
      {
        label: 'Ventas',
        data: [50000, 32000],
        backgroundColor: ['#053160', '#f9f638'],
        borderColor: ['#053160', '#f9f638'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`${styles.flex} ${styles.hScreen}`}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${styles.bgWhite}`}>
        <div className={styles.sidebarContent}>
          <h2 className={styles.sidebarTitle}>Sidebar</h2>
          <ul>
            <li className={styles.sidebarItem}>
              <FaHome className={styles.icon} />
            </li>
            <li className={styles.sidebarItem}>
              <FaChartBar className={styles.icon} />
            </li>
            <li className={styles.sidebarItem}>
              <FaBox className={styles.icon} />
            </li>
            <li className={styles.sidebarItem}>
              <FaCogs className={styles.icon} />
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${styles.flex} ${styles.flexCol} ${styles.flex1}`}>
        {/* Navbar */}
        {/* Aquí importas tu navbar como ya mencionaste */}
        
        {/* Cards */}
        <section className={`${styles.grid} ${styles.gridCols4} ${styles.gap4} ${styles.p4} ${styles.bgGray100}`}>
          <div
            className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd} ${styles.flexCol} ${styles.justifyBetween} ${styles.cursorPointer} ${styles.hoverBgGray200}`}
            onClick={() => router.push('/sales')}
          >
            <h3 className={`${styles.textLg} ${styles.fontBold}`}>Cotizaciones y Ventas</h3>
            <button className={`${styles.mt2} ${styles.bgBlue500} ${styles.textWhite} ${styles.px4} ${styles.py2} ${styles.rounded}`}>Ir</button>
          </div>
          <div
            className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd} ${styles.flexCol} ${styles.justifyBetween} ${styles.cursorPointer} ${styles.hoverBgGray200}`}
            onClick={() => router.push('/products')}
          >
            <h3 className={`${styles.textLg} ${styles.fontBold}`}>Consultas de Productos</h3>
            <button className={`${styles.mt2} ${styles.bgBlue500} ${styles.textWhite} ${styles.px4} ${styles.py2} ${styles.rounded}`}>Ir</button>
          </div>
          <div
            className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd} ${styles.flexCol} ${styles.justifyBetween} ${styles.cursorPointer} ${styles.hoverBgGray200}`}
            onClick={() => router.push('/warehouse')}
          >
            <h3 className={`${styles.textLg} ${styles.fontBold}`}>Pedidos de Almacén</h3>
            <button className={`${styles.mt2} ${styles.bgBlue500} ${styles.textWhite} ${styles.px4} ${styles.py2} ${styles.rounded}`}>Ir</button>
          </div>
          <div
            className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd} ${styles.flexCol} ${styles.justifyBetween} ${styles.cursorPointer} ${styles.hoverBgGray200}`}
            onClick={() => router.push('/production')}
          >
            <h3 className={`${styles.textLg} ${styles.fontBold}`}>Órdenes de Producción</h3>
            <button className={`${styles.mt2} ${styles.bgBlue500} ${styles.textWhite} ${styles.px4} ${styles.py2} ${styles.rounded}`}>Ir</button>
          </div>
        </section>

        {/* Estadísticas */}
        <section className={`${styles.p4} ${styles.bgGray100}`}>
          <h2 className={`${styles.text2Xl} ${styles.fontBold} ${styles.mb4}`}>Estadísticas</h2>
          <div className={`${styles.grid} ${styles.gridCols2} ${styles.gap4}`}>
            <div className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd}`}>
              <h3 className={`${styles.fontBold} ${styles.mb2}`}>Tiempo Promedio para Completar Pedidos</h3>
              <Line data={tiempoDeProcesoData} options={{ animation: { duration: 1000 } }} />
            </div>
            <div className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd}`}>
              <h3 className={`${styles.fontBold} ${styles.mb2}`}>Stock Disponible</h3>
              <Doughnut data={stockDisponibleData} options={{ animation: { animateScale: true } }} />
            </div>
            <div className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd}`}>
              <h3 className={`${styles.fontBold} ${styles.mb2}`}>Pedidos en Cola</h3>
              <Bar data={pedidosEnColaData} options={{ animation: { duration: 1500 } }} />
            </div>
            <div className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd}`}>
              <h3 className={`${styles.fontBold} ${styles.mb2}`}>Metas de Ventas</h3>
              <Bar data={metasDeVentasData} options={{ animation: { duration: 1500 } }} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${styles.bgGray800} ${styles.textWhite} ${styles.textCenter} ${styles.p4}`}>
          <p>© 2024 Dashboard App</p>
        </footer>
      </div>
    </div>
  );
}
