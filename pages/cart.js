import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Asegúrate de tener instalada la librería axios
import JsBarcode from 'jsbarcode'; 
import { PDFDocument, rgb } from 'pdf-lib'; 
import styles from './cart.module.css';
import Navbar from './navbar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Función para calcular el total con IVA
  const getTotal = () => {
    const total = cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
    return total + total * 0.16; // Añadir 16% IVA
  };

  // Función para manejar la finalización del pedido y generar el PDF
  const handleCompleteOrder = async () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío. No se puede generar el pedido.");
      return;
    }

    // Datos a enviar al backend para actualizar el inventario
    const productos = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity
    }));

    try {
      // Enviar la solicitud POST al backend para actualizar el inventario
      await axios.post('http://localhost:5000/api/finalizar-pedido', { productos });

      // Crear el PDF
      const doc = await PDFDocument.create();
      const page = doc.addPage();
      const { width, height } = page.getSize();
      let y = height - 50;

      // Título del comprobante
      page.drawText('Comprobante de Pedido', { x: width / 2 - 85, y, size: 20, color: rgb(0, 0, 0) });
      y -= 30;

      // Detalles del pedido
      page.drawText('Detalles del Pedido:', { x: 10, y, size: 14, color: rgb(0, 0, 0) });
      y -= 20;

      // Detalles de los productos en el carrito
      cartItems.forEach((item, index) => {
        page.drawText(`${index + 1}. ${item.name}`, { x: 10, y, size: 12 });
        y -= 15;
        page.drawText(`   Descripción: ${item.description || 'Sin descripción'}`, { x: 10, y, size: 12 });
        y -= 15;
        page.drawText(`   Precio: $${item.price?.toFixed(2) || '0.00'}`, { x: 10, y, size: 12 });
        y -= 15;
        page.drawText(`   Cantidad: ${item.quantity}`, { x: 10, y, size: 12 });
        y -= 20;
      });

      // Total con IVA
      const total = getTotal();
      page.drawText(`Total (incluido IVA): $${total.toFixed(2)}`, { x: 10, y, size: 14, color: rgb(0, 0, 0) });
      y -= 95;

      // Generación del código de barras
      const barcodeValue = cartItems.map(item => `${item.name}${item.quantity}`).join("");
      const barcodeCanvas = document.createElement('canvas');
      JsBarcode(barcodeCanvas, barcodeValue, { format: 'CODE128' });
      const barcodeImage = barcodeCanvas.toDataURL('image/png');
      const barcodeImageBytes = await fetch(barcodeImage).then((res) => res.arrayBuffer());
      const barcodeImageEmbed = await doc.embedPng(barcodeImageBytes);
      const barcodeDims = barcodeImageEmbed.scale(0.5);
      page.drawImage(barcodeImageEmbed, { x: 10, y: y, width: barcodeDims.width, height: barcodeDims.height });
      y -= barcodeDims.height + 20;

      // Guardar y descargar el PDF
      const pdfBytes = await doc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = 'Comprobante_de_Pedido.pdf';
      link.click();

    } catch (error) {
      alert("Hubo un error al finalizar el pedido.");
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.cart}>
        <h1 className={styles.title}>Tu Carrito de Compras</h1>
        {cartItems.length === 0 ? (
          <p className={styles.empty}>Tu carrito está vacío</p>
        ) : (
          <div className={styles.items}>
            {cartItems.map((item, index) => (
              <div key={index} className={styles.item}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h2 className={styles.itemName}>{item.name}</h2>
                  <p className={styles.itemDescription}>{item.description || 'Sin descripción'}</p>
                  <p className={styles.itemPrice}>${item.price ? item.price.toFixed(2) : '0.00'}</p>
                  <div className={styles.itemQuantity}>
                    <label htmlFor={`quantity-${index}`}>Cantidad:</label>
                    <input
                      id={`quantity-${index}`}
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.total}>
              <h3>Total (incluido IVA): ${getTotal().toFixed(2)}</h3>
              <button className={styles.completeOrder} onClick={handleCompleteOrder}>Finalizar Pedido</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
