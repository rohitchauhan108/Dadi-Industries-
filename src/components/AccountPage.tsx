import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { createWhatsAppInquiryUrl, openWhatsApp } from '../utils/whatsapp';
import { 
  User, 
  Package, 
  MapPin, 
  Phone, 
  Mail, 
  LogOut, 
  Clock, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Receipt, 
  Sparkles, 
  ShoppingBag,
  ExternalLink,
  Edit2,
  Save,
  ShieldCheck
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    user,
    authLoading,
    signOut,
    openAuthModal,
    userOrders,
    trackSpecificOrder,
    addToCart,
    setCurrentView,
    updateUserProfile,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Profile edit fields
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editAddress, setEditAddress] = useState(user?.address || '');
  const [editCity, setEditCity] = useState(user?.city || '');
  const [editState, setEditState] = useState(user?.state || '');
  const [editPincode, setEditPincode] = useState(user?.pincode || '');

  if (authLoading) {
    return <div className="min-h-[70vh] flex items-center justify-center text-[#103C26] font-serif">Loading your account...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F0] py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#EAE1D0] shadow-md text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F0] border-2 border-[#C69D32]/40 flex items-center justify-center mx-auto text-[#103C26]">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#103C26]">Sign In to View Orders</h2>
            <p className="text-sm text-[#5E6E64] mt-2 font-sans">
              Sign up or log in with your email or mobile to track recent orders, view purchase receipts, and manage delivery addresses.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              onClick={() => openAuthModal('signin')}
              className="w-full bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] py-3.5 px-6 rounded-2xl font-serif font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer border border-[#C69D32]/40"
            >
              Sign In to Account
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="w-full bg-[#F3ECE0] hover:bg-[#EAE1D0] text-[#103C26] py-3 px-6 rounded-2xl font-serif font-bold text-sm transition-all cursor-pointer border border-[#C69D32]/30"
            >
              Create New Account (Sign Up)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      phone: editPhone,
      address: editAddress,
      city: editCity,
      state: editState,
      pincode: editPincode
    });
    setIsEditingProfile(false);
  };

  const handleReorder = (order: typeof userOrders[0]) => {
    order.items.forEach(item => {
      addToCart(item.product, item.selectedWeight, item.quantity);
    });
    showToast(`Items from order #${order.orderId} added to your basket!`, 'success');
  };

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Profile Banner */}
        <div className="bg-gradient-to-r from-[#103C26] via-[#0B2819] to-[#103C26] rounded-3xl p-6 sm:p-10 text-[#FAF7F0] border border-[#C69D32]/40 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-radial from-[#C69D32]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-[#C69D32] flex items-center justify-center font-serif text-2xl sm:text-3xl font-bold text-[#E8C86A] shadow-lg shrink-0 overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{user.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C69D32]/20 border border-[#C69D32]/40 text-[#E8C86A] text-[10px] font-serif font-bold tracking-widest uppercase">
                  <Sparkles className="w-3 h-3" />
                  <span>Dadi Tasting Club Patron</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F0]">
                  {user.name}
                </h1>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#FAF7F0]/80 font-sans">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#E8C86A]" />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#E8C86A]" />
                    {user.phone}
                  </span>
                  <span className="text-[#FAF7F0]/60">Joined {user.joinedDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 md:pt-0">
             

              <button
                onClick={signOut}
                className="flex items-center gap-2 bg-red-950/40 hover:bg-red-900/60 text-red-200 px-4 py-2.5 rounded-xl text-xs font-serif font-bold border border-red-800/40 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex border-b border-[#EAE1D0] gap-4 sm:gap-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-2 font-serif font-bold text-sm sm:text-base flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#103C26] text-[#103C26]'
                : 'border-transparent text-[#5E6E64] hover:text-[#103C26]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Recent Orders ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-4 px-2 font-serif font-bold text-sm sm:text-base flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#103C26] text-[#103C26]'
                : 'border-transparent text-[#5E6E64] hover:text-[#103C26]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Patron Details</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-4 px-2 font-serif font-bold text-sm sm:text-base flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'addresses'
                ? 'border-[#103C26] text-[#103C26]'
                : 'border-transparent text-[#5E6E64] hover:text-[#103C26]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Tab 1: Orders List */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#103C26]">Your Order History</h2>
                <p className="text-xs text-[#5E6E64] font-sans">
                  Review past shipments, download invoices, track transit, or re-order your favorite pickles.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('home')}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#103C26] hover:underline"
              >
                <span>Return Home</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C69D32]" />
              </button>
            </div>

            {userOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE1D0] space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#C69D32] mx-auto opacity-70" />
                <h3 className="font-serif text-xl font-bold text-[#103C26]">No Orders Placed Yet</h3>
                <p className="text-xs text-[#5E6E64] max-w-sm mx-auto">
                  Your kitchen pantry is missing the authentic taste of Dadi’s sun-cured pickles. Place your first order with free delivery above ₹499!
                </p>
                <button
                  onClick={() => setCurrentView('home')}
                  className="inline-flex items-center gap-2 bg-[#103C26] text-[#FAF7F0] px-6 py-3 rounded-full font-serif font-bold text-xs shadow-md"
                >
                  <span>Return to Home</span>
                  <ArrowRight className="w-4 h-4 text-[#E8C86A]" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE1D0] shadow-xs hover:shadow-md transition-shadow space-y-5"
                  >
                    {/* Top Order Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EAE1D0]/80">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-base sm:text-lg text-[#103C26]">
                            Order #{order.orderId}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-serif font-bold uppercase tracking-wider ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : order.status === 'In Transit'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-blue-100 text-blue-800 border border-blue-300'
                            }`}
                          >
                            {order.status || 'Processing'}
                          </span>
                        </div>
                        <span className="text-xs text-[#5E6E64] block font-sans">
                          Placed on <strong>{order.orderDate}</strong> • Estimated Delivery: <strong>{order.estimatedDelivery}</strong>
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-[#5E6E64] block">Order Total</span>
                        <span className="font-serif font-bold text-lg sm:text-xl text-[#103C26]">
                          ₹{order.total}
                        </span>
                      </div>
                    </div>

                    {/* Order Item List Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-2.5 bg-[#FAF7F0] rounded-2xl border border-[#EAE1D0]/60"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#EAE1D0]"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-serif font-bold text-[#103C26] truncate">
                              {item.product.name}
                            </h4>
                            <span className="text-[11px] text-[#5E6E64] block">
                              {item.selectedWeight} • Qty: {item.quantity}
                            </span>
                            <span className="text-[11px] font-serif font-bold text-[#C69D32]">
                              ₹{item.unitPrice * item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery & Action Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-2 text-xs text-[#5E6E64]">
                        <MapPin className="w-3.5 h-3.5 text-[#C69D32] shrink-0" />
                        <span className="truncate max-w-xs sm:max-w-md">
                          Delivering to: {order.address}, {order.city} ({order.pincode})
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* Live Tracking Trigger */}
                        <button
                          onClick={() => trackSpecificOrder(order.orderId)}
                          className="inline-flex items-center gap-1.5 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] px-3.5 py-2 rounded-xl text-xs font-serif font-bold shadow-xs transition-all cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5 text-[#E8C86A]" />
                          <span>Track Live Transit</span>
                        </button>

                        {/* Reorder Button */}
                        <button
                          onClick={() => handleReorder(order)}
                          className="inline-flex items-center gap-1.5 bg-white hover:bg-[#FAF7F0] text-[#103C26] px-3.5 py-2 rounded-xl text-xs font-serif font-bold border border-[#C69D32]/40 shadow-xs transition-all cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-[#C69D32]" />
                          <span>Reorder All</span>
                        </button>

                        {/* WhatsApp Support for this order */}
                        <button
                          onClick={() => {
                            const msg = `Namaste Dadi Industries! I need support regarding my Order #${order.orderId} (Total ₹${order.total}).`;
                            openWhatsApp(createWhatsAppInquiryUrl(msg));
                          }}
                          className="inline-flex items-center gap-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3 py-2 rounded-xl text-xs font-serif font-bold shadow-xs transition-all cursor-pointer"
                          title="WhatsApp Support for Order"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                          <span>Order Help</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Profile & Edit Form */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE1D0] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#103C26]">Patron Profile Information</h3>
                <p className="text-xs text-[#5E6E64]">Manage your personal details for orders and notifications.</p>
              </div>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#103C26] hover:underline"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#C69D32]" />
                  <span>Edit Info</span>
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[#FAF7F0] border border-[#EAE1D0] rounded-xl px-4 py-2.5 text-sm text-[#103C26] focus:outline-none focus:border-[#C69D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-[#FAF7F0] border border-[#EAE1D0] rounded-xl px-4 py-2.5 text-sm text-[#103C26] focus:outline-none focus:border-[#C69D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                    Default Address
                  </label>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="w-full bg-[#FAF7F0] border border-[#EAE1D0] rounded-xl px-4 py-2.5 text-sm text-[#103C26] focus:outline-none focus:border-[#C69D32]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-serif font-bold text-[#103C26] mb-1">City</label>
                    <input
                      type="text"
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                      className="w-full bg-[#FAF7F0] border border-[#EAE1D0] rounded-xl px-3 py-2 text-xs text-[#103C26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif font-bold text-[#103C26] mb-1">State</label>
                    <input
                      type="text"
                      value={editState}
                      onChange={(e) => setEditState(e.target.value)}
                      className="w-full bg-[#FAF7F0] border border-[#EAE1D0] rounded-xl px-3 py-2 text-xs text-[#103C26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif font-bold text-[#103C26] mb-1">Pincode</label>
                    <input
                      type="text"
                      value={editPincode}
                      onChange={(e) => setEditPincode(e.target.value)}
                      className="w-full bg-[#FAF7F0] border border-[#EAE1D0] rounded-xl px-3 py-2 text-xs text-[#103C26]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] py-2.5 px-6 rounded-xl font-serif font-bold text-xs transition-all shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5 text-[#E8C86A]" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="py-2.5 px-4 rounded-xl text-xs font-serif font-medium text-[#5E6E64] hover:bg-[#FAF7F0]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl text-sm">
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE1D0] space-y-1">
                  <span className="text-[11px] uppercase font-serif font-bold text-[#5E6E64] tracking-wider block">Full Name</span>
                  <p className="font-serif font-bold text-base text-[#103C26]">{user.name}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE1D0] space-y-1">
                  <span className="text-[11px] uppercase font-serif font-bold text-[#5E6E64] tracking-wider block">Email Address</span>
                  <p className="font-serif font-bold text-base text-[#103C26]">{user.email}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE1D0] space-y-1">
                  <span className="text-[11px] uppercase font-serif font-bold text-[#5E6E64] tracking-wider block">Mobile Number</span>
                  <p className="font-serif font-bold text-base text-[#103C26]">{user.phone}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE1D0] space-y-1">
                  <span className="text-[11px] uppercase font-serif font-bold text-[#5E6E64] tracking-wider block">Registered Location</span>
                  <p className="font-serif font-bold text-base text-[#103C26]">{user.city || 'Dehradun'}, {user.state || 'Uttarakhand'}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE1D0] space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#103C26]">Saved Delivery Addresses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF7F0] border-2 border-[#103C26] relative space-y-2">
                <span className="absolute top-4 right-4 bg-[#103C26] text-[#FAF7F0] text-[9px] font-serif font-bold px-2 py-0.5 rounded-full uppercase">
                  Primary
                </span>
                <h4 className="font-serif font-bold text-sm text-[#103C26]">{user.name} (Home)</h4>
                <p className="text-xs text-[#5E6E64] leading-relaxed font-sans">
                  {user.address || 'B-14, Green Valley Enclave, Rajpur Road'}<br />
                  {user.city || 'Dehradun'}, {user.state || 'Uttarakhand'} - {user.pincode || '248001'}
                </p>
                <p className="text-xs text-[#103C26] font-medium pt-1 font-sans">
                  Phone: {user.phone}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
