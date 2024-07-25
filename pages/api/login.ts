import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import supabase from '../../lib/supabase';

interface User {
  id: string;
  passwordHash: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Find the user by username
    const { data: user, error } = await supabase
      .from('Admin')
      .select('id, passwordHash')
      .eq('username', username)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the password with the stored hash
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // If valid, return success response
    return res.status(200).json({ message: 'Login successful' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}