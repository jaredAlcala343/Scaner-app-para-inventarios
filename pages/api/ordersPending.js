import { connectToDatabase, sql } from '../../dbConfig';

export default async function handler(req, res) {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .query('SELECT * FROM dbo.Orders WHERE status = \'En Espera\''); // Ajusta la lógica

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching pending orders:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}