import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold">Non trouvé</h2>
      <p className="mt-4">Impossible de trouver la ressource demandée</p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Retour à l'accueil
      </Link>
    </div>
  )
}
