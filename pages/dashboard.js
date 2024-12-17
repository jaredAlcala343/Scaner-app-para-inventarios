import { useRouter } from 'next/router';
import { Line, Bar, Doughnut } from 'react-chartjs-2'; // Importar gráficos de Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'; // Asegúrate de importar BarElement
import Navbar from './navbar';
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
      

      {/* Main Content */}
      <div className={`${styles.flex} ${styles.flexCol} ${styles.flex1}`}>
        {/* Navbar */}
        <Navbar />
        {/* Aquí importas tu navbar como ya mencionaste */}
        
        {/* Cards */}
        <section className={`${styles.grid} ${styles.gridCols4} ${styles.gap4} ${styles.p4} ${styles.bgGray100}`}>
          <div className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd} ${styles.flexCol} ${styles.justifyBetween} ${styles.cursorPointer} ${styles.hoverBgGray200}`}
            onClick={() => router.push('/sales')}>
            <h3 className={`${styles.textLg} ${styles.fontBold} ${styles.textCenter}`}>Cotizaciones y Ventas</h3>
          </div>
          <div className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd} ${styles.flexCol} ${styles.justifyBetween} ${styles.cursorPointer} ${styles.hoverBgGray200}`}
            onClick={() => router.push('/consult')}>
            <h3 className={`${styles.textLg} ${styles.fontBold} ${styles.textCenter}`}>Consultas de Productos</h3>
          </div>
          <div className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd} ${styles.flexCol} ${styles.justifyBetween} ${styles.cursorPointer} ${styles.hoverBgGray200}`}
            onClick={() => router.push('/products')}>
            <h3 className={`${styles.textLg} ${styles.fontBold} ${styles.textCenter}`}>Pedidos de Almacén</h3>
          </div>
          <div className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd} ${styles.flexCol} ${styles.justifyBetween} ${styles.cursorPointer} ${styles.hoverBgGray200}`}
            onClick={() => router.push('/produccion')}>
            <h3 className={`${styles.textLg} ${styles.fontBold} ${styles.textCenter}`}>Órdenes de Producción</h3>
          </div>
        </section>

        {/* Estadísticas */}
        <section className={`${styles.p4} ${styles.bgGray100}`}>
          <h2 className={`${styles.text2Xl} ${styles.fontBold} ${styles.mb4}`}>Estadísticas</h2>
          <div className={`${styles.grid} ${styles.gridCols2} ${styles.gap4}`}>
            <div className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd}`}>
              <h3 className={`${styles.fontBold} ${styles.mb2} ${styles.textCenter}`}>Tiempo Promedio para Completar Pedidos</h3>
              <Line data={tiempoDeProcesoData} options={{ animation: { duration: 1000 } }} />
            </div>
            <div className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd}`}>
              <h3 className={`${styles.fontBold} ${styles.mb2} ${styles.textCenter}`}>Stock Disponible</h3>
              <Doughnut data={stockDisponibleData} options={{ animation: { animateScale: true } }} />
            </div>
            <div className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd}`}>
              <h3 className={`${styles.fontBold} ${styles.mb2} ${styles.textCenter}`}>Pedidos en Cola</h3>
              <Bar data={pedidosEnColaData} options={{ animation: { duration: 1500 } }} />
            </div>
            <div className={`${styles.bgWhite} ${styles.p4} ${styles.shadowMd} ${styles.roundedMd}`}>
              <h3 className={`${styles.fontBold} ${styles.mb2} ${styles.textCenter}`}>Metas de Ventas</h3>
              <Bar data={metasDeVentasData} options={{ animation: { duration: 1500 } }} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${styles.fontBold} ${styles.bgGray800} ${styles.textWhite} ${styles.textCenter} ${styles.p4}`}>
          <p>© 2024 CUBYLAM & CHALET bykzstudio</p>
        </footer>
      </div>
    </div>
  );
}
