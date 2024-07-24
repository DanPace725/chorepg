import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-24">
      <h1 className="text-4xl text-white mb-8">Log in to get started</h1>
      <Link href="/login" className="bg-blue-500 text-white p-4 rounded">Login</Link>
    </main>
  );
}
