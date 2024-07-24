import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Clear the session or authentication token
  res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
  res.status(200).json({ message: 'Logout successful' });
}