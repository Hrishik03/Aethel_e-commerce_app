import { Link } from 'react-router-dom'
import { ShoppingBag, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { toast } from 'sonner'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleQuickAdd = (e) => {
  e.preventDefault()
  addToCart(product, 'Default', 1)
  toast.success('Added to cart', {
    description: product.title.slice(0, 40) + '...',
  })
}

  const tag = product.rating?.rate >= 4.5
    ? 'Top Rated'
    : product.rating?.rate >= 4.0
    ? 'Popular'
    : null

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative bg-neutral-50 h-56 flex items-center justify-center p-6 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {tag && (
          <Badge className="absolute top-3 left-3 bg-neutral-950 text-white text-[10px] uppercase tracking-wider">
            {tag}
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-neutral-900 line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-auto">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-neutral-600 font-medium">
            {product.rating?.rate}
          </span>
          <span className="text-xs text-neutral-400">
            ({product.rating?.count})
          </span>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-base font-bold text-neutral-950">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleQuickAdd}
            className="bg-neutral-950 hover:bg-neutral-700 text-white text-xs rounded-xl gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard