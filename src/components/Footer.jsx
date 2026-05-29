import { Link } from 'react-router-dom'
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white mt-16">

      {/* Trust Bar */}
      <div className="border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Truck, label: 'Free Shipping', sub: 'On orders over $150' },
            { icon: ShieldCheck, label: 'Secure Payments', sub: 'SSL encrypted checkout' },
            { icon: RotateCcw, label: 'Easy Returns', sub: '30-day return policy' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-neutral-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-neutral-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
          <span className="font-bold text-lg tracking-tight">AETHEL</span>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
            Curated premium products for the modern wardrobe. Quality over quantity, always.
          </p>
        </div>

        {/* Shop */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest font-bold text-neutral-400">Shop</p>
          {["men's clothing", "women's clothing", 'electronics', 'jewelery'].map(cat => (
            <Link
              key={cat}
              to={`/?category=${cat}`}
              className="text-xs text-neutral-400 hover:text-white transition-colors capitalize"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Help */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest font-bold text-neutral-400">Help</p>
          {['FAQ', 'Shipping Policy', 'Returns', 'Track Order'].map(item => (
            <span
              key={item}
              className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Company */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest font-bold text-neutral-400">Company</p>
          {['About Us', 'Careers', 'Press', 'Contact'].map(item => (
            <span
              key={item}
              className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {item}
            </span>
          ))}
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-neutral-500">
            © {new Date().getFullYear()} Aethel Studio. All rights reserved.
          </p>
          {/* <p className="text-[11px] text-neutral-500">
            Built with React + Tailwind + shadcn/ui
          </p> */}
        </div>
      </div>

    </footer>
  )
}

export default Footer