import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-32 flex flex-col items-center text-center gap-5">
      <h1 className="text-8xl font-black text-neutral-100">404</h1>
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Page not found</h2>
        <p className="text-sm text-neutral-400 mt-1">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link to="/">
        <Button className="bg-neutral-950 hover:bg-neutral-700 text-white rounded-xl gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  )
}

export default NotFound