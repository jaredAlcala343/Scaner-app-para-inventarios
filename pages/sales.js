import { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import styles from './Sales.module.css';
import Navbar from './navbar';

export default function Sales() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('salesCart');
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    setCart(cartItems);
    calculateTotal(cartItems);
  }, []);

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(total);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem('salesCart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('salesCart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleCompleteOrder = async () => {
    // Generar PDF del comprobante
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    let y = height - 50;

    // Título del comprobante
    page.drawText('Comprobante de Compra', { x: width / 2 - 120, y, size: 20, color: rgb(0, 0, 0) });
    y -= 30;

    // Detalles de los productos
    cart.forEach((item, index) => {
      page.drawText(
        `${index + 1}. ${item.name} (${item.code}) - Cantidad: ${item.quantity} - Precio: $${item.price.toFixed(2)}`,
        { x: 50, y, size: 12 }
      );
      y -= 20;
    });

    // Total de la compra
    y -= 20;
    page.drawText(`Total (con IVA): $${(total * 1.16).toFixed(2)}`, { x: 50, y, size: 14, color: rgb(0, 0, 0) });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'comprobante_de_compra.pdf';
    link.click();

    // Actualizar inventario en la base de datos
    await Promise.all(
      cart.map((item) =>
        fetch('/api/updateStock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: item.code, quantity: item.quantity }),
        })
      )
    );

    // Vaciar carrito
    localStorage.removeItem('salesCart');
    setCart([]);
    setTotal(0);
    alert('Compra finalizada con éxito');
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Punto de Ventas</h1>
        <div className={styles.cart}>
          {cart.length === 0 ? (
            <p className={styles.emptyCart}>El carrito está vacío.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <div>
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price.toFixed(2)}</p>
                  <p>Código: {item.code}</p>
                  <p>
                    Cantidad:
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                      className={styles.quantityInput}
                    />
                  </p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button onClick={() => handleRemoveItem(index)} className={styles.removeItemButton}>
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className={styles.summary}>
            <h2>Total (sin IVA): ${total.toFixed(2)}</h2>
            <h2>Total (con IVA): ${(total * 1.16).toFixed(2)}</h2>
            <button onClick={handleCompleteOrder} className={styles.completeOrderButton}>
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}