import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [showCoupons, setShowCoupons] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data } = await axios.get('https://interioraura.onrender.com/Offer');
        const today = new Date();
        const validOffers = data.filter(({ starting_date, end_date }) => {
          const start = new Date(starting_date);
          const end = new Date(end_date);
          return today >= start && today <= end;
        });
        setOffers(validOffers);
      } catch (err) {
        console.error('Error fetching offers:', err);
      }
    };

    fetchOffers();

    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      const coupon = JSON.parse(savedCoupon);
      setAppliedCoupon(coupon);
      setCouponCode(coupon.offer_code);
      setDiscountPercent(coupon.offer_percentage);
    }
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * (item.vendor_id?.price || 0),
    0
  );
  const shippingCost = 100;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal + shippingCost - discountAmount;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toLowerCase();

    if (!code) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const matchedOffer = offers.find(
      (offer) => offer.offer_code.toLowerCase() === code
    );

    if (!matchedOffer) {
      setCouponError('Invalid or expired coupon code');
      return;
    }

    setAppliedCoupon(matchedOffer);
    setDiscountPercent(matchedOffer.offer_percentage);
    localStorage.setItem('appliedCoupon', JSON.stringify(matchedOffer));
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    setCouponCode('');
    setCouponError('');
    localStorage.removeItem('appliedCoupon');
  };

  const formatPrice = (price) => `₹${price.toFixed(2)}`;

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Cart</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item active text-white">Cart</li>
        </ol>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <img src="/img/bag.png" alt="Empty Cart" style={{ width: 200, marginBottom: 20 }} />
              <h3>Your Shopping Bag is Empty</h3>
              <p className="mb-4 text-muted">Start adding your favorite products now.</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.filter(item => item.vendor_id).map(item => (
                      <tr key={item._id}>
                        <td>
                          <img
                            src={`https://interioraura.onrender.com/uploads/${item.vendor_id.vendor_image}`}
                            alt={item.vendor_id.name_prod}
                            className="rounded-circle"
                            style={{ width: 80, height: 80, objectFit: 'cover' }}
                          />
                        </td>
                        <td>{item.vendor_id.name_prod}</td>
                        <td>{formatPrice(item.vendor_id.price)}</td>
                        <td>
                          <div className="input-group" style={{ maxWidth: 120 }}>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="form-control text-center"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>{formatPrice(item.quantity * item.vendor_id.price)}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeItem(item._id)}
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Coupon Section */}
              <div className="row mt-4">
                <div className="col-md-8">
                  <h4 onClick={() => setShowCoupons(!showCoupons)} style={{ cursor: 'pointer' }}>
                    Coupons {showCoupons ? '▲' : '▼'}
                  </h4>
                  {showCoupons && (
                    <div className="card p-3">
                      {offers.length > 0 ? (
                        <>
                          <div className="mb-3">
                            <p>Select a coupon or enter code:</p>
                            <div className="d-flex flex-wrap gap-2">
                              {offers.map((offer) => (
                                <button
                                  key={offer._id}
                                  className={`btn btn-sm ${couponCode.toLowerCase() === offer.offer_code.toLowerCase() ? 'btn-success' : 'btn-outline-success'}`}
                                  onClick={() => setCouponCode(offer.offer_code)}
                                >
                                  {offer.offer_code}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="input-group mb-2" style={{ maxWidth: 400 }}>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter coupon code"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              disabled={!!appliedCoupon}
                            />
                            <button
                              className="btn btn-primary"
                              onClick={handleApplyCoupon}
                              disabled={!!appliedCoupon}
                            >
                              Apply
                            </button>
                          </div>
                          {couponError && <div className="text-danger">{couponError}</div>}
                          {appliedCoupon && (
                            <div className="alert alert-success d-flex justify-content-between align-items-center">
                              <span>
                                Coupon <strong>{appliedCoupon.offer_code}</strong> applied. You saved {discountPercent}%!
                              </span>
                              <button className="btn btn-sm btn-outline-danger" onClick={handleRemoveCoupon}>
                                Remove
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <p>No available coupons right now.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Summary Section */}
                <div className="col-md-4">
                  <div className="bg-light rounded p-4">
                    <h4 className="mb-4 text-center text-primary">Summary</h4>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping</span>
                      <span>{formatPrice(shippingCost)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="d-flex justify-content-between mb-2 text-success">
                        <span>Discount</span>
                        <span>- {formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <hr />
                    <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <button
                      className="btn btn-primary w-100 mt-4"
                      onClick={() => navigate('/checkout')}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
