import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Flame,
  Pipette,
  RotateCcw,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Droplets,
  Leaf,
  Menu,
  Moon,
  Sun,
  Truck,
  Flower2,
  Sprout,
  Wheat,
  Hand,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  X,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  MessageCircle,
} from 'lucide-react'

const bottleStyles = {
  'hair-fall-control': { color: '#8e2430', lines: ['HAIR FALL', 'CONTROL'] },
  'deep-growth-shine': { color: '#0f6b4f', lines: ['DEEP GROWTH', '& SHINE'] },
  'anti-dandruff-care': { color: '#127a86', lines: ['ANTI-', 'DANDRUFF'] },
  'frizz-dryness-repair': { color: '#6a3fa0', lines: ['FRIZZ &', 'DRYNESS'] },
  'split-end-care': { color: '#b4552d', lines: ['SPLIT ENDS', '& DAMAGE'] },
  'oily-scalp-balance': { color: '#1f5fa8', lines: ['OILY SCALP', 'BALANCE'] },
}

const products = [
  {
    id: 'miracle-oil',
    name: 'HairGrow Miracle Oil (100ml)',
    detail: '100 ml · small-batch botanical blend',
    price: 1200,
    image: '/img/p-miracle-oil.jpg',
    imageAlt: 'Amber botanical hair oil bottle with natural ingredients',
    label: 'The original',
    description: 'A concentrated botanical scalp ritual for stronger roots and softer, naturally glossy lengths.',
    volume: '100 ml',
    concerns: ['hairfall', 'growth'],
  },
  {
    id: 'mega-volume-pack',
    name: 'HairGrow Mega Volume Pack (250ml)',
    detail: '250 ml · extended volume ritual',
    price: 2600,
    image: '/img/p-mega-volume-pack.jpg',
    imageAlt: 'Botanical hair and skin care bottles arranged in natural light',
    label: 'More to love',
    description: 'A generous 250 ml supply of our signature oil for an easy, consistent weekly routine.',
    volume: '250 ml',
    concerns: ['packs'],
  },
  {
    id: 'root-ritual-double-pack',
    name: 'Root Ritual Double Pack',
    detail: '2 × 100 ml · the signature oil duo',
    price: 2200,
    image: '/img/p-root-ritual-double-pack.jpg',
    imageAlt: 'Premium botanical cosmetic oil bottles in a soft studio setting',
    label: 'The daily duo',
    description: 'Two easy-to-reach bottles: keep one at home and one close to your everyday routine.',
    volume: '2 × 100 ml',
    concerns: ['packs'],
  },
  ...[
    ['hair-fall-control', 'Hair Fall Control', 'Hair fall', 'hairfall', 'v-hairfall', 'Rosemary and amla to nourish the roots and help reduce breakage-related hair fall.', ['Rosemary Extract', 'Amla Bio-nutrients', 'Kalonji Seeds', 'Cold-Pressed Coconut Oil']],
    ['deep-growth-shine', 'Deep Growth & Shine', 'Growth & shine', 'growth', 'v-growth', 'Argan oil and vitamin E to support thicker-looking hair with a brilliant, healthy shine.', ['Argan Oil', 'Vitamin E', 'Walnut Oil', 'Aloe Vera']],
    ['anti-dandruff-care', 'Anti-Dandruff Care', 'Dandruff & itch', 'dandruff', 'v-dandruff', 'Tea tree and lavender to soothe an itchy scalp and help keep flakes under control.', ['Tea Tree Extract', 'Lavender', 'Neem Leaf', 'Aloe Vera']],
    ['frizz-dryness-repair', 'Frizz & Dryness Repair', 'Frizz & dryness', 'dryness', 'v-frizz', 'Aloe vera and coconut to hydrate dry, frizzy lengths and leave hair soft and smooth.', ['Aloe Vera', 'Argan Oil', 'Cold-Pressed Coconut Oil', 'Vitamin E']],
    ['split-end-care', 'Split Ends & Damage Care', 'Split ends', 'damage', 'v-split', 'Walnut and argan oils to smooth rough ends and protect hair that feels damaged.', ['Walnut Oil', 'Argan Oil', 'Amla Bio-nutrients', 'Vitamin E']],
    ['oily-scalp-balance', 'Oily Scalp Balance', 'Oily scalp', 'oily', 'v-oily', 'Mint and rosemary for a fresh, light-feeling scalp that stays balanced between washes.', ['Mint Leaf', 'Rosemary Extract', 'Lavender', 'Aloe Vera']],
  ].map(([id, name, label, concern, photo, description, ingredients]) => ({
    id, name: `HairGrow ${name} (100ml)`, detail: '100 ml · targeted botanical blend', price: 1200,
    image: `/img/p-${id}.jpg`, imageAlt: `HairGrow ${name} herbal hair oil`, label, description, volume: '100 ml', concerns: [concern], ingredients, 
  })),
]

const concernFilters = [
  ['all', 'All'], ['hairfall', 'Hair fall'], ['growth', 'Growth & shine'], ['dandruff', 'Dandruff & itch'],
  ['dryness', 'Frizz & dryness'], ['damage', 'Split ends'], ['oily', 'Oily scalp'], ['packs', 'Value packs'],
]

function formatPrice(amount) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

export const FREE_SHIPPING_THRESHOLD = 2000
export const STANDARD_SHIPPING_FEE = 200

export function calculateShippingFee(subtotal) {
  if (!subtotal || subtotal <= 0) return 0
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE
}

function createOrderReference() {
  const dateCode = new Date().toISOString().slice(2, 10).replaceAll('-', '')
  const randomCode = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `HG-${dateCode}-${randomCode}`
}

function buildWhatsAppOrderMessage(order) {
  if (!order) return ''
  const itemsList = (order.items || [])
    .map((item) => `• ${item.quantity}× ${item.name} (${formatPrice(item.price * item.quantity)})`)
    .join('\n')

  const paymentText = order.payment === 'cod' ? 'Cash on Delivery' : 'Easypaisa'
  const shippingText = order.shippingFee === 0 ? 'FREE (Unlocked)' : formatPrice(order.shippingFee)
  const grandTotal = order.total || order.subtotal

  return [
    '🌿 *HairGrow Order Summary*',
    `*Order Reference:* ${order.reference}`,
    `*Customer:* ${order.name}`,
    `*Phone:* ${order.phone}`,
    '',
    '*Items Ordered:*',
    itemsList,
    '',
    `*Subtotal:* ${formatPrice(order.subtotal)}`,
    `*Delivery Charges:* ${shippingText}`,
    `*Total Amount:* *${formatPrice(grandTotal)}*`,
    `*Payment Method:* ${paymentText}`,
    `*Shipping Address:* ${order.address}`,
    '',
    'Please confirm my order and share the parcel tracking number. Thank you!',
  ].join('\n')
}

function getWhatsAppOrderUrl(order) {
  if (!order) return '#'
  const message = buildWhatsAppOrderMessage(order)
  return `https://wa.me/923001234567?text=${encodeURIComponent(message)}`
}

const ORDER_STORAGE_KEY = 'hairgrow-orders'
const TRACKING_STAGES = ['Pending', 'Confirmed', 'Packed', 'Dispatched', 'Delivered']

function readSavedOrders() {
  const saved = localStorage.getItem(ORDER_STORAGE_KEY)
  if (!saved) return []
  const parsed = JSON.parse(saved)
  if (!Array.isArray(parsed)) throw new Error('Saved orders are not in the expected format.')
  return parsed
}

function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '')
}

function TrackOrderModal({ open, onClose }) {
  const [trackedOrder, setTrackedOrder] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) {
      setTrackedOrder(null)
      setError('')
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.classList.add('drawer-open')
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('drawer-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const reference = String(form.get('reference') || '').trim().toUpperCase()
    const phone = normalizePhone(form.get('phone'))

    if (!reference || !phone) {
      setTrackedOrder(null)
      setError('Enter your Order ID and the phone number used at checkout.')
      return
    }

    try {
      const match = readSavedOrders().find((savedOrder) =>
        typeof savedOrder?.reference === 'string' &&
        savedOrder.reference.toUpperCase() === reference &&
        normalizePhone(savedOrder.phone) === phone
      )

      if (!match) {
        setTrackedOrder(null)
        setError('We could not find an order matching those details in this browser.')
        return
      }

      if (!TRACKING_STAGES.includes(match.status)) {
        setTrackedOrder(null)
        setError('This order’s saved status is unavailable. Please contact HairGrow for help.')
        return
      }

      setTrackedOrder(match)
      setError('')
    } catch {
      setTrackedOrder(null)
      setError('Saved orders could not be accessed in this browser. Please contact HairGrow for help.')
    }
  }

  const currentStage = trackedOrder ? TRACKING_STAGES.indexOf(trackedOrder.status) : -1

  if (!open) return null

  return (
    <div className="tracking-overlay" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="tracking-dialog" role="dialog" aria-modal="true" aria-labelledby="tracking-title">
        <button className="icon-button tracking-close" type="button" onClick={onClose} aria-label="Close order tracking"><X size={20} /></button>
        <span className="eyebrow section-eyebrow">Order updates</span>
        <h2 id="tracking-title">Track your order</h2>
        <p className="tracking-intro">Enter the Order ID from your invoice and the phone number you used at checkout.</p>
        <form className="tracking-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="tracking-reference">Order ID</label>
          <input id="tracking-reference" name="reference" type="text" autoComplete="off" placeholder="e.g. HG-260101-ABCD" />
          <label htmlFor="tracking-phone">Checkout phone number</label>
          <input id="tracking-phone" name="phone" type="tel" autoComplete="tel" placeholder="+92 300 1234567" />
          <button className="button button-green" type="submit">Track Order <ArrowRight size={16} /></button>
        </form>
        {error && <p className="tracking-message" role="alert">{error}</p>}
        <p className="tracking-storage-note">Tracking is available in the browser used to place the order.</p>
        {trackedOrder && (
          <section className="tracking-result" aria-live="polite" aria-labelledby="tracking-result-title">
            <div className="tracking-result-heading">
              <div>
                <span className="tracking-result-label">Order status</span>
                <h3 id="tracking-result-title">{trackedOrder.status}</h3>
              </div>
              <span className="tracking-reference">{trackedOrder.reference}</span>
            </div>
            <ol className="tracking-stages" aria-label="Order progress">
              {TRACKING_STAGES.map((stage, index) => {
                const state = index < currentStage ? 'complete' : index === currentStage ? 'current' : 'upcoming'
                return (
                  <li key={stage} className={`tracking-stage tracking-stage-${state}`} aria-current={state === 'current' ? 'step' : undefined}>
                    <span className="tracking-stage-marker">{state === 'complete' ? <Check size={15} aria-hidden="true" /> : index + 1}</span>
                    <span className="tracking-stage-label">{stage}</span>
                  </li>
                )
              })}
            </ol>
          </section>
        )}
      </section>
    </div>
  )
}

const testimonials = [
  {
    quote: '14 din ke baad hair fall noticeably kam hua. The oil feels so light, and my roots feel stronger.',
    name: 'Ayesha K.',
    handle: '@ayeshakhan',
    initials: 'AK',
    tone: 'rose',
  },
  {
    quote: 'Finally, something that feels like a proper scalp ritual. My hair has a lovely natural shine now.',
    name: 'Mariam S.',
    handle: '@mariamsays',
    initials: 'MS',
    tone: 'green',
  },
  {
    quote: 'Simple ingredients, no heavy feeling, and the dropper makes it easy to reach the roots. Love it.',
    name: 'Zara R.',
    handle: '@zararauf',
    initials: 'ZR',
    tone: 'amber',
  },
]

const steps = [
  {
    number: '01',
    title: 'Gentle root drop',
    body: 'Warm 4–5 drops between your palms, then apply directly to your scalp with the precision dropper.',
    icon: Droplets,
    color: 'amber',
  },
  {
    number: '02',
    title: 'Fingertip massage',
    body: 'Use gentle circular motions to massage your scalp for five minutes. Let your roots take it in.',
    icon: Sparkles,
    color: 'green',
  },
  {
    number: '03',
    title: 'Wash to active shine',
    body: 'Leave in for two hours or overnight, then rinse with your favourite gentle, sulfate-free shampoo.',
    icon: Leaf,
    color: 'amber',
  },
]


function BottleArt({ tone = 0 }) {
  const glass = ['#1b5a43', '#8a6a1c', '#2a6b57'][tone % 3]
  return (
    <svg className="bottle-art" viewBox="0 0 120 240" role="img" aria-label="HairGrow oil bottle">
      <rect x="50" y="4" width="20" height="30" rx="5" fill="#c9a24b" />
      <rect x="54" y="30" width="12" height="22" fill="#e9d79b" />
      <rect x="42" y="48" width="36" height="12" rx="3" fill="#b88f35" />
      <path d="M36 62h48c10 0 16 8 16 20v136c0 10-6 18-16 18H36c-10 0-16-8-16-18V82c0-12 6-20 16-20z" fill={glass} />
      <path d="M30 70c0-4 3-6 8-6" stroke="#ffffff" strokeOpacity=".35" strokeWidth="4" strokeLinecap="round" fill="none" />
      <rect x="28" y="110" width="64" height="90" rx="6" fill="#f8f2dc" />
      <rect x="28" y="110" width="64" height="5" fill="#c9a24b" />
      <path d="M60 132c10 6 14 16 8 26-10-2-16-12-8-26z" fill="#1b5a43" />
      <circle cx="60" cy="170" r="4" fill="#c9a24b" />
      <text x="60" y="188" textAnchor="middle" fontSize="9" fontFamily="Georgia, serif" fill="#0f3d2e">HAIRGROW</text>
    </svg>
  )
}

const leafPath = 'M10 90C4 40 40 8 90 4c4 52-28 88-80 86z'
function Leaf2({ className }) { return <svg className={`hero-leaf ${className}`} viewBox="0 0 100 100" aria-hidden="true"><path d={leafPath} fill="currentColor" /></svg> }

const trustPoints = [
  { icon: Hand, title: 'Hand-crafted', text: 'Small-batch, made in Pakistan' },
  { icon: Leaf, title: 'Botanical blend', text: 'Rosemary, kalonji, amla & more' },
  { icon: Truck, title: 'Cash on delivery', text: 'Or pay by Easypaisa' },
  { icon: ShieldCheck, title: 'Simple ordering', text: 'One-page checkout, WhatsApp updates' },
]
const keyIngredients = [
  { img: 'amla', name: 'Amla', text: 'A classic fruit in hair rituals, loved for strong-looking roots.' },
  { img: 'kalonji', name: 'Kalonji seeds', text: 'Traditional black seed, used for generations in scalp care.' },
  { img: 'aloe', name: 'Aloe vera', text: 'Cooling and soothing for a comfortable scalp.' },
  { img: 'onion', name: 'Red onion', text: 'A popular root-care ingredient in homemade hair oils.' },
  { img: 'neem', name: 'Neem leaves', text: 'A fresh herb used to keep the scalp feeling clean.' },
  { img: 'moringa', name: 'Moringa pods', text: 'Nourishing botanical from the same herbal tradition.' },
]

function Logo({ onClick }) {
  return (
    <a className="brand" href="#home" onClick={onClick} aria-label="HairGrow home">
      <img className="brand-logo" src="/img/logo.png" alt="" width="40" height="40" />
    </a>
  )
}

