import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'
import useFetch from '@/hooks/useFetch'

const CATEGORIES = ['All', "men's clothing", "women's clothing", 'electronics', 'jewelery']

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')

  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products')

  const searchQuery = searchParams.get('search') || ''

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchParams({ search: searchInput.trim() })
    } else {
      setSearchParams({})
    }
  }

  const clearSearch = () => {
    setSearchInput('')
    setSearchParams({})
  }

  const filteredProducts = useMemo(() => {
    if (!products) return []
    let result = [...products]

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory)
    }

    if (searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating') result.sort((a, b) => b.rating.rate - a.rating.rate)

    return result
  }, [products, selectedCategory, searchQuery, sortBy])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Hero Banner */}
      <div className="rounded-2xl bg-neutral-950 text-white px-8 py-12 mb-10 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium">New Season Arrivals</p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Curated for the <br />
          <span className="text-neutral-400">Modern Wardrobe</span>
        </h1>
        <p className="text-sm text-neutral-400 max-w-md">
          Discover premium products crafted for quality and style. Free shipping on orders over $150.
        </p>
        <Button
          onClick={() => document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' })}
          className="mt-2 w-fit bg-white text-neutral-950 hover:bg-neutral-200 font-semibold rounded-xl"
        >
          Shop Now
        </Button>
      </div>

      {/* Mobile Search */}
      <form onSubmit={handleSearch} className="flex md:hidden gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9 bg-white border-neutral-200 text-sm"
          />
        </div>
        <Button type="submit" className="bg-neutral-950 text-white rounded-xl">Search</Button>
      </form>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

        {/* Category Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-neutral-400 shrink-0" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all capitalize
                ${selectedCategory === cat
                  ? 'bg-neutral-950 text-white border-neutral-950'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-xs border border-neutral-200 rounded-xl px-3 py-2 bg-white text-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-400 w-fit"
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Active Search Tag */}
      {searchQuery && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-neutral-500">Results for:</span>
          <span className="flex items-center gap-2 bg-neutral-100 text-neutral-800 text-xs font-medium px-3 py-1 rounded-full">
            {searchQuery}
            <button onClick={clearSearch}>
              <X className="w-3 h-3 ml-1 hover:text-red-500" />
            </button>
          </span>
        </div>
      )}

      {/* Product Grid */}
      {error ? (
        <div id="product-grid" className="text-center py-20 text-neutral-400 text-sm">
          Failed to load products. Please try again.
        </div>
      ) : loading ? (
        <div id="product-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div id="product-grid" className="text-center py-20 text-neutral-400 text-sm">
          No products found. Try a different search or filter.
        </div>
      ) : (
        <div id="product-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  )
}

export default Home