import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const doc = new PDFDocument();
    let y = 10;

    // Título del comprobante
    doc.fontSize(16).text('Comprobante de Pedido', 200, y, { align: 'center' });
    y += 20;

    // Agrega más detalles como productos, total, etc. (similar a lo que hacías antes)

    // Devuelve el PDF como un archivo de descarga
    const filePath = path.join(process.cwd(), 'comprobante.pdf');
    doc.pipe(fs.createWriteStream(filePath));
    doc.end();

    // Espera a que el archivo se cree y luego lo envía
    doc.on('finish', () => {
      res.status(200).json({ message: 'PDF generado con éxito' });
    });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
