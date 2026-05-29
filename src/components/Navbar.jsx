import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Search, User, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { cartCount } = useCart()
  const { isLoggedIn, user, logout } = useAuth()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="font-bold text-xl tracking-tight text-neutral-950 shrink-0">
          AETHEL
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-neutral-50 border-neutral-200 text-sm"
          />
        </form>

        {/* Right Icons */}
        <div className="flex items-center gap-3">

          {/* Mobile Search Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          {/* User / Logout */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100">
                <div className="w-5 h-5 rounded-full bg-neutral-950 flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold uppercase">
                    {user?.username?.[0] || user?.name?.[0] || 'U'}
                  </span>
                </div>
                <span className="text-xs font-medium text-neutral-700 capitalize">
                  {user?.username || user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-neutral-500 hover:text-red-500 transition-colors" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
              <User className="w-5 h-5 text-neutral-700" />
            </Link>
          )}


          {/* Cart */}
          <Link to="/cart" className="p-2 rounded-lg hover:bg-neutral-100 transition-colors relative">
            <ShoppingBag className="w-5 h-5 text-neutral-700" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px] bg-neutral-950 text-white rounded-full">
                {cartCount}
              </Badge>
            )}
          </Link>

        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 border-t border-neutral-100">
          <form onSubmit={handleSearchSubmit} className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-neutral-50 border-neutral-200 text-sm w-full"
              autoFocus
            />
          </form>
        </div>
      )}
    </header>
  )
}

export default Navbar