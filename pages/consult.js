import { useState } from 'react';
import styles from './Products.module.css';
import Navbar from './navbar';

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
        throw new Error('Producto no encontrado');
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setProduct(null);
      setError(err.message);
    }
  };

  const handleAddToSales = () => {
    const storedCart = localStorage.getItem('salesCart');
    const salesCart = storedCart ? JSON.parse(storedCart) : [];

    salesCart.push({
      name: product.nombre,
      description: product.descripcion,
      price: product.precio,
      quantity: 1,
      code: product.codigoB,
      image: product.imagenUrl,
    });

    localStorage.setItem('salesCart', JSON.stringify(salesCart));
    alert('Producto agregado al Punto de Ventas');
  };

  const handleScanAnother = () => {
    setProductCode('');
    setProduct(null);
    setError('');
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Consulta de Productos</h1>
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
              <h2>{product.CNOMBREPRODUCTO}</h2>
              {product.imagenUrl && (
                <img src={product.imagenUrl} alt={product.nombre} className={styles.productImage} />
              )}
            </div>
            <div className={styles.productDetails}>
              <p><strong>Precio:</strong> ${product.CPRECIO1}</p>
              <p><strong>Descripción:</strong> {product.CNOMBREPRODUCTO}</p>
              <p><strong>Categoría:</strong> {product.CTIPOPRODUCTO}</p>
              <p><strong>Stock:</strong> {product.CCONTROLEXISTENCIA}</p>
              <p><strong>Código:</strong> {product.CCODIGOPRODUCTO}</p>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
