import { createContext, useContext, useState, useMemo } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product, selectedSize, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize
      )
      if (existingIndex !== -1) {
        return prev.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
        )
      }
      return [...prev, { ...product, selectedSize, quantity }]
    })
  }

  const removeFromCart = (id, selectedSize) => {
    setCart(prev => prev.filter(
      item => !(item.id === id && item.selectedSize === selectedSize)
    ))
  }

  const updateQuantity = (id, selectedSize, quantity) => {
    if (quantity < 1) return
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => setCart([])

  const cartCount = useMemo(() =>
    cart.reduce((total, item) => total + item.quantity, 0), [cart])

  const cartSubtotal = useMemo(() =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart])

  const shipping = useMemo(() =>
    cartSubtotal === 0 ? 0 : cartSubtotal > 150 ? 0 : 15, [cartSubtotal])

  const cartTotal = useMemo(() =>
    cartSubtotal + shipping, [cartSubtotal, shipping])

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      cartTotal,
      shipping
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)