import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { createClient } from 'edgedb';

const client = createClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password, name } = req.body;

    // Check if the user already exists
    const existingUser = await client.querySingle(`
      SELECT Admin { id }
      FILTER .username = <str>$username
    `, { username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the new user
    await client.query(`
      INSERT Admin {
        username := <str>$username,
        passwordHash := <str>$passwordHash,
        name := <str>$name
      }
    `, { username, passwordHash, name });

    return res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}