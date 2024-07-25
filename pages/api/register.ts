import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import supabase from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password, name } = req.body;

    // Check if the user already exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from('Admin')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUserError && existingUserError.code !== 'PGRST116') {
      return res.status(500).json({ message: 'Error checking existing user' });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the new user
    const { error: insertError } = await supabase
      .from('Admin')
      .insert([
        { username, passwordHash, name }
      ]);

    if (insertError) {
      return res.status(500).json({ message: 'Error creating user' });
    }

    return res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}