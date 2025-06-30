import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function BuyNowPage() {
  const [product, setProduct] = useState(null);
  const [offers, setOffers] = useState([]);
  const [amount, setAmount] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    hnono: "",
    street: "",
    address: "",
    pincode: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOfferCode, setSelectedOfferCode] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [orderid, setOrderId] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load product from localStorage or default sample
    const savedProduct = localStorage.getItem("purchaseItem");
    if (savedProduct) {
      try {
        setProduct(JSON.parse(savedProduct));
      } catch (err) {
        console.error("Failed to parse product JSON:", err);
      }
    } else {
      setProduct({
        name_prod: "Sample Product",
        price: 1000,
        vendor_image: "sample-image.jpg",
        parent_cat: { name: "Sample Category" },
      });
    }

    // Fetch available offers
const fetchOffers = async () => {
  try {
    const res = await fetch("https://interioraura.onrender.com/offer");
    if (!res.ok) throw new Error("Failed to fetch offers");

    const data = await res.json();

    const today = new Date();

    const validOffers = data.filter(offer => {
      const startDate = new Date(offer.starting_date || offer.startDate);
      const endDate = new Date(offer.end_date || offer.endDate);
      return startDate <= today && today <= endDate;
    });

    console.log("Valid Offers:", validOffers);
    setOffers(validOffers);
  } catch (err) {
    console.error("Error fetching offers:", err);
  } finally {
    setLoading(false);
  }
};

