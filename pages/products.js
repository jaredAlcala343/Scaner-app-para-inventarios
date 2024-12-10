import { useState } from 'react';
import styles from './Products.module.css';
import Navbar from '@/app/navbar';

export default function Products() {
  const [productCode, setProductCode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`/api/data?code=${productCode}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setProduct(null);
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className={styles.container}>
        <h1 className={styles.title}>ESCANEE O INGRESE EL CÓDIGO DE SU PRODUCTO</h1>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <label>
            Código del Producto:
            <input
              type="text"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.button}>Buscar</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {product && (
          <div className={styles.productInfo}>
            <div className={styles.productHeader}>
              <h2>{product.nombre}</h2>
              {product.imagenUrl && (
                <img src={product.imagenUrl} alt={product.nombre} className={styles.productImage} />
              )}
            </div>
            <div className={styles.productDetails}>
              <p><strong>Precio:</strong> ${product.precio}</p>
              <p><strong>Descripción:</strong> {product.descripcion}</p>
              <p><strong>Categoría:</strong> {product.categoria}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Marca:</strong> {product.marca}</p>
              <p><strong>Código:</strong> {product.codigoB}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}