import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ShieldCheck, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/context/CartContext'

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    cartTotal,
    shipping
  } = useCart()

  const freeShippingThreshold = 150
  const remainingForFreeShipping = freeShippingThreshold - cartSubtotal

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center gap-5 text-center">
        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center">
          <ShoppingBag className="w-9 h-9 text-neutral-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Your cart is empty</h2>
          <p className="text-sm text-neutral-400 mt-1">
            Looks like you haven't added anything yet.
          </p>
        </div>
        <Link to="/">
          <Button className="bg-neutral-950 hover:bg-neutral-700 text-white rounded-xl gap-2">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Your Cart</h1>
          <p className="text-sm text-neutral-400 mt-0.5">
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-neutral-400 hover:text-red-500 transition-colors underline underline-offset-2"
        >
          Clear cart
        </button>
      </div>

      {/* Free Shipping Progress */}
      {cartSubtotal < freeShippingThreshold && (
        <div className="mb-6 bg-neutral-50 border border-neutral-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            <p className="text-xs text-neutral-600">
              Add{' '}
              <span className="font-bold text-emerald-700">
                ${remainingForFreeShipping.toFixed(2)}
              </span>{' '}
              more to unlock <span className="font-bold">Free Shipping</span>
            </p>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-1.5">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((cartSubtotal / freeShippingThreshold) * 100, 100)}%`
              }}
            />
          </div>
        </div>
      )}

      {cartSubtotal >= freeShippingThreshold && (
        <div className="mb-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-2">
          <Truck className="w-4 h-4 text-emerald-600" />
          <p className="text-xs text-emerald-700 font-semibold">
            🎉 You've unlocked Free Shipping!
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {cart.map((item, index) => (
            <div
              key={`${item.id}-${item.selectedSize}`}
              className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 flex gap-4"
            >
              {/* Product Image */}
              <Link
                to={`/product/${item.id}`}
                className="bg-neutral-50 rounded-xl h-24 w-24 shrink-0 flex items-center justify-center p-2 hover:opacity-80 transition-opacity"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full object-contain"
                />
              </Link>

              {/* Details */}
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium capitalize">
                  {item.category}
                </p>
                <Link
                  to={`/product/${item.id}`}
                  className="text-sm font-semibold text-neutral-900 line-clamp-2 leading-snug hover:underline"
                >
                  {item.title}
                </Link>
                <p className="text-xs text-neutral-400">
                  Size: <span className="text-neutral-600 font-medium">{item.selectedSize}</span>
                </p>
                <p className="text-sm font-bold text-neutral-950 mt-auto">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Quantity + Remove */}
              <div className="flex flex-col items-end justify-between shrink-0">
                <button
                  onClick={() => removeFromCart(item.id, item.selectedSize)}
                  className="text-neutral-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 border border-neutral-200 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-semibold w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <Link to="/" className="w-fit">
            <button className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors group mt-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </button>
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 sticky top-24">
            <h2 className="text-xs uppercase tracking-widest font-bold text-neutral-950 mb-4 pb-3 border-b border-neutral-100">
              Order Summary
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm text-neutral-600">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-medium">${cartSubtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-neutral-600">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider">
                    Free
                  </span>
                ) : (
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                )}
              </div>

              <Separator className="my-1" />

              <div className="flex justify-between text-neutral-950 font-bold">
                <span>Total</span>
                <span className="text-xl">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full mt-6 py-6 bg-neutral-950 hover:bg-neutral-700 text-white rounded-xl font-semibold text-sm tracking-wide"
              onClick={() => alert('Checkout coming soon!')}
            >
              Proceed to Checkout
            </Button>

            {/* Trust Signal */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Secure SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart