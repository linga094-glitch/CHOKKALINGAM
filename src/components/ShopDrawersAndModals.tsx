import { FormEvent, useState } from 'react';
import {
  CheckCircle2,
  Heart,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { Product } from '../data/products';
import { formatInr } from '../data/storeConfig';
import { StoreImage } from './StoreImage';

export interface CartEntry {
  product: Product;
  quantity: number;
}

export interface PlacedOrder {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  total: number;
  status: string;
  createdAt: string;
}

interface CartDrawerProps {
  open: boolean;
  items: CartEntry[];
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onOrderPlaced: (order: PlacedOrder) => void;
}

export function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemove,
  onOrderPlaced,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [error, setError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  if (!open) return null;

  const subtotal = items.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0
  );

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setError('Please enter your name, phone number, and delivery address.');
      return;
    }
    setError('');
    const orderId = `CHK-${Math.floor(1050 + Math.random() * 8900)}`;
    const newOrder: PlacedOrder = {
      orderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      paymentMethod,
      total: subtotal,
      status: 'Order Confirmed — Preparing Dispatch',
      createdAt: new Date().toLocaleDateString('en-IN'),
    };
    setConfirmedOrder(newOrder);
    onOrderPlaced(newOrder);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#1D4ED8]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#0B2253]">Shopping Cart</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedOrder(null);
              onClose();
            }}
            aria-label="Close cart"
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {confirmedOrder ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-emerald-950 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                <h3 className="text-lg font-bold">Order Confirmed</h3>
              </div>
              <p className="text-sm">
                Order ID:{' '}
                <span className="font-mono font-bold text-[#0B2253]">
                  {confirmedOrder.orderId}
                </span>
              </p>
              <p className="text-sm">Status: {confirmedOrder.status}</p>
              <p className="text-sm">
                Total Payable:{' '}
                <span className="font-mono font-bold">
                  {formatInr(confirmedOrder.total)}
                </span>{' '}
                ({confirmedOrder.paymentMethod})
              </p>
              <p className="text-xs text-emerald-800 pt-2">
                Use Order ID <span className="font-mono font-bold">{confirmedOrder.orderId}</span> in Track Order anytime to check status.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-10 h-10 text-slate-300 mx-auto mb-3" aria-hidden="true" />
              <p className="text-base font-semibold text-[#0B2253]">Your cart is empty</p>
              <p className="text-sm text-slate-500 mt-1">
                Add smartphones or accessories to proceed with checkout.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 pb-4 border-b border-slate-100"
                >
                  <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
                    <StoreImage
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#0B2253] truncate">
                      {product.name}
                    </p>
                    <p className="text-xs font-mono font-semibold text-[#1D4ED8] mt-0.5">
                      {formatInr(product.price)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center border border-slate-200 rounded-md">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(product.id, -1)}
                          aria-label={`Decrease ${product.name} quantity`}
                          className="p-1.5 text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-bold">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(product.id, 1)}
                          aria-label={`Increase ${product.name} quantity`}
                          className="p-1.5 text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="p-1.5 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Checkout Form */}
              <form onSubmit={handleCheckout} className="pt-4 space-y-3">
                <h3 className="text-sm font-bold text-[#0B2253]">
                  Delivery & Payment Details
                </h3>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile Number"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Delivery Address or Store Pickup"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  aria-label="Payment Method"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                >
                  <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                  <option value="UPI / QR on Delivery">UPI / QR Payment</option>
                  <option value="Store Pickup & Card/EMI">Store Pickup & Card/EMI</option>
                </select>

                {error && <p className="text-xs font-medium text-red-600">{error}</p>}

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600">Subtotal</span>
                  <span className="text-lg font-extrabold font-mono text-[#0B2253]">
                    {formatInr(subtotal)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-sm transition-colors"
                >
                  Place Order · {formatInr(subtotal)}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface WishlistDrawerProps {
  open: boolean;
  items: Product[];
  onClose: () => void;
  onRemove: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export function WishlistDrawer({
  open,
  items,
  onClose,
  onRemove,
  onMoveToCart,
}: WishlistDrawerProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#1D4ED8]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#0B2253]">Saved Wishlist</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-10 h-10 text-slate-300 mx-auto mb-3" aria-hidden="true" />
              <p className="text-base font-semibold text-[#0B2253]">No saved items yet</p>
              <p className="text-sm text-slate-500 mt-1">
                Tap the heart icon on any smartphone or accessory to save it here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 pb-4 border-b border-slate-100"
                >
                  <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
                    <StoreImage
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#0B2253] truncate">
                      {product.name}
                    </p>
                    <p className="text-xs font-mono font-semibold text-[#1D4ED8] mt-0.5">
                      {formatInr(product.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => onMoveToCart(product)}
                        className="text-xs font-bold text-[#1D4ED8] hover:underline"
                      >
                        Move to Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemove(product.id)}
                        className="text-xs text-slate-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TrackOrderModalProps {
  open: boolean;
  orders: PlacedOrder[];
  onClose: () => void;
}

export function TrackOrderModal({ open, orders, onClose }: TrackOrderModalProps) {
  const [queryId, setQueryId] = useState('CHK-1042');
  const [lookupResult, setLookupResult] = useState<PlacedOrder | null>(null);
  const [notFound, setNotFound] = useState(false);

  if (!open) return null;

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    const clean = queryId.trim().toUpperCase();
    const match = orders.find((o) => o.orderId.toUpperCase() === clean);
    if (match) {
      setLookupResult(match);
      setNotFound(false);
    } else {
      setLookupResult(null);
      setNotFound(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Track Order"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#1D4ED8]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#0B2253]">Track Your Order</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close track order modal"
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleTrack} className="flex gap-2 mb-4">
          <input
            type="text"
            value={queryId}
            onChange={(e) => setQueryId(e.target.value)}
            placeholder="Enter Order ID (e.g. CHK-1042)"
            className="flex-1 px-3.5 py-2.5 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold"
          >
            Track
          </button>
        </form>

        {lookupResult && (
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm space-y-1.5">
            <p className="font-bold text-[#0B2253]">
              Order #{lookupResult.orderId}
            </p>
            <p className="text-[#1D4ED8] font-semibold">{lookupResult.status}</p>
            <p className="text-slate-700">Customer: {lookupResult.customerName}</p>
            <p className="text-slate-600 text-xs">
              Total: {formatInr(lookupResult.total)} · {lookupResult.paymentMethod}
            </p>
          </div>
        )}

        {notFound && (
          <p className="text-sm text-red-600 font-medium">
            No order found with ID &ldquo;{queryId}&rdquo;. Try sample order CHK-1042 or place a test order in your cart.
          </p>
        )}
      </div>
    </div>
  );
}

interface LoginModalProps {
  open: boolean;
  currentUser: string | null;
  onClose: () => void;
  onLogin: (name: string) => void;
  onLogout: () => void;
}

export function LoginModal({
  open,
  currentUser,
  onClose,
  onLogin,
  onLogout,
}: LoginModalProps) {
  const [nameInput, setNameInput] = useState('');
  const [mobileInput, setMobileInput] = useState('');

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    onLogin(nameInput.trim());
    setNameInput('');
    setMobileInput('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Customer Login"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#1D4ED8]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#0B2253]">
              {currentUser ? 'Customer Account' : 'Customer Login'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close login modal"
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {currentUser ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Signed in as <span className="font-bold text-[#0B2253]">{currentUser}</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-sm font-semibold text-slate-800"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label htmlFor="login-name" className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                id="login-name"
                type="text"
                required
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
              />
            </div>
            <div>
              <label htmlFor="login-mobile" className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number or Email
              </label>
              <input
                id="login-mobile"
                type="text"
                value={mobileInput}
                onChange={(e) => setMobileInput(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm transition-colors"
            >
              Continue to Shop
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