fetchOffers();

  }, 
  []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value.toUpperCase());
    setCouponMessage("");
    setSelectedOfferCode("");
  };

  const handleApplyCoupon = () => {
    const foundOffer = offers.find(
      (offer) =>
        (offer.offer_Code || offer.offer_code)?.trim().toUpperCase() ===
        couponCode.trim().toUpperCase()
    );

    if (foundOffer) {
      const percent = foundOffer.discountPercent || foundOffer.offer_percentage || 0;
      setDiscountPercent(percent);
      setCouponMessage(`Coupon applied! ${percent}% discount.`);
      setSelectedOfferCode((foundOffer.offer_Code || foundOffer.offer_code).toUpperCase());
    } else {
      setDiscountPercent(0);
      setCouponMessage("Invalid coupon code.");
      setSelectedOfferCode("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return alert("No product selected.");

    const price = product.price;
    const gst = price * 0.18;
    const totalBeforeDiscount = price + gst;
    const discountAmount = (discountPercent / 100) * totalBeforeDiscount;
    const totalAfterDiscount = Math.max(totalBeforeDiscount - discountAmount, 0);

    const payload = {
      userDetails: formData,
      productDetails: product,
      discount: {
        couponCode,
        discountPercent,
        discountAmount,
        totalBeforeDiscount,
        totalAfterDiscount,
        gst,
        price,
      },
    };

try {
  const response = await fetch("https://interioraura.onrender.com/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const data = await response.json();

  // 👇 LOG THE ORDER ID (assuming `data.orderId` is returned from backend)
  console.log("Latest Order ID:", data.orderId);

 setOrderId(data.orderId);
  setSubmittedData(payload);
  setShowPopup(true);
} catch (err) {
  alert("Failed to submit order.");
  console.error(err);
}

  };
    const handleCancel = (id) => {
  if (window.confirm("Are you sure you want to cancel this booking?")) {
    setIsCancelling(true);
    axios.delete(`https://interioraura.onrender.com/orders/${id}`)
      .then(() => {
        alert("Thank you, your booking has been cancelled.");
      })
      .catch(err => console.error("Cancel failed", err))
      .finally(() => setIsCancelling(false));
  }
};

const handlePayment = async () => {
  try {
    const res = await fetch("https://interioraura.onrender.com/api/payment/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({orderid}),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Payment order response:", data);

    if (data && data.order) {
      handlePaymentVerify(data.order);
      setAmount(data.order.amount);
    } else {
      toast.error("Failed to initiate payment: Invalid response from server");
      console.error("Invalid payment order response", data);
    }
  } catch (error) {
    console.error("Error while creating payment order:", error);
    toast.error("Error creating payment order");
  }
};

const handlePaymentVerify = async (data) => {
  if (!data || !data.key) {
    toast.error("Payment initialization failed: Invalid payment data");
    console.error("Payment verify data missing or invalid", data);
    return;
  }

  const options = {
    key: data.key,
    amount: data.amount,
    currency: data.currency,
    name: "Your Company Name",
    description: "Test Transaction",
    order_id: data.id,
    handler: async function (response) {
      const verifyBody = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
         orderId: orderid,
      };

      try {
        const res = await fetch("https://interioraura.onrender.com/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(verifyBody),
        });

        const verifyResponse = await res.json();

        if (verifyResponse.success) {
          toast.success("Payment successful!");
          // Optionally clear or reset your form/data here
        } else {
          toast.error("Payment verification failed");
          console.error("Payment verification failed response:", verifyResponse);
        }
      } catch (error) {
        toast.error("Error verifying payment");
        console.error("Error verifying payment:", error);
      }
    },
    theme: { color: "#3399cc" },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};


  if (!product) return <p>Loading product details...</p>;

  const price = product?.price || 0;
  const gst = price * 0.18;
  const totalBeforeDiscount = price + gst;
  const discountAmount = (discountPercent / 100) * totalBeforeDiscount;
  const totalAfterDiscount = Math.max(totalBeforeDiscount - discountAmount, 0);

  return (
    <>
      <style>{`
        .container {
          display: flex;
          gap: 40px;
          width: 100vw;
          padding: 20px;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
          background-color: #f0f2f5;
          flex-wrap: wrap;
        }
        form {
          flex: 1;
          background-color: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          display: grid;
          grid-template-columns: 150px 1fr;
          row-gap: 20px;
          column-gap: 20px;
        }
        form h2 {
          grid-column: 1 / span 2;
        }
        label {
          font-weight: 600;
          color: #555;
          justify-self: end;
        }
        input, textarea {
          padding: 12px;
          font-size: 16px;
          border-radius: 8px;
          border: 1px solid #ccc;
          width: 100%;
        }
        .product-details {
          flex: 1;
          background-color: #f7f9fc;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          text-align: center;
        }
        .product-details img {
          width: 100%;
          max-width: 280px;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .price-gst-box, .coupon-box {
          background-color: #e6f0ff;
          padding: 15px 20px;
          border-radius: 10px;
          margin-bottom: 25px;
          text-align: left;
        }
        .coupon-box input[type="text"] {
          width: calc(100% - 110px);
          margin-right: 10px;
        }
        .coupon-box button {
          padding: 10px 15px;
          background-color: #007BFF;
          color: white;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
        }
        .coupon-message {
          margin-top: 8px;
          font-weight: 600;
          color: #0056b3;
        }
        .offers-list {
          margin-top: 20px;
          text-align: left;
        }
        .offers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 15px;
        }
        .offer-box {
          background-color: #fff5e6;
          padding: 10px;
          border-radius: 8px;
          text-align:center;
cursor: pointer;
border: 2px solid transparent;
transition: border-color 0.3s;
}
.offer-box.selected {
border-color: #ff9800;
font-weight: 700;
background-color: #fff3d6;
}
button.submit-btn {
grid-column: 1 / span 2;
padding: 14px;
font-size: 18px;
font-weight: 700;
border-radius: 12px;
border: none;
cursor: pointer;
background-color: #4caf50;
color: white;
transition: background-color 0.3s;
}
button.submit-btn:hover {
background-color: #43a047;
}
.popup-overlay {
position: fixed;
inset: 0;
background-color: rgba(0,0,0,0.6);
display: flex;
justify-content: center;
align-items: center;
z-index: 9999;
}
.popup-content {
background-color: white;
border-radius: 12px;
padding: 30px;
max-width: 450px;
width: 90%;
text-align: center;
box-shadow: 0 6px 20px rgba(0,0,0,0.25);
}
.popup-content h3 {
margin-bottom: 20px;
color: #222;
}
.popup-content p {
margin-bottom: 25px;
font-size: 18px;
color: #555;
}
.popup-buttons button {
margin: 0 10px;
padding: 12px 24px;
font-size: 16px;
border-radius: 8px;
border: none;
cursor: pointer;
font-weight: 600;
}
.btn-pay {
background-color: #007bff;
color: white;
transition: background-color 0.3s;
}
.btn-pay:hover {
background-color: #0056b3;
}
.btn-cancel {
  background-color: #f44336;
  color: white;
  transition: background-color 0.3s;
}
.btn-cancel:hover {
  background-color: #ba000d;
}

.price-gst-box {
  background: #f7f9fc;
  border: 1px solid #d6e0ef;
  border-radius: 12px;
  padding: 20px;
  font-size: 16px;
  line-height: 1.6;
  margin-top: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.price-gst-box .line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.price-gst-box .total {
  font-weight: bold;
  color: #333;
  border-top: 1px solid #ccc;
  padding-top: 10px;
  margin-top: 10px;
}

.price-gst-box .discount {
  color: #d9534f;
  font-weight: 500;
}

.price-gst-box .payable {
  font-size: 18px;
  font-weight: bold;
  color: #28a745;
  margin-top: 10px;
},

`}</style>
  <div className="container">
    <form onSubmit={handleSubmit}>
      <h2>Shipping Details</h2>

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        required
        value={formData.name}
        onChange={handleChange}
        placeholder="Your full name"
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        required
        value={formData.email}
        onChange={handleChange}
        placeholder="Your email address"
      />

      <label htmlFor="mobileNo">Mobile No:</label>
      <input
        type="tel"
        name="mobileNo"
        id="mobileNo"
        required
        pattern="[0-9]{10}"
        value={formData.mobileNo}
        onChange={handleChange}
        placeholder="10-digit mobile number"
      />

      <label htmlFor="hnono">House/No:</label>
      <input
        type="text"
        name="hnono"
        id="hnono"
        required
        value={formData.hnono}
        onChange={handleChange}
        placeholder="House or flat number"
      />

      <label htmlFor="street">Street:</label>
      <input
        type="text"
        name="street"
        id="street"
        required
        value={formData.street}
        onChange={handleChange}
        placeholder="Street name"
      />

      <label htmlFor="address">Address:</label>
      <textarea
        name="address"
        id="address"
        rows={3}
        required
        value={formData.address}
        onChange={handleChange}
        placeholder="Full address"
      />

      <label htmlFor="pincode">Pincode:</label>
      <input
        type="text"
        name="pincode"
        id="pincode"
        required
        pattern="[0-9]{6}"
        value={formData.pincode}
        onChange={handleChange}
        placeholder="6-digit postal code"
      />



      <button className="submit-btn" type="submit">
        Submit Order
      </button>
    </form>

    <div className="product-details">
      <h2>Product Details</h2>

      <img
            src={
              product.vendor_image?.startsWith("http")
                ? product.vendor_image
                : `https://interioraura.onrender.com/${product.vendor_image}`
            }
            alt={product.name_prod}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/280x200.png?text=No+Image";
            }}
          />
      <h3>{product.name_prod}</h3>
      <p>Category: {product.parent_cat?.name || "N/A"}</p>

<div className="price-gst-box">
  <div className="line">
    <span>Price:</span>
    <span>₹{price.toFixed(2)}</span>
  </div>
  <div className="line">
    <span>GST (18%):</span>
    <span>₹{gst.toFixed(2)}</span>
  </div>
  <div className="line total">
    <span>Total:</span>
    <span>₹{totalBeforeDiscount.toFixed(2)}</span>
  </div>

  {discountPercent > 0 && (
    <>
      <div className="line discount">
        <span>Discount ({discountPercent}%):</span>
        <span>-₹{discountAmount.toFixed(2)}</span>
      </div>
      <div className="line payable">
        <span>Payable:</span>
        <span>₹{totalAfterDiscount.toFixed(2)}</span>
      </div>
    </>
  )}
</div>

      <div className="price-gst-box">   
           {/* <h2>Coupon Code</h2> */}

      <div className="coupon-box" style={{ gridColumn: "2 / 3" }}>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={handleCouponChange}
        />
        <button type="button" onClick={handleApplyCoupon}>
          Apply
        </button>
        {couponMessage && <p className="coupon-message">{couponMessage}</p>}
      </div>

      {offers.length > 0 && (
        <>
          {/* <label>Available Offers:</label> */}
          <div className="offers-grid">
            {offers.map((offer) => {
              const code = (offer.offer_Code || offer.offer_code || "").toUpperCase();
              const percent = offer.discountPercent || offer.offer_percentage || 0;
              return (
                <div
                  key={code}
                  className={`offer-box ${
                    selectedOfferCode === code ? "selected" : ""
                  }`}
                  onClick={() => {
                    setCouponCode(code);
                    setDiscountPercent(percent);
                    setCouponMessage(`Coupon applied! ${percent}% discount.`);
                    setSelectedOfferCode(code);
                  }}
                >
                  {code}
                  <br />
                  {percent}% OFF
                </div>
              );
            })}
          </div>
        </>
      )}</div>
    </div>
  </div>

  {/* {showPopup && (
    <div className="popup-overlay" role="dialog" aria-modal="true">
      <div className="popup-content">
        <h3>Confirm Payment</h3>
        <p>
          Please confirm to proceed with the payment of ₹
          {totalAfterDiscount.toFixed(2)}.
        </p>
        <div className="popup-buttons">
          <button
            className="btn-pay"
            onClick={() => {
              setShowPopup(false);
              // Here, bookid could be from your order response,
              // for demo let's pass some dummy bookid or generate one
              // const dummyBookId = "order123";
              handlePayment(orderid);
            }}
          >
            Proceed to Pay
          </button>
          <button
            className="btn-cancel"
            onClick={() => {setShowPopup(false)
               handleCancel(orderid);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )} */}
  {showPopup && (
  <div className="popup-overlay" role="dialog" aria-modal="true">
    <div className="popup-content">
      <h3>Confirm Payment</h3>
      <p>
        Please confirm to proceed with the payment of ₹
        {totalAfterDiscount.toFixed(2)}.
      </p>
      <div className="popup-buttons">
        <button
          className="btn-pay"
          onClick={() => {
            setShowPopup(false);
            handlePayment();  // initiate Razorpay payment here
          }}
        >
          Confirm Payment
        </button>
        <button
          className="btn-cancel"
          onClick={() => {
            setShowPopup(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

</>
);
}
