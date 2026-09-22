import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Product, CartItem, OrderDetails, UserProfile } from '../types';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000').replace(/\/+$/, '');

export type ViewType = 'home' | 'shop' | 'story' | 'why-dadi' | 'contact' | 'product-detail' | 'order-tracking' | 'account' | 'checkout';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'cart';
}

interface ShopContextType {
  products: Product[];
  productsLoading: boolean;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, weight?: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, weight: string, newQuantity: number) => void;
  removeFromCart: (productId: string, weight: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  cartItemCount: number;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'cart') => void;
  removeToast: (id: string) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastOrder: OrderDetails | null;
  placeOrder: (details: Omit<OrderDetails, 'orderId' | 'items' | 'subtotal' | 'discount' | 'shipping' | 'total' | 'orderDate' | 'estimatedDelivery'>) => Promise<void>;
  freeShippingThreshold: number;

  user: UserProfile | null;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  authLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (email: string, otp: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string, phone: string, address?: string, city?: string, state?: string, pincode?: string) => Promise<'verified' | 'pending' | false>;
  verifySignUpOtp: (email: string, otp: string) => Promise<boolean>;
  resendSignUpOtp: (email: string) => Promise<boolean>;
  signOut: () => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  userOrders: OrderDetails[];
  trackSpecificOrder: (orderId: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const viewToPath = (view: ViewType): string => {
  switch (view) {
    case 'home': return '/';
    case 'shop': return '/shop';
    case 'story': return '/story';
    case 'why-dadi': return '/why-dadi';
    case 'contact': return '/contact';
    case 'order-tracking': return '/order-tracking';
    case 'account': return '/account';
    case 'checkout': return '/checkout';
    case 'product-detail': return '/shop';
    default: return '/';
  }
};

const pathToView = (pathname: string): { view: ViewType; productId: string | null } => {
  if (pathname === '/' || pathname === '') return { view: 'home', productId: null };
  if (pathname === '/shop') return { view: 'shop', productId: null };
  if (pathname.startsWith('/product/')) {
    const id = pathname.replace('/product/', '').split('/')[0];
    return { view: 'product-detail', productId: id || null };
  }
  if (pathname === '/story') return { view: 'story', productId: null };
  if (pathname === '/why-dadi') return { view: 'why-dadi', productId: null };
  if (pathname === '/contact') return { view: 'contact', productId: null };
  if (pathname === '/order-tracking') return { view: 'order-tracking', productId: null };
  if (pathname === '/account') return { view: 'account', productId: null };
  if (pathname === '/checkout') return { view: 'checkout', productId: null };
  return { view: 'home', productId: null };
};

const mergeProduct = (fallback: Product, api: any): Product => {
  if (!api) return fallback;
  return {
    ...fallback,
    ...api,
    price: api.price ?? fallback.price,
    originalPrice: api.originalPrice ?? fallback.originalPrice,
    weight: api.weight ?? fallback.weight,
    image: api.image ?? fallback.image,
    variants: (api.variants && api.variants.length) ? api.variants.map((v: any) => ({
      weight: v.weight,
      price: v.price,
      originalPrice: v.originalPrice,
      inStock: v.inStock ?? true
    })) : fallback.variants
  } as Product;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setProductsLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/products`);
        if (!res.ok) throw new Error('products fetch failed');
        const data = await res.json();
        const apiProducts: any[] = data.products || [];
        if (apiProducts.length === 0) {
          setProducts(FALLBACK_PRODUCTS);
        } else {
          const merged = FALLBACK_PRODUCTS.map(fb => {
            const match = apiProducts.find(a => a.id === fb.id);
            return mergeProduct(fb, match);
          });
          const extras = apiProducts.filter(a => !FALLBACK_PRODUCTS.some(fb => fb.id === a.id));
          const full = [...merged, ...extras.map(e => mergeProduct({
            id: e.id, name: e.name, hindiName: e.hindiName, tagline: '', description: e.description || '',
            category: e.category || 'aachar', categoryLabel: e.categoryLabel || '', price: e.price || 0,
            originalPrice: e.originalPrice, weight: e.weight || '', variants: e.variants || [], rating: 4.5,
            reviewCount: 0, image: e.image || '', galleryImages: [], spiceLevel: 'Medium',
            oilType: '', ingredients: [], shelfLife: '', storageInfo: '',
            pairingSuggestions: []
          } as Product, e))];
          setProducts(full);
        }
      } catch (err) {
        console.warn('[ShopContext] Using fallback product data:', err);
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        if (!cancelled) setProductsLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const derived = useMemo(() => pathToView(pathname), [pathname]);
  const currentView: ViewType = derived.view;
  const selectedProductId: string | null = derived.productId;

  const setCurrentView = (view: ViewType) => {
    if (view === 'checkout' && !authLoading && !user && !justAuthenticatedRef.current) {
      if (typeof window !== 'undefined') localStorage.setItem('dadi_auth_return_to', '/checkout');
      openAuthModal('signin');
      showToast('Please sign in before checkout.', 'warning');
      return;
    }
    const target = viewToPath(view);
    if (target !== pathname) {
      router.push(target);
    }
  };

  const openProductDetail = (productId: string) => {
    router.push(`/product/${productId}`);
    setQuickViewProduct(null);
  };

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [authLoading, setAuthLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('dadi_token');
  });
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('dadi_user');
      if (saved) return JSON.parse(saved);
    } catch (e) { /* ignore */ }
    return null;
  });

  const [userOrders, setUserOrders] = useState<OrderDetails[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [cartId] = useState(() => {
    if (typeof window === 'undefined') return '';
    const existing = localStorage.getItem('dadi_cart_id');
    if (existing) return existing;
    const newId = crypto.randomUUID();
    localStorage.setItem('dadi_cart_id', newId);
    return newId;
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartReady, setCartReady] = useState(false);
  const [backendCartItemCount, setBackendCartItemCount] = useState(0);
  const cartLoadStarted = useRef(false);
  const cartSaveQueue = useRef(Promise.resolve());
  const justAuthenticatedRef = useRef(false);

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('dadi_wishlist');
      if (saved) {
        const savedIds = JSON.parse(saved);
        if (Array.isArray(savedIds)) {
          return savedIds.filter((id): id is string => typeof id === 'string');
        }
      }
    } catch (e) { /* ignore */ }
    return [];
  });
  const [wishlistReady, setWishlistReady] = useState(false);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(() => {
    return userOrders.length > 0 ? userOrders[0] : null;
  });

  // Restore the session on load by validating the saved token against the backend.
  useEffect(() => {
    let cancelled = false;
    const restore = async () => {
      if (!authToken) {
        setAuthLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        if (!res.ok) throw new Error('session invalid');
        const data = await res.json();
        if (!cancelled) setUser(data.user);
      } catch {
        if (!cancelled) {
          setAuthToken(null);
          setUser(null);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('dadi_token');
            localStorage.removeItem('dadi_user');
          }
        }
      } finally {
        if (!cancelled) setAuthLoading(false);
      }
    };
    restore();
    return () => { cancelled = true; };
    // Only run once on mount — token changes are handled by signIn/signUp/signOut directly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem('dadi_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dadi_user');
    }
  }, [user]);

  useEffect(() => {
    if (!user || !authToken) {
      setWishlistReady(true);
      return;
    }
    let cancelled = false;
    const loadWishlist = async () => {
      try {
        const response = await fetch(`${API_URL}/api/wishlist`, { headers: { Authorization: `Bearer ${authToken}` } });
        if (!response.ok) throw new Error('wishlist fetch failed');
        const data = await response.json();
        if (!cancelled) setWishlist(Array.isArray(data.productIds) ? data.productIds : []);
      } catch (error) {
        console.warn('[ShopContext] Unable to load wishlist:', error);
      } finally {
        if (!cancelled) setWishlistReady(true);
      }
    };
    setWishlistReady(false);
    loadWishlist();
    return () => { cancelled = true; };
  }, [user, authToken]);

  // Once signed in, fetch the user's real orders from the backend (in addition to any locally cached demo orders).
  useEffect(() => {
    if (!user || !authToken) return;
    let cancelled = false;
    const loadOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/mine`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        if (!res.ok) throw new Error('orders fetch failed');
        const data = await res.json();
        const orders: OrderDetails[] = (data.orders || []).map((o: any) => ({
          orderId: o.orderId,
          customerName: o.customer.customerName,
          email: o.customer.email,
          phone: o.customer.phone,
          address: o.customer.address,
          city: o.customer.city,
          state: o.customer.state,
          pincode: o.customer.pincode,
          items: o.items.map((item: any) => ({
            product: products.find(p => p.id === item.productId) || FALLBACK_PRODUCTS.find(p => p.id === item.productId) || FALLBACK_PRODUCTS[0],
            selectedWeight: item.weight,
            unitPrice: item.unitPrice,
            quantity: item.quantity
          })),
          subtotal: o.subtotal,
          discount: o.discount,
          shipping: o.shipping,
          total: o.total,
          paymentMethod: o.paymentMethod,
          orderDate: new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          estimatedDelivery: new Date(o.estimatedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: o.status,
          userId: o.userId
        }));
        if (!cancelled) {
          setUserOrders(orders);
          setLastOrder(orders[0] || null);
        }
      } catch (err) {
        console.warn('[ShopContext] Unable to load account orders:', err);
      }
    };
    loadOrders();
    return () => { cancelled = true; };
  }, [user, authToken, products]);

  useEffect(() => {
    cartLoadStarted.current = false;
    setCartReady(false);
  }, [user, authToken]);

  useEffect(() => {
    if (!cartId || products.length === 0 || cartLoadStarted.current) return;
    cartLoadStarted.current = true;
    let cancelled = false;
    const loadCart = async () => {
      try {
        const response = await fetch(`${API_URL}/api/cart`, { headers: { 'x-cart-id': cartId, ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}) } });
        if (!response.ok) {
          let message = `cart fetch failed (HTTP ${response.status})`;
          try {
            const errData = await response.json();
            if (errData?.message) message = errData.message;
          } catch { /* ignore body read errors */ }
          throw new Error(message);
        }
        const data = await response.json();
        const hydrated = (data.items || []).flatMap((item: { productId: string; weight: string; quantity: number }) => {
          const product = products.find(entry => entry.id === item.productId);
          if (!product) return [];
          const variant = product.variants.find(entry => entry.weight === item.weight);
          return [{ product, selectedWeight: item.weight, unitPrice: variant?.price ?? product.price, quantity: item.quantity }];
        });
        if (!cancelled) {
          setCart(hydrated);
          setBackendCartItemCount(data.itemCount ?? hydrated.reduce((total: number, item: CartItem) => total + item.quantity, 0));
        }
      } catch (error) {
        console.warn('[ShopContext] Unable to load cart:', error);
      } finally {
        if (!cancelled) setCartReady(true);
      }
    };
    loadCart();
    return () => { cancelled = true; };
  }, [cartId, products, authToken, user]);

  useEffect(() => {
    if (!cartReady || !cartId) return;
    const items = cart.map(item => ({ productId: item.product.id, weight: item.selectedWeight, quantity: item.quantity }));
    cartSaveQueue.current = cartSaveQueue.current
      .then(async () => {
        const response = await fetch(`${API_URL}/api/cart`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-cart-id': cartId, ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}) },
          body: JSON.stringify({ items })
        });
        if (!response.ok) throw new Error('cart update failed');
        const data = await response.json();
        setBackendCartItemCount(data.itemCount ?? items.reduce((total, item) => total + item.quantity, 0));
      })
      .catch(error => console.warn('[ShopContext] Unable to save cart:', error));
  }, [cart, cartId, cartReady, authToken]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!user || !authToken) localStorage.setItem('dadi_wishlist', JSON.stringify(wishlist));
    if (!wishlistReady || !user || !authToken) return;
    fetch(`${API_URL}/api/wishlist`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ productIds: wishlist })
    }).catch(error => console.warn('[ShopContext] Unable to save wishlist:', error));
  }, [wishlist, user, authToken, wishlistReady]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'cart' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    if (pathname !== '/checkout' || authLoading || user || justAuthenticatedRef.current) return;
    if (typeof window !== 'undefined') localStorage.setItem('dadi_auth_return_to', '/checkout');
    router.replace('/');
    openAuthModal('signin');
    showToast('Please sign in before checkout.', 'warning');
  }, [pathname, authLoading, user]);

  const persistSession = (token: string, profile: UserProfile) => {
    justAuthenticatedRef.current = true;
    setAuthToken(token);
    setUser(profile);
    if (typeof window !== 'undefined') localStorage.setItem('dadi_token', token);
    setTimeout(() => { justAuthenticatedRef.current = false; }, 2000);
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const cleanEmail = email.trim();
    if (!cleanEmail || !password.trim()) {
      showToast('Please enter your email and password', 'warning');
      return false;
    }
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || 'Invalid email or password.', 'warning');
        return false;
      }
      persistSession(data.token, data.user);
      setIsAuthModalOpen(false);
      showToast(`Welcome back, ${data.user.name}!`, 'success');
      setTimeout(() => {
        const returnPath = typeof window !== 'undefined' ? localStorage.getItem('dadi_auth_return_to') : null;
        if (returnPath) {
          localStorage.removeItem('dadi_auth_return_to');
          router.push(returnPath);
        }
      }, 0);
      return true;
    } catch (err) {
      showToast('Unable to sign in right now. Please try again.', 'warning');
      return false;
    }
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/password-reset/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || 'Unable to request a password reset.', 'warning');
        return false;
      }
      showToast('If that email has an account, a reset code has been sent.', 'info');
      return true;
    } catch {
      showToast('Unable to request a password reset right now.', 'warning');
      return false;
    }
  };

  const resetPassword = async (email: string, otp: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/password-reset/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp: otp.trim(), password })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || 'That reset code is invalid.', 'warning');
        return false;
      }
      showToast('Password reset successfully. Please sign in.', 'success');
      return true;
    } catch {
      showToast('Unable to reset your password right now.', 'warning');
      return false;
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    phone: string,
    address?: string,
    city?: string,
    state?: string,
    pincode?: string
  ): Promise<'verified' | 'pending' | false> => {
    if (!name.trim() || !email.trim() || !password.trim() || !phone.trim()) {
      showToast('Please fill in your name, email, password, and mobile number', 'warning');
      return false;
    }
    if (password.trim().length < 6) {
      showToast('Password must be at least 6 characters.', 'warning');
      return false;
    }
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), password, phone: phone.trim(),
          address: address?.trim(), city: city?.trim(), state: state?.trim(), pincode: pincode?.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || 'Unable to create your account.', 'warning');
        return false;
      }
      if (data.verificationRequired) {
        showToast('Check your email for the 6-digit verification code.', 'info');
        return 'pending';
      }
      persistSession(data.token, data.user);
      setIsAuthModalOpen(false);
      showToast(`Namaste ${data.user.name}! Your Dadi Industries account is ready.`, 'success');
      setTimeout(() => {
        const returnPath = typeof window !== 'undefined' ? localStorage.getItem('dadi_auth_return_to') : null;
        if (returnPath) {
          localStorage.removeItem('dadi_auth_return_to');
          router.push(returnPath);
        }
      }, 0);
      return 'verified';
    } catch (err) {
      showToast('Unable to create your account right now. Please try again.', 'warning');
      return false;
    }
  };

  const verifySignUpOtp = async (email: string, otp: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || 'That verification code is invalid.', 'warning');
        return false;
      }
      persistSession(data.token, data.user);
      setIsAuthModalOpen(false);
      showToast(`Namaste ${data.user.name}! Your Dadi Industries account is ready.`, 'success');
      setTimeout(() => {
        const returnPath = typeof window !== 'undefined' ? localStorage.getItem('dadi_auth_return_to') : null;
        if (returnPath) {
          localStorage.removeItem('dadi_auth_return_to');
          router.push(returnPath);
        }
      }, 0);
      return true;
    } catch {
      showToast('Unable to verify your account right now.', 'warning');
      return false;
    }
  };

  const resendSignUpOtp = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register/resend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || 'Unable to resend the verification code.', 'warning');
        return false;
      }
      showToast('A new verification code has been sent.', 'info');
      return true;
    } catch {
      showToast('Unable to resend the verification code right now.', 'warning');
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    setAuthToken(null);
    setUserOrders([]);
    setLastOrder(null);
    setWishlist([]);
    setWishlistReady(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dadi_token');
      localStorage.removeItem('dadi_user');
    }
    showToast('You have been signed out safely.', 'info');
  };

  const updateUserProfile = async (updatedFields: Partial<UserProfile>) => {
    if (!user || !authToken) return;
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        body: JSON.stringify(updatedFields)
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message || 'Unable to update your profile.', 'warning');
        return;
      }
      setUser(data.user);
      showToast('Profile updated successfully!', 'success');
    } catch (err) {
      showToast('Unable to update your profile right now.', 'warning');
    }
  };

  const trackSpecificOrder = (orderId: string) => {
    const found = userOrders.find(o => o.orderId === orderId);
    if (found) {
      setLastOrder(found);
      setCurrentView('order-tracking');
    }
  };

  const addToCart = (product: Product, weight?: string, quantity: number = 1) => {
    const targetWeight = weight || product.weight;
    const variant = product.variants.find(v => v.weight === targetWeight) || { price: product.price };
    const unitPrice = variant.price;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedWeight === targetWeight);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedWeight: targetWeight, unitPrice, quantity }];
    });

    showToast(`Added ${quantity}x ${product.name} (${targetWeight}) to cart!`, 'cart');
  };

  const updateCartQuantity = (productId: string, weight: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, weight);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && item.selectedWeight === weight
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, weight: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedWeight === weight)));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        const prod = products.find(p => p.id === productId);
        showToast(`Saved ${prod?.name || 'item'} to your wishlist!`, 'success');
        return [...prev, productId];
      }
    });
  };

  const freeShippingThreshold = 499;
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartItemCount = backendCartItemCount;

  const discountAmount = 0;
  const shippingFee = (subtotal >= freeShippingThreshold || subtotal === 0) ? 0 : 49;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const placeOrder = async (details: Omit<OrderDetails, 'orderId' | 'items' | 'subtotal' | 'discount' | 'shipping' | 'total' | 'orderDate' | 'estimatedDelivery'>): Promise<void> => {
    if (!user || !authToken) {
      openAuthModal('signin');
      throw new Error('Please sign in to place your order.');
    }
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        items: cart.map(item => ({ productId: item.product.id, weight: item.selectedWeight, quantity: item.quantity })),
        customer: { customerName: details.customerName, email: details.email, phone: details.phone, address: details.address, city: details.city, state: details.state, pincode: details.pincode },
        paymentMethod: details.paymentMethod
      })
    });
    const result = await response.json();
    if (response.status === 401) {
      signOut();
      openAuthModal('signin');
      throw new Error('Your session expired. Please sign in again.');
    }
    if (!response.ok) throw new Error(result.message || 'Unable to create the order.');
    if (details.paymentMethod !== 'cod' && result.payment?.redirectUrl) {
      window.location.assign(result.payment.redirectUrl);
      return;
    }

    const orderId = result.order.orderId as string;
    const now = new Date();
    const deliveryDate = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);

    const newOrder: OrderDetails = {
      ...details,
      orderId,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: totalAmount,
      orderDate: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Processing',
      userId: user?.id
    };

    setUserOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    router.push('/order-tracking');
    showToast(`Order #${orderId} confirmed successfully!`, 'success');
    return;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        productsLoading,
        currentView,
        setCurrentView,
        selectedProductId,
        openProductDetail,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        subtotal,
        shippingFee,
        discountAmount,
        totalAmount,
        cartItemCount,
        toasts,
        showToast,
        removeToast,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        placeOrder,
        freeShippingThreshold,

        user,
        authLoading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signIn,
        requestPasswordReset,
        resetPassword,
        signUp,
        verifySignUpOtp,
        resendSignUpOtp,
        signOut,
        updateUserProfile,
        userOrders,
        trackSpecificOrder
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
