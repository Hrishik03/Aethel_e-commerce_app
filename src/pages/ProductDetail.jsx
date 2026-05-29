import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Star, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Minus,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useCart } from '@/context/CartContext'
import { toast} from 'sonner'
import useFetch from '@/hooks/useFetch'

const TRUST_BADGES = [
  { icon: Truck, label: 'Free Shipping', sub: 'On orders over $150' },
  { icon: ShieldCheck, label: 'Secure Payment', sub: 'SSL encrypted checkout' },
  { icon: RotateCcw, label: 'Easy Returns', sub: '30-day return policy' },
]

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const { data: product, loading, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`
  )

  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const SIZES = ['XS', 'S', 'M', 'L', 'XL']

  const handleAddToCart = () => {
  const isClothing = ["men's clothing", "women's clothing", "mens clothing", "womens clothing"].includes(product.category)
  addToCart(product, isClothing ? selectedSize : 'N/A', quantity)
  setAdded(true)
  toast.success('Added to cart', {
    description: `${product.title.slice(0, 40)}...${isClothing ? ` — Size: ${selectedSize}` : ''}`,
  })
  setTimeout(() => setAdded(false), 2000)
}

  if (error) return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center text-neutral-400 text-sm">
      Failed to load product. Please try again.
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to products
      </button>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-10">
          <Skeleton className="h-[450px] w-full rounded-2xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>
      ) : product && (
        <div className="grid md:grid-cols-2 gap-10">

          {/* Product Image */}
          <div className="bg-neutral-50 rounded-2xl flex items-center justify-center p-12 h-[450px] border border-neutral-100">
            <img
              src={product.image}
              alt={product.title}
              className="h-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-4">

            {/* Category + Badge */}
            <div className="flex items-center gap-2">
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium capitalize">
                {product.category}
              </p>
              {product.rating?.rate >= 4.5 && (
                <Badge className="bg-amber-100 text-amber-700 text-[10px] uppercase tracking-wider border-0">
                  Top Rated
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-neutral-950 leading-snug">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating?.rate)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-neutral-200 text-neutral-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-neutral-700">
                {product.rating?.rate}
              </span>
              <span className="text-sm text-neutral-400">
                ({product.rating?.count} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-neutral-950">
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <p className="text-sm text-neutral-500 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            {['mens clothing', 'womens clothing', "men's clothing", "women's clothing"].includes(product.category) && (
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                  Size: <span className="text-neutral-900">{selectedSize}</span>
                </p>
                <div className="flex items-center gap-2">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium border transition-all
                        ${selectedSize === size
                          ? 'bg-neutral-950 text-white border-neutral-950'
                          : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-semibold w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className={`w-full py-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 gap-2
                ${added
                  ? 'bg-emerald-600 hover:bg-emerald-600 text-white'
                  : 'bg-neutral-950 hover:bg-neutral-700 text-white'
                }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-neutral-50 border border-neutral-100"
                >
                  <Icon className="w-4 h-4 text-neutral-600" />
                  <p className="text-[10px] font-semibold text-neutral-700">{label}</p>
                  <p className="text-[9px] text-neutral-400">{sub}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail