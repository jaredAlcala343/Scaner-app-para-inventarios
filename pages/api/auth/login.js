import { connectToDatabase, sql } from '../../../dbConfig';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM dbo.Usuarios WHERE NumeroEmpleado = @username');

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = result.recordset[0];

    const passwordIsValid = user.Contraseña === password;

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user.Id, name: user.Nombre, area: user.Area, puesto: user.Puesto },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);

    console.log('Login successful');
    // Enviamos la URL de redirección en la respuesta JSON
    return res.status(200).json({ message: 'Login successful', redirectUrl: '/products' });
  } catch (error) {
    console.error('Login error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