function Header({ count, onCart, cartButtonRef, wishlistCount = 0, onWishlist, theme, onTheme, onTrackOrder }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo onClick={closeMenu} />
        <nav id="main-navigation" className={`desktop-nav ${menuOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
          <a href="#catalog" onClick={closeMenu}>Catalog</a>
          <a href="#ingredients" onClick={closeMenu}>Ingredients</a>
          <a href="#care" onClick={closeMenu}>Care guide</a>
          <a href="#quiz" onClick={closeMenu}>Hair quiz</a>
          <a href="#stories" onClick={closeMenu}>Stories</a>
          <a className="nav-order" href="#track-order" onClick={(event) => { event.preventDefault(); closeMenu(); onTrackOrder() }}>Track Order <Truck size={14} /></a>
        </nav>
        <div className="header-actions">
          <button className="theme-switch" role="switch" aria-checked={theme === 'dark'} onClick={onTheme} aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}>
            <span key={theme} className="ts-icon">{theme === 'dark' ? <Moon size={19} strokeWidth={2} /> : <Sun size={20} strokeWidth={2} />}</span>
          </button>
          <button className="wishlist-trigger" onClick={onWishlist} aria-label={`Open saved items, ${wishlistCount} items`}>
            <Heart size={18} strokeWidth={1.8} fill={wishlistCount > 0 ? '#e11d48' : 'none'} color={wishlistCount > 0 ? '#e11d48' : 'currentColor'} />
            <span className="cart-label">Saved</span>
            <span key={wishlistCount} className={`cart-count ${wishlistCount > 0 ? 'cart-count-updated' : ''}`} aria-live="polite">{wishlistCount}</span>
          </button>
          <button ref={cartButtonRef} className="cart-trigger" onClick={onCart} aria-label={`Open shopping bag, ${count} items`}>
            <ShoppingBag size={18} strokeWidth={1.8} /><span className="cart-label">Bag</span><span key={count} className={`cart-count ${count > 0 ? 'cart-count-updated' : ''}`} aria-live="polite">{count}</span>
          </button>
          <button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-navigation">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <img className="hero-bg" src="/img/hero-bg.jpg" alt="HairGrow herbal hair oil bottles with a dropper, amla, aloe and neem leaves" fetchpriority="high" />
            <div className="hero-content page-width">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> 100% pure organic cold-pressed formula</span>
          <h1>Stronger roots.<br /><em>Healthier, lustrous</em> hair.</h1>
          <p>Formulated with ancient herbal wisdom and rich cold-pressed botanical oils. HairGrow nourishes the scalp and supports thicker, healthier-looking hair.</p>
          <div className="hero-actions">
            <a className="button button-green" href="#catalog">Shop now <ArrowRight size={16} /></a>
            <a className="button button-ghost" href="#quiz"><Sparkles size={15} /> Take hair quiz</a>
          </div>
        </div>
        
      </div>
    </section>
  )
}


function mixHex(hex, other, amount) {
  const a = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)), b = [1, 3, 5].map((i) => parseInt(other.slice(i, i + 2), 16))
  return `#${a.map((v, i) => Math.round(v + (b[i] - v) * amount).toString(16).padStart(2, '0')).join('')}`
}

function VariantBottle({ id, color, lines, volume = '100 ml', label }) {
  const glass = 'M140 76 L180 76 L180 106 C180 120 220 120 220 152 L220 282 Q220 298 204 298 L116 298 Q100 298 100 282 L100 152 C100 120 140 120 140 106 Z'
  const dark = mixHex(color, '#000000', 0.32), light = mixHex(color, '#ffffff', 0.12)
  const u = (n) => `${n}-${id}`
  return (
    <svg className="variant-bottle" viewBox="0 0 320 336" role="img" aria-label={`HairGrow ${label} herbal hair oil bottle`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={u('bg')} cx="50%" cy="46%" r="70%"><stop offset="0" stopColor={mixHex(color, '#ffffff', 0.9)} /><stop offset="1" stopColor={mixHex(color, '#ffffff', 0.74)} /></radialGradient>
        <linearGradient id={u('oil')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f0b84a" /><stop offset="1" stopColor="#b5701a" /></linearGradient>
        <linearGradient id={u('lab')} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={dark} /><stop offset=".3" stopColor={light} /><stop offset=".7" stopColor={color} /><stop offset="1" stopColor={dark} /></linearGradient>
        <linearGradient id={u('cyl')} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000" stopOpacity=".28" /><stop offset=".22" stopColor="#fff" stopOpacity=".28" /><stop offset=".32" stopColor="#fff" stopOpacity="0" /><stop offset=".8" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".3" /></linearGradient>
        <linearGradient id={u('gold')} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#9c7424" /><stop offset=".35" stopColor="#f1d98d" /><stop offset=".7" stopColor="#c9a24b" /><stop offset="1" stopColor="#8a6a1f" /></linearGradient>
        <clipPath id={u('clip')}><path d={glass} /></clipPath>
      </defs>
      <rect width="320" height="336" fill={`url(#${u('bg')})`} />
      <path d="M-6 250C20 190 70 160 118 170 112 224 62 262 -6 250Z" fill={mixHex(color, '#ffffff', 0.62)} opacity=".55" />
      <path d="M326 270C300 214 258 186 214 194 222 244 270 276 326 270Z" fill={mixHex(color, '#ffffff', 0.62)} opacity=".55" />
      <ellipse cx="160" cy="304" rx="78" ry="9" fill="#000" opacity=".16" />
      <path d={glass} fill="#ffffff" fillOpacity=".5" stroke={mixHex(color, '#ffffff', 0.4)} strokeWidth="1.5" />
      <g clipPath={`url(#${u('clip')})`}>
        <rect x="90" y="132" width="140" height="170" fill={`url(#${u('oil')})`} />
        <rect x="90" y="132" width="140" height="5" fill="#fff" opacity=".35" />
        <rect x="157" y="80" width="6" height="170" fill="#fff" opacity=".3" />
        <rect x="100" y="166" width="120" height="110" fill={`url(#${u('lab')})`} />
        <rect x="112" y="206" width="96" height="56" rx="2" fill="none" stroke="#d9b45c" strokeWidth="1" />
        <rect x="100" y="166" width="120" height="3" fill={`url(#${u('gold')})`} />
        <rect x="100" y="273" width="120" height="3" fill={`url(#${u('gold')})`} />
        <text x="160" y="187" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="17" fontWeight="700" fill="#efd38a">HairGrow</text>
        <text x="160" y="199" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="6" letterSpacing="1.6" fill="#f7f1da">HERBAL HAIR OIL</text>
        {lines.map((line, i) => <text key={line} x="160" y={228 + i * 17} textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize={line.length > 9 ? 11.5 : 14} fontWeight="700" letterSpacing=".6" fill="#ffffff">{line}</text>)}
        <text x="160" y="270" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="6" letterSpacing="1" fill="#f1dfa6">{volume}</text>
        <rect x="100" y="120" width="120" height="182" fill={`url(#${u('cyl')})`} />
      </g>
      <rect x="137" y="60" width="46" height="22" rx="4" fill={`url(#${u('gold')})`} />
      {[68, 74].map((y) => <rect key={y} x="137" y={y} width="46" height="1" fill="#000" opacity=".18" />)}
      <path d="M147 62 C147 38 150 24 160 24 C170 24 173 38 173 62 Z" fill="#17181a" />
      <path d="M152 58 C152 42 154 32 158 30" stroke="#fff" strokeOpacity=".28" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function OilBottleGraphic({ item, index }) {
  return (
    <div className="product-photo">
      {item.bottle ? <VariantBottle id={item.id} label={item.label} volume={item.volume} {...item.bottle} /> : <img className="product-img" src={item.image} alt={item.imageAlt} loading="lazy" style={item.pos ? { objectPosition: item.pos } : undefined} />}
      <span className="product-tag"><Leaf size={13} /> {item.label}</span>
      
    </div>
  )
}

function ProductRating() {
  return <span className="product-rating" role="img" aria-label="Rated 5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} fill="currentColor" />)}<span>5.0</span></span>
}

const INITIAL_PRODUCTS = 6

function ProductShowcase({ concern, onConcern, quantities, onQuantityChange, onAdd, onViewIngredients, wishlist = [], onToggleWishlist }) {
  const [expanded, setExpanded] = useState(false)
  useEffect(() => { setExpanded(false) }, [concern])
  const filtered = products.filter((item) => concern === 'all' || item.concerns.includes(concern))
  const hiddenCount = Math.max(0, filtered.length - INITIAL_PRODUCTS)
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_PRODUCTS)
  const toggleExpanded = () => {
    if (expanded) document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setExpanded(!expanded)
  }
  return (
    <section className="catalog-section section-pad" id="catalog">
      <div className="page-width">
        <div className="section-intro">
          <div><span className="eyebrow section-eyebrow">Our product collection</span><h2>Choose your hair<br /><em>remedy.</em></h2></div>
          <p>Made for your unique hair goals. Pick the concern you want to care for, or start with our signature oil.</p>
        </div>
        <div className="concern-filters" role="group" aria-label="Filter by hair concern">{concernFilters.map(([id, label]) => <button key={id} type="button" aria-pressed={concern === id} className={concern === id ? 'active' : ''} onClick={() => onConcern(id)}>{label}</button>)}</div>
        <div className="product-grid">
          {visible.map((item, index) => {
            const quantity = quantities[item.id]
            const isSaved = wishlist.includes(item.id)

            return (
              <article className="product-card" key={item.id}>
                <button
                  type="button"
                  className={`wishlist-btn ${isSaved ? 'active' : ''}`}
                  onClick={() => onToggleWishlist(item.id)}
                  aria-label={isSaved ? `Remove ${item.name} from saved items` : `Save ${item.name} to wishlist`}
                  aria-pressed={isSaved}
                >
                  <Heart size={17} fill={isSaved ? '#e11d48' : 'none'} color={isSaved ? '#e11d48' : 'currentColor'} strokeWidth={2} />
                </button>
                <OilBottleGraphic item={item} index={index} />
                <div className="product-info">
                  <div className="product-title-row">
                    <div><span className="product-kicker">Scalp &amp; hair treatment</span><h3>{item.name}</h3></div>
                    <span className="price">{formatPrice(item.price)}</span>
                  </div>
                  <div className="product-detail-row"><ProductRating /><button className="ingredients-trigger" onClick={() => onViewIngredients(item)}>View Ingredients <ArrowRight size={13} /></button></div>
                  <p className="product-description">{item.description}</p>
                  <div className="product-bottom">
                    <div className="quantity-control" aria-label={`${item.name} quantity`}>
                      <button onClick={() => onQuantityChange(item.id, Math.max(1, quantity - 1))} aria-label={`Decrease ${item.name} quantity`} disabled={quantity === 1}><Minus size={14} /></button>
                      <span aria-live="polite">{quantity}</span>
                      <button onClick={() => onQuantityChange(item.id, Math.min(10, quantity + 1))} aria-label={`Increase ${item.name} quantity`} disabled={quantity === 10}><Plus size={14} /></button>
                    </div>
                    <button className="button button-amber add-button" onClick={(event) => onAdd(item.id, quantity, event)}>Add to Cart <ArrowRight size={16} /></button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        {hiddenCount > 0 && (
          <div className="show-more-wrap">
            <button type="button" className={`show-more ${expanded ? 'is-open' : ''}`} onClick={toggleExpanded} aria-expanded={expanded}>
              <span>{expanded ? 'Show fewer products' : `View ${hiddenCount} more ${hiddenCount === 1 ? 'product' : 'products'}`}</span>
              <span className="show-more-arrow"><ArrowDown size={18} strokeWidth={2} /></span>
            </button>
          </div>
        )}
        <SerumTeaser />
      </div>
    </section>
  )
}

function SerumTeaser() {
  return (
    <section className="serum-teaser" aria-labelledby="serum-title">
      <div className="serum-teaser-media"><img src="/img/serum-banner.jpg" alt="Coming soon: the next HairGrow serum, Aura Glow, with amla, neem and okra extract, 30 ml" loading="lazy" /></div>
      <div className="serum-teaser-copy">
        <span className="eyebrow"><span className="eyebrow-dot" /> Launch announcement</span>
        <h3 id="serum-title">Coming soon</h3>
        <strong>The next HairGrow serum</strong>
        <p>An advanced botanical formula, meticulously crafted for a deep, natural aura. Containing Indian gooseberry (amla), neem and okra extract.</p>
        <small>Aura Glow · 30 ml / 1.0 fl oz</small>
      </div>
    </section>
  )
}

function RitualSection() {
  return (
    <section className="ritual-section section-pad" id="ritual">
      <div className="page-width">
        <div className="ritual-heading"><div><span className="eyebrow section-eyebrow">Your five-minute reset</span><h2>A softer routine.<br /><em>Stronger roots.</em></h2></div><p>Consistency is the secret ingredient. Here’s how to make every drop count.</p></div>
        <div className="steps-grid">{steps.map(({ number, title, body, icon: Icon, color }) => <article className="step" key={number}><div className={`step-top ${color}`}><span>{number}</span><Icon size={20} strokeWidth={1.7} /></div><h3>{title}</h3><p>{body}</p><span className="step-line" /></article>)}</div>
        <div className="ritual-footnote"><Clock3 size={15} /><span>Use 2–3 times weekly for a ritual that fits real life.</span></div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="stories-section section-pad" id="stories">
      <div className="page-width">
        <div className="stories-heading"><div><span className="eyebrow section-eyebrow">Notes from your roots</span><h2>Good things are<br /><em>being said.</em></h2></div><div className="review-score"><div className="score-stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill="currentColor" />)}</div><span>Real words from our community</span></div></div>
        <div className="testimonial-grid">{testimonials.map((review) => <article className="testimonial" key={review.handle}><div className="testimonial-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</div><blockquote>“{review.quote}”</blockquote><div className="reviewer"><span className={`avatar ${review.tone}`}>{review.initials}</span><span><strong>{review.name}</strong><small>{review.handle}</small></span><CheckCircle2 size={16} className="verified" aria-label="Verified customer" /></div></article>)}</div>
      </div>
    </section>
  )
}


function TrustStrip() {
  const group = (hidden) => (
    <div className="trust-group" aria-hidden={hidden || undefined}>
      {[...trustPoints, ...trustPoints].map(({ icon: Icon, title, text }, index) => (
        <div className="trust-card" key={`${title}-${index}`}>
          <span className="trust-icon"><Icon size={22} strokeWidth={1.7} /></span>
          <span className="trust-copy"><strong>{title}</strong><span>{text}</span></span>
        </div>
      ))}
    </div>
  )
  return <section className="trust-strip trust-marquee" aria-label="Why HairGrow"><div className="trust-viewport"><div className="trust-track">{group(false)}{group(true)}</div></div></section>
}

function Ingredients() {
  const left = keyIngredients.slice(0, 3), right = keyIngredients.slice(3)
  const item = (i, side) => <li key={i.name} className={`nb-item ${side}`}><span className="nb-circle"><img src={`/img/ing-${i.img}.jpg`} alt={i.name} loading="lazy" /></span><div><strong>{i.name}</strong><p>{i.text}</p></div></li>
  return (
    <section className="ingredients-section section-pad" id="ingredients">
      <div className="page-width">
        <div className="section-intro"><div><span className="eyebrow section-eyebrow">Power of nature</span><h2>Crafted with 100% pure &amp;<br /><em>active botanical elixirs.</em></h2></div><p>Every drop of HairGrow is infused with hand-selected Ayurvedic herbs, cold-pressed oils and scalp-nourishing botanicals, made to nourish the scalp from the root up.</p></div>
        <div className="nb-grid">
          <ul className="nb-col">{left.map((i) => item(i, 'l'))}</ul>
          <figure className="nb-arch"><img src="/img/bottle-arch.jpg" alt="HairGrow Herbal Hair Oil bottle with dropper" loading="lazy" /></figure>
          <ul className="nb-col">{right.map((i) => item(i, 'r'))}</ul>
        </div>
        <div className="growth-card">
          <div className="growth-copy">
            <span className="eyebrow section-eyebrow">Pure cold-pressed extracts</span>
            <h3>What each botanical does</h3>
            <ul className="growth-list">{[['Rosemary & mint leaf', 'Traditionally used to refresh the scalp and support healthy-looking roots.'], ['Aloe vera & argan', 'Locks in moisture, tames frizz and helps shield hair shafts.'], ['Amla & walnut oil', 'Rich in vitamin C and omega-3 fatty acids, loved for root care.'], ['Lavender & seeds', 'Soothes the scalp and helps keep hair feeling balanced and smooth.']].map(([n, d]) => <li key={n}><Leaf size={18} /><div><strong>{n}</strong><p>{d}</p></div></li>)}</ul>
            <a className="button button-green" href="#catalog">Shop the oil <ArrowRight size={16} /></a>
          </div>
        </div>
      </div>
    </section>
  )
}


function CareGuide() {
  const steps = [
    { img: 'apply', title: 'Part & apply', text: 'Part your hair and place a few drops from the dropper directly on the scalp.' },
    { img: 'massage', title: 'Massage gently', text: 'Use your fingertips for 5–10 minutes to spread the oil and relax the scalp.' },
    { title: 'Leave it in', text: 'Keep it on for at least 30 minutes, or overnight, then wash with a mild shampoo.' },
  ]
  return (
    <section className="care-section section-pad" id="care">
      <div className="page-width">
        <div className="section-intro"><div><span className="eyebrow section-eyebrow">Herbal care guide</span><h2>Simple steps,<br /><em>visible care.</em></h2></div><p>A few minutes, a few drops. Here is how to get the most from every bottle.</p></div>
        <div className="care-grid">
          <figure className="care-main"><img src="/img/care-ingredients.jpg" alt="Aloe vera, rosemary, seeds and botanical oils arranged on a table" loading="lazy" /><figcaption>Herbs &amp; botanical oils</figcaption></figure>
          <ol className="care-steps">{steps.map((s, i) => <li key={s.title} className="care-step">{s.img ? <img src={`/img/care-${s.img}.jpg`} alt="" loading="lazy" /> : <span className="care-moon"><Moon size={30} strokeWidth={1.5} /></span>}<div><b>{String(i + 1).padStart(2, '0')}</b><strong>{s.title}</strong><p>{s.text}</p></div></li>)}</ol>
        </div>
      </div>
    </section>
  )
}

const quizResults = {
  hairfall: { title: 'Hair fall & thinning focus', text: 'Warm the oil slightly and concentrate on the roots and partings. Massage for 5–10 minutes, 2–3 times a week, and leave it on for 30+ minutes.' },
  dandruff: { title: 'Scalp comfort focus', text: 'Apply only to the scalp in small amounts, massage gently, leave for 30 minutes and wash with a mild shampoo. Patch test first if your scalp is sensitive.' },
  dryness: { title: 'Frizz & dryness focus', text: 'Use a few drops on the scalp, then smooth a little through the lengths and ends. Leave overnight once a week for deeper conditioning.' },
}
function HairQuiz({ onPick }) {
  const [step, setStep] = useState(1)
  const [concern, setConcern] = useState('')
  const [scalp, setScalp] = useState('')
  const key = concern === 'dandruff' || scalp === 'dry' ? 'dandruff' : concern === 'dryness' ? 'dryness' : 'hairfall'
  const result = quizResults[key]
  const reset = () => { setStep(1); setConcern(''); setScalp('') }
  const options = step === 1
    ? [['hairfall', 'Hair fall & thinning', 'Excess shedding and weak roots'], ['dandruff', 'Dandruff & itch', 'Dry, flaky scalp and irritation'], ['dryness', 'Frizz & dryness', 'Dull hair, split ends and damage']]
    : [['oily', 'Oily scalp', 'Greasy within a day'], ['dry', 'Dry / flaky', 'Tight, itchy feeling'], ['normal', 'Normal / balanced', 'Washes every 2–3 days']]
  return (
    <section className="quiz-section section-pad" id="quiz">
      <div className="page-width quiz-wrap">
        <div className="quiz-copy"><span className="eyebrow section-eyebrow">Personalised care</span><h2>Find your ideal <em>hair routine.</em></h2><p>Answer two quick questions and get a care routine matched to your hair.</p></div>
        <div className="quiz-card" aria-live="polite">
          {step < 3 ? (
            <>
              <div className="quiz-progress"><span style={{ width: step === 1 ? '50%' : '100%' }} /></div>
              <h3>{step === 1 ? '1. What is your main hair concern?' : '2. What is your scalp type?'}</h3>
              <div className="quiz-options">{options.map(([id, label, hint]) => <button key={id} type="button" onClick={() => { if (step === 1) { setConcern(id); setStep(2) } else { setScalp(id); setStep(3) } }}><strong>{label}</strong><span>{hint}</span></button>)}</div>
            </>
          ) : (
            <div className="quiz-result">
              <span className="quiz-badge"><Sparkles size={22} /></span>
              <h3>{result.title}</h3>
              <p>{result.text}</p>
              <div className="quiz-actions"><a className="button button-green" href="#catalog" onClick={() => onPick(key)}>Shop matching oils <ArrowRight size={16} /></a><button type="button" className="button button-ghost" onClick={reset}><RotateCcw size={15} /> Retake quiz</button></div>
              <small>General care tips only, not medical advice.</small>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const faqs = [
  ['How soon can I expect to see results?', 'Results vary from person to person. With consistent use, 2–3 times a week, many people notice healthier-feeling hair within a few weeks. Hair growth is gradual, so regular use matters most.'],
  ['Can I use HairGrow on colour-treated or chemically treated hair?', 'HairGrow is made from natural botanical ingredients and is a gentle, nourishing option. If you have very sensitive skin or treated hair, do a small patch test first.'],
  ['Can I leave the oil on overnight?', 'Yes. Leaving HairGrow on overnight gives it more time to nourish. Wash it out the next morning with a gentle, mild shampoo.'],
  ['How do I place an order?', 'Add your oil to the bag, check out on one page and pay by cash on delivery or Easypaisa. We will confirm your order on WhatsApp.'],
]
function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="faq-section section-pad" id="faq">
      <div className="page-width faq-wrap">
        <div className="section-intro"><div><span className="eyebrow section-eyebrow">Good to know</span><h2>Frequently asked <em>questions.</em></h2></div></div>
        <div className="faq-list">{faqs.map(([q, a], i) => <div key={q} className={`faq-item${open === i ? ' open' : ''}`}><button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span>{q}</span><ChevronDown size={20} /></button>{open === i && <p>{a}</p>}</div>)}</div>
      </div>
    </section>
  )
}

const WAITLIST_URL = '' // optional: paste a form endpoint (e.g. Formspree) to receive sign-ups by email

function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const submit = async (event) => {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setStatus('error'); return }
    setStatus('sending')
    try {
      if (WAITLIST_URL) await fetch(WAITLIST_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ email: email.trim(), source: 'hairgrow-waitlist' }) })
      setStatus('done'); setEmail('')
    } catch { setStatus('failed') }
  }
  const note = { idle: 'No noise. Just the occasional lovely update.', error: 'Please enter a valid email address.', sending: 'Saving your place…', done: 'Thank you! You are on the early-access list.', failed: 'Something went wrong. Please try again.' }[status]
  return (
    <section className="waitlist" id="notify" aria-labelledby="waitlist-title">
      <svg className="waitlist-star" viewBox="0 0 100 100" aria-hidden="true"><g stroke="currentColor" strokeWidth="5" strokeLinecap="butt"><path d="M50 0v100M0 50h100M15 15l70 70M85 15L15 85" /></g></svg>
      <div className="page-width waitlist-inner">
        <span className="waitlist-eyebrow"><i />The first chapter is almost here</span>
        <h2 id="waitlist-title">Something lovely<br />is <em>growing.</em></h2>
        <p>Be among the first to hear when HairGrow arrives. Leave your email and we&apos;ll save you a place on our early-access list.</p>
        <form className="waitlist-form" onSubmit={submit} noValidate>
          <label className="sr-only" htmlFor="waitlist-email">Your email address</label>
          <input id="waitlist-email" type="email" inputMode="email" autoComplete="email" placeholder="Your email address" value={email} onChange={(event) => { setEmail(event.target.value); if (status !== 'idle') setStatus('idle') }} aria-invalid={status === 'error'} />
          <button type="submit" disabled={status === 'sending'}>Keep me in the loop <ArrowUpRight size={16} /></button>
        </form>
        <small className={`waitlist-note ${status}`} role="status" aria-live="polite">{note}</small>
      </div>
    </section>
  )
}

function CtaBand() {
  return <section className="cta-band"><div className="page-width"><div><h2>Ready to start your ritual?</h2><p>Pick your bottle, check out on one page, and pay on delivery.</p></div><a className="button button-amber" href="#catalog">Shop the ritual <ArrowRight size={16} /></a></div></section>
}

// Replace these with your real profile links
const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/hairgrow.pk', icon: Instagram },
  { label: 'Facebook', href: 'https://facebook.com/hairgrow.pk', icon: Facebook },
  { label: 'Twitter', href: 'https://twitter.com/hairgrow_pk', icon: Twitter },
]

function Footer({ onHelp }) {
  return (
    <footer className="site-footer">
      <div className="page-width footer-top">
        <div className="footer-brand">
          <Logo />
          <p>Nature, made personal.<br />A little care, every day.</p>
          <div className="footer-social" aria-label="Follow HairGrow">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`HairGrow on ${label}`} title={label}><Icon size={18} strokeWidth={1.8} /></a>
            ))}
          </div>
        </div>
        <div className="footer-links">
          <div><span>Explore</span><a href="#catalog">Catalog</a><a href="#care">Care guide</a><a href="#faq">FAQ</a><a href="#stories">Your stories</a></div>
          <div><span>Good to know</span><a href="#privacy" onClick={(e) => { e.preventDefault(); onHelp('Privacy Policy') }}>Privacy policy</a><a href="#terms" onClick={(e) => { e.preventDefault(); onHelp('Terms & Conditions') }}>Terms &amp; conditions</a><a href="mailto:hello@hairgrow.pk">Get in touch</a></div>
        </div>
        <div className="footer-contact">
          <span>Need a hand?</span>
          <a className="footer-cta" href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Message us on WhatsApp <ArrowRight size={14} /></a>
          <a className="footer-mail" href="mailto:hello@hairgrow.pk"><Mail size={15} /> hello@hairgrow.pk</a>
          <small>We usually reply within a day.</small>
        </div>
      </div>
      <div className="page-width footer-pay"><span>Cash on delivery</span><span>Easypaisa</span><span>Made in Pakistan</span></div>
      <div className="page-width footer-bottom"><span>© 2026 HairGrow Organic. All rights reserved.</span><span>Made with care, in small batches <Leaf size={13} /></span></div>
    </footer>
  )
}

function WishlistDrawer({ open, items, onClose, onRemove, onAddToCart }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.add('drawer-open')
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.classList.remove('drawer-open') }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="drawer-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="cart-drawer wishlist-drawer" role="dialog" aria-modal="true" aria-labelledby="wishlist-title">
        <div className="drawer-header">
          <div>
            <span className="eyebrow section-eyebrow">Saved for later</span>
            <h2 id="wishlist-title">Your Wishlist <span>({items.length})</span></h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close wishlist"><X size={20} /></button>
        </div>
        <div className="drawer-content">
          {items.length === 0 ? (
            <div className="empty-bag">
              <span className="empty-icon"><Heart size={24} /></span>
              <h3>No saved products yet.</h3>
              <p>Explore the catalog and tap the heart icon on any product to save it to your personal wishlist.</p>
              <button className="button button-green" onClick={onClose}>Browse collection <ArrowRight size={15} /></button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <article className="cart-item wishlist-item" key={item.id}>
                  <div className="cart-thumb">
                    {item.bottle ? <VariantBottle id={`wishlist-${item.id}`} label={item.label} volume={item.volume} {...item.bottle} /> : <img src={item.image} alt={item.imageAlt} />}
                  </div>
                  <div className="cart-item-info">
                    <span className="product-kicker">Scalp &amp; hair treatment</span>
                    <h3>{item.name}</h3>
                    <p>{item.detail}</p>
                    <div className="cart-item-bottom">
                      <strong>{formatPrice(item.price)}</strong>
                      <div className="wishlist-item-actions">
                        <button className="button button-green button-sm" onClick={(event) => onAddToCart(item.id, event)}>
                          Add to Bag <ShoppingBag size={14} />
                        </button>
                        <button className="icon-button icon-button-sm" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name} from wishlist`}>
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </>
          )}
        </div>
      </aside>
    </div>
  )
}

function CartDrawer({ open, items, itemCount, subtotal, shippingFee, total, onClose, onQuantityChange, onCheckout }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.add('drawer-open')
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.classList.remove('drawer-open') }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="drawer-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer-header"><div><span className="eyebrow section-eyebrow">Your selections</span><h2 id="cart-title">Your bag <span>({itemCount})</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Close shopping bag"><X size={20} /></button></div>
        <div className="drawer-content">
          {itemCount === 0 ? <div className="empty-bag"><span className="empty-icon"><ShoppingBag size={24} /></span><h3>A good ritual starts here.</h3><p>Your bag is waiting for something naturally good.</p><button className="button button-green" onClick={onClose}>Browse the edit <ArrowRight size={15} /></button></div> : <>
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-thumb">{item.bottle ? <VariantBottle id={`cart-${item.id}`} label={item.label} volume={item.volume} {...item.bottle} /> : <img src={item.image} alt={item.imageAlt} />}</div>
                <div className="cart-item-info">
                  <span className="product-kicker">Scalp &amp; hair treatment</span>
                  <h3>{item.name}</h3>
                  <p>{item.detail}</p>
                  <div className="cart-item-bottom">
                    <div className="quantity-control">
                      <button onClick={() => onQuantityChange(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={13} /></button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}><Plus size={13} /></button>
                    </div>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                </div>
              </article>
            ))}
            <div className="shipping-note"><Leaf size={16} /><span>Thoughtfully packed and sent with care.</span></div>
          </>}
        </div>
        {itemCount > 0 && (
          <div className="drawer-footer">
            <div className="shipping-threshold-banner">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <span className="free-shipping-unlocked"><Sparkles size={14} /> Congratulations! You unlocked <strong>FREE Shipping</strong></span>
              ) : (
                <span className="free-shipping-hint"><Truck size={14} /> Add <strong>{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> more for <strong>FREE Shipping</strong></span>
              )}
              <div className="threshold-bar"><div className="threshold-fill" style={{ width: `${Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))}%` }} /></div>
            </div>
            <div className="subtotal-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div className="subtotal-row shipping-row"><span>Delivery charges</span><strong>{shippingFee === 0 ? <span className="free-tag">FREE</span> : formatPrice(shippingFee)}</strong></div>
            <div className="subtotal-row total-row"><span>Estimated total</span><strong>{formatPrice(total)}</strong></div>
            <button className="button button-green checkout-button" onClick={onCheckout}>Proceed to express checkout <ArrowRight size={16} /></button>
            <div className="secure-note"><ShieldCheck size={14} /> Secure, simple, one-page checkout</div>
          </div>
        )}
      </aside>
    </div>
  )
}

function CheckoutModal({ open, items, itemCount, subtotal, shippingFee, total, order, trackingSaved, onClose, onSubmit, complete, onReset }) {
  const [payment, setPayment] = useState('cod')
  const [errors, setErrors] = useState({})
  const [orderConfirmationOpen, setOrderConfirmationOpen] = useState(false)

  function dismissOrderConfirmation() {
    setOrderConfirmationOpen(false)
    onReset()
  }

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      if (orderConfirmationOpen) {
        dismissOrderConfirmation()
        return
      }
      onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.add('drawer-open')
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.classList.remove('drawer-open') }
  }, [open, onClose, orderConfirmationOpen])

  if (!open) return null

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const values = { name: form.get('name')?.trim(), phone: form.get('phone')?.trim(), address: form.get('address')?.trim() }
    const nextErrors = {}
    if (!values.name) nextErrors.name = 'Please enter your name.'
    if (!values.phone || !/^[+\d][\d\s()-]{8,17}$/.test(values.phone)) nextErrors.phone = 'Enter a valid WhatsApp number.'
    if (!values.address || values.address.length < 10) nextErrors.address = 'Please enter your complete shipping address.'
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) event.currentTarget.querySelector(`[name="${firstInvalid}"]`)?.focus()
    if (Object.keys(nextErrors).length === 0) {
      onSubmit({ ...values, payment })
      setErrors({})
      setPayment('cod')
    }
  }

  return (
    <div className="checkout-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !complete) onClose() }}>
      <section className={`checkout-panel ${complete ? 'invoice-panel' : ''}`} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
        <div className="checkout-top"><Logo /><button className="icon-button" onClick={complete ? onReset : onClose} aria-label={complete ? 'Close invoice' : 'Close checkout'}><X size={20} /></button></div>
        {complete ? <>
          <div className="invoice-paper">
            <div className="invoice-brand"><Logo /><span className="invoice-label">Digital invoice</span></div>
            <div className="invoice-heading">
              <div><span className="invoice-kicker">Order received</span><h1 id="checkout-title">Your invoice</h1><p>Thank you, {order.name.split(' ')[0]}. Your order is pending confirmation.</p></div>
              <div className="invoice-reference"><span>Order reference</span><strong>{order.reference}</strong><span>{new Intl.DateTimeFormat('en-PK', { dateStyle: 'long' }).format(new Date(order.createdAt))}</span></div>
            </div>
            <div className="invoice-details">
              <div><span className="invoice-kicker">Customer</span><strong>{order.name}</strong></div>
              <div><span className="invoice-kicker">Contact number</span><strong>{order.phone}</strong></div>
              <div className="invoice-address"><span className="invoice-kicker">Full shipping address</span><strong>{order.address}</strong></div>
            </div>
            <div className="invoice-items">
              <div className="invoice-table-head"><span>Item</span><span>Qty</span><span>Unit price</span><span>Amount</span></div>
              {order.items.map((item) => <div className="invoice-table-row" key={item.id}><div><strong>{item.name}</strong><small>{item.detail}</small></div><span>{item.quantity}</span><span>{formatPrice(item.price)}</span><strong>{formatPrice(item.price * item.quantity)}</strong></div>)}
            </div>
            <div className="invoice-summary">
              <div><span>Subtotal</span><strong>{formatPrice(order.subtotal)}</strong></div>
              <div><span>Delivery charges</span><strong>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</strong></div>
              <div><span>Payment method</span><strong>{order.payment === 'cod' ? 'Cash on Delivery' : 'Easypaisa'}</strong></div>
              <div className="invoice-total"><span>Grand total</span><strong>{formatPrice(order.total || order.subtotal)}</strong></div>
            </div>
            <div className="invoice-thanks"><span><Leaf size={15} /> Made with care, in small batches.</span><span>HairGrow Organic · hello@hairgrow.pk</span></div>
          </div>
          <div className="invoice-actions">
            <button className="button button-green" onClick={() => window.print()}><ArrowDown size={16} /> Download Invoice PDF</button>
            <a className="button button-whatsapp" href={getWhatsAppOrderUrl(order)} target="_blank" rel="noopener noreferrer" aria-label="Send order summary via WhatsApp">
              <MessageCircle size={16} /> Send via WhatsApp <ArrowUpRight size={14} />
            </a>
            <button className="invoice-manifest-link" onClick={() => setOrderConfirmationOpen(true)}>Complete Order <ArrowRight size={15} /></button>
          </div>
          {!trackingSaved && <p className="tracking-save-warning" role="status">Your order was placed, but could not be saved in this browser for tracking. Please keep your invoice and contact HairGrow for updates.</p>}
        </> : <>
          <div className="checkout-heading"><span className="eyebrow section-eyebrow">Just one more thing</span><h1 id="checkout-title">Express checkout</h1><p>Share a few details and we’ll take care of the rest.</p></div>
          <form className="checkout-form" onSubmit={handleSubmit} onInput={(event) => { const field = event.target.name; if (errors[field]) setErrors((current) => { const next = { ...current }; delete next[field]; return next }) }} noValidate>
            <label className={errors.name ? 'field-error' : ''}>Full name<input type="text" name="name" autoComplete="name" placeholder="e.g. Ayesha Khan" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
            <label className={errors.phone ? 'field-error' : ''}>WhatsApp number<input type="tel" name="phone" autoComplete="tel" placeholder="+92 300 1234567" aria-invalid={Boolean(errors.phone)} />{errors.phone && <small>{errors.phone}</small>}</label>
            <label className={errors.address ? 'field-error' : ''}>Complete shipping address<textarea name="address" autoComplete="street-address" rows="3" placeholder="House, street, area, city" aria-invalid={Boolean(errors.address)} />{errors.address && <small>{errors.address}</small>}</label>
            <fieldset className="payment-options"><legend>Payment method</legend><label className={`payment-option ${payment === 'cod' ? 'selected' : ''}`}><input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={() => setPayment('cod')} /><span className="payment-radio" /><span><strong>Cash on Delivery</strong><small>Pay when your order arrives</small></span><span className="payment-side">COD</span></label><label className={`payment-option ${payment === 'wallet' ? 'selected' : ''}`}><input type="radio" name="payment" value="wallet" checked={payment === 'wallet'} onChange={() => setPayment('wallet')} /><span className="payment-radio" /><span><strong>Easypaisa</strong><small>Direct mobile wallet transfer</small></span><span className="wallet-mark">e</span></label></fieldset>
            <div className="checkout-items" aria-label="Order summary">{items.map((item) => <div key={item.id}><span>{item.quantity} × {item.name}</span><strong>{formatPrice(item.price * item.quantity)}</strong></div>)}</div>
            <div className="checkout-summary-breakdown">
              <div className="breakdown-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="breakdown-row"><span>Delivery charges</span><strong>{shippingFee === 0 ? <span className="free-tag">FREE</span> : formatPrice(shippingFee)}</strong></div>
            </div>
            <div className="checkout-total"><span>Order total <small>{itemCount} item{itemCount === 1 ? '' : 's'}</small></span><strong>{formatPrice(total)}</strong></div>
            {Object.keys(errors).length > 0 && <p className="form-error" role="alert">Please fix the highlighted fields to place your order.</p>}
            <button className="button button-green checkout-button" type="submit">Place order <ArrowRight size={16} /></button>
            <p className="form-note"><ShieldCheck size={14} /> Your details are only used to deliver your order.</p>
          </form>
        </>}
      </section>
      {orderConfirmationOpen && <div className="order-confirmation-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) dismissOrderConfirmation() }}><section className="order-confirmation-popup" role="alertdialog" aria-modal="true" aria-labelledby="order-confirmation-title"><button className="icon-button order-confirmation-close" onClick={dismissOrderConfirmation} aria-label="Dismiss order confirmation"><X size={19} /></button><span className="order-confirmation-mark"><CheckCircle2 size={27} /></span><span className="eyebrow section-eyebrow">Thank you for choosing HairGrow</span><h2 id="order-confirmation-title">Order received</h2><p>Your order <strong>{order.reference}</strong> is pending confirmation. Our team will contact you on WhatsApp with updates.</p><div className="order-confirmation-actions"><a className="button button-whatsapp" href={getWhatsAppOrderUrl(order)} target="_blank" rel="noopener noreferrer" aria-label="Send order summary via WhatsApp"><MessageCircle size={18} /> Send Order on WhatsApp <ArrowUpRight size={15} /></a><button className="button button-green" onClick={dismissOrderConfirmation}>Done <Check size={16} /></button></div></section></div>}
    </div>
  )
}

const ingredientInfo = [
  [/rosemary/i, 'A classic herb traditionally used to refresh the scalp and support healthy-looking roots.', Sprout],
  [/amla/i, 'A vitamin C-rich fruit, a long-time favourite in root-care rituals.', Leaf, 'amla'],
  [/kalonji|black seed/i, 'Traditional black seed used for generations in scalp care.', Wheat, 'kalonji'],
  [/coconut/i, 'Cold-pressed oil that softens, conditions and adds lasting moisture.', Droplets],
  [/vitamin e/i, 'Helps protect hair from dryness and keeps lengths feeling smooth.', Sparkles],
  [/argan/i, 'A light, nourishing oil that adds shine without feeling heavy.', Droplets],
  [/walnut/i, 'Omega-3 rich oil that nourishes and conditions rough, tired hair.', Wheat],
  [/aloe/i, 'Cooling and moisturising, it keeps the scalp feeling fresh and comfortable.', Leaf, 'aloe'],
  [/tea tree/i, 'A fresh, purifying botanical used for an itchy-feeling scalp.', Leaf],
  [/lavender/i, 'A calming botanical that soothes the scalp and leaves a gentle scent.', Flower2],
  [/neem/i, 'A traditional leaf used to keep the scalp feeling clean and balanced.', Leaf, 'neem'],
  [/mint/i, 'A cooling leaf for a fresh, light-feeling scalp between washes.', Leaf],
]
function describeIngredient(name) {
  const [, benefit, Icon, thumb] = ingredientInfo.find(([pattern]) => pattern.test(name)) || [null, 'A carefully selected botanical in this HairGrow blend.', Leaf]
  return { benefit, Icon, thumb }
}

function IngredientsDialog({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.add('drawer-open')
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.classList.remove('drawer-open') }
  }, [item, onClose])

  if (!item) return null

  const ingredients = item.ingredients || ['Organic Rosemary Extract', 'Premium Kalonji Seeds', 'Cold-Pressed Coconut Oil', 'Amla Bio-nutrients', 'Vitamin E']

  return <div className="info-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="info-panel ingredients-panel" role="dialog" aria-modal="true" aria-labelledby="ingredients-title"><div className="info-heading"><div><span className="eyebrow section-eyebrow">Botanical ingredients</span><h2 id="ingredients-title">{item.name}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close ingredients"><X size={19} /></button></div><div className="ing-intro">{item.description}</div><ul className="ingredient-cards">{ingredients.map((ingredient) => { const { benefit, Icon, thumb } = describeIngredient(ingredient); return <li key={ingredient}><span className="ing-thumb">{thumb ? <img src={`/img/ing-${thumb}.jpg`} alt="" /> : <Icon size={22} strokeWidth={1.5} />}</span><div><strong>{ingredient}</strong><p>{benefit}</p></div></li> })}</ul><div className="ing-use"><Droplets size={18} /><span><b>How to use:</b> warm a few drops, apply along the partings, massage for 5–10 minutes and leave for 30+ minutes or overnight.</span></div><small className="ing-note">Patch test before first use. Avoid contact with eyes.</small></section></div>
}

function InfoDialog({ title, onClose }) {
  return <div className="info-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="info-panel" role="dialog" aria-modal="true" aria-labelledby="info-title"><div className="info-heading"><h2 id="info-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button></div><p>We respect your trust. HairGrow only uses your contact and delivery details to process your order and coordinate delivery. We never sell personal information. For questions about our policies or your order, contact <a href="mailto:hello@hairgrow.pk">hello@hairgrow.pk</a>.</p><button className="button button-green" onClick={onClose}>Got it <Check size={15} /></button></section></div>
}

export default function App() {
  const cartButtonRef = useRef(null)
  const nextFlyTokenId = useRef(0)
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('hairgrow-theme') === 'dark' ? 'dark' : 'light' } catch { return 'light' } })
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('hairgrow-theme', theme) } catch {} }, [theme])
  const [concern, setConcern] = useState('all')
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('hairgrow-cart')
      if (!saved) return {}
      const parsed = JSON.parse(saved)
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        const valid = {}
        for (const [key, qty] of Object.entries(parsed)) {
          if (products.some((p) => p.id === key) && Number.isInteger(qty) && qty > 0) {
            valid[key] = Math.min(99, qty)
          }
        }
        return valid
      }
      return {}
    } catch {
      return {}
    }
  })
  useEffect(() => {
    try {
      if (Object.keys(cart).length === 0) {
        localStorage.removeItem('hairgrow-cart')
      } else {
        localStorage.setItem('hairgrow-cart', JSON.stringify(cart))
      }
    } catch {}
  }, [cart])
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('hairgrow-wishlist')
      if (!saved) return []
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        return [...new Set(parsed.filter((id) => typeof id === 'string' && products.some((product) => product.id === id)))]
      }
      return []
    } catch {
      return []
    }
  })
  useEffect(() => {
    try {
      if (wishlist.length === 0) {
        localStorage.removeItem('hairgrow-wishlist')
      } else {
        localStorage.setItem('hairgrow-wishlist', JSON.stringify(wishlist))
      }
    } catch {}
  }, [wishlist])
  const [flyTokens, setFlyTokens] = useState([])
  const [productQuantities, setProductQuantities] = useState(() => Object.fromEntries(products.map(({ id }) => [id, 1])))
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [order, setOrder] = useState(null)
  const [trackingSaved, setTrackingSaved] = useState(true)
  const [trackingOpen, setTrackingOpen] = useState(false)
  const [infoTitle, setInfoTitle] = useState('')
  const [ingredientsProduct, setIngredientsProduct] = useState(null)

  const items = products.filter(({ id }) => cart[id] > 0).map((item) => ({ ...item, quantity: cart[item.id] }))
  const wishlistItems = products.filter(({ id }) => wishlist.includes(id))
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shippingFee = calculateShippingFee(subtotal)
  const total = subtotal + shippingFee

  function addToCart(productId, amount, event) {
    const currentQuantity = cart[productId] || 0
    const addedAmount = Math.min(amount, 99 - currentQuantity)
    if (addedAmount <= 0) return

    const source = event.currentTarget.getBoundingClientRect()
    const target = cartButtonRef.current?.getBoundingClientRect()

    if (target) {
      const id = nextFlyTokenId.current++
      setFlyTokens((current) => [...current, {
        id,
        amount: addedAmount,
        x: source.left + source.width / 2,
        y: source.top + source.height / 2,
        deltaX: target.left + target.width / 2 - (source.left + source.width / 2),
        deltaY: target.top + target.height / 2 - (source.top + source.height / 2),
      }])
    }

    setCart((current) => ({
      ...current,
      [productId]: Math.min(99, (current[productId] || 0) + amount),
    }))
  }

  function changeCartQuantity(productId, quantity) {
    setCart((current) => {
      const nextQty = Math.max(0, Math.min(99, quantity))
      const next = { ...current }
      if (nextQty === 0) {
        delete next[productId]
      } else {
        next[productId] = nextQty
      }
      return next
    })
  }

  function toggleWishlist(productId) {
    setWishlist((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId])
  }

  function startCheckout() {
    setCartOpen(false)
    setCheckoutOpen(true)
  }

  function finishOrder(details) {
    const finalShippingFee = calculateShippingFee(subtotal)
    const finalTotal = subtotal + finalShippingFee
    const newOrder = {
      ...details,
      items,
      itemCount,
      subtotal,
      shippingFee: finalShippingFee,
      total: finalTotal,
      reference: createOrderReference(),
      createdAt: new Date().toISOString(),
      status: 'Pending',
    }
    let orderWasSaved = false
    try {
      const savedOrders = readSavedOrders()
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify([
        ...savedOrders.filter((savedOrder) => savedOrder?.reference !== newOrder.reference),
        newOrder,
      ]))
      orderWasSaved = true
    } catch {
      orderWasSaved = false
    }
    setOrder(newOrder)
    setTrackingSaved(orderWasSaved)
    setOrderComplete(true)
    setCart({})
    try { localStorage.removeItem('hairgrow-cart') } catch {}
    setProductQuantities(Object.fromEntries(products.map(({ id }) => [id, 1])))
  }

  function resetOrder() {
    setOrderComplete(false)
    setOrder(null)
    setCheckoutOpen(false)
    setCartOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} count={itemCount} cartButtonRef={cartButtonRef} onCart={() => { setWishlistOpen(false); setCartOpen(true) }} wishlistCount={wishlist.length} onWishlist={() => { setCartOpen(false); setWishlistOpen(true) }} onTrackOrder={() => setTrackingOpen(true)} />
      <main><Hero /><TrustStrip /><ProductShowcase concern={concern} onConcern={setConcern} quantities={productQuantities} onQuantityChange={(productId, quantity) => setProductQuantities((current) => ({ ...current, [productId]: quantity }))} onAdd={addToCart} onViewIngredients={setIngredientsProduct} wishlist={wishlist} onToggleWishlist={toggleWishlist} /><Ingredients /><CareGuide /><HairQuiz onPick={setConcern} /><Testimonials /><Faq /><Waitlist /></main>
      <Footer onHelp={setInfoTitle} />
      <div className="cart-fly-layer" aria-hidden="true">{flyTokens.map((token) => <span key={token.id} className="cart-fly-token" style={{ left: token.x, top: token.y, '--fly-x': `${token.deltaX}px`, '--fly-y': `${token.deltaY}px` }} onAnimationEnd={() => setFlyTokens((current) => current.filter(({ id }) => id !== token.id))}>+{token.amount}</span>)}</div>
      <WishlistDrawer open={wishlistOpen} items={wishlistItems} onClose={() => setWishlistOpen(false)} onRemove={toggleWishlist} onAddToCart={(productId, event) => addToCart(productId, 1, event)} />
      <CartDrawer open={cartOpen} items={items} itemCount={itemCount} subtotal={subtotal} shippingFee={shippingFee} total={total} onClose={() => setCartOpen(false)} onQuantityChange={changeCartQuantity} onCheckout={startCheckout} />
      <CheckoutModal open={checkoutOpen} items={items} itemCount={itemCount} subtotal={subtotal} shippingFee={shippingFee} total={total} order={order} trackingSaved={trackingSaved} onClose={() => setCheckoutOpen(false)} onSubmit={finishOrder} complete={orderComplete} onReset={resetOrder} />
      <IngredientsDialog item={ingredientsProduct} onClose={() => setIngredientsProduct(null)} />
      {infoTitle && <InfoDialog title={infoTitle} onClose={() => setInfoTitle('')} />}
      <TrackOrderModal open={trackingOpen} onClose={() => setTrackingOpen(false)} />
      <a className="help-tab" href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" aria-label="Contact HairGrow on WhatsApp"><CircleHelp size={17} /><span>Need help?</span></a>
    </>
  )
}