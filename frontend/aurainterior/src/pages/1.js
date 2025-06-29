import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [bookid, setBookid] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
   const [amount, setamount] = useState(1);

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  const fetchBookings = () => {
    axios.get(`http://localhost:5000/bookingDetails?email=${email}`)
      .then(res => setBookings(res.data))
      .catch(err => {
        console.error("Failed to load bookings", err);
        setBookings([]);
      });
  };

  useEffect(() => {
    if (email) fetchBookings();
  }, [email]);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setIsCancelling(true);
      axios.delete(`http://localhost:5000/booking/${id}`)
        .then(() => {
          alert("Booking cancelled.");
          fetchBookings();
        })
        .catch(err => console.error("Cancel failed", err))
        .finally(() => setIsCancelling(false));
    }
  };

  const handlePayment = async (bookid) => {
    // setBookid(bookid)
     try {
            const res = await fetch(`http://localhost:5000/api/payment/order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    bookid
                })
            });

            const data = await res.json();
            console.log(data);
            handlePaymentVerify(data.data)
            setamount(data.data.amount)
        } catch (error) {
            console.log(error);
        }
    // alert(Redirecting to payment gateway for ₹${data.data.sub_amount});
    // implement payment integration here
  };

   const handlePaymentVerify = async (data) => {
    console.log(data)
    console.log("RAZORPAY KEY:", data.key);
        const options = {
            // key: data.RAZORPAY_KEY_ID,
            key: data.key,
            amount: data.amount,
            currency: data.currency,
            name: "Plan Voyage",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = await fetch(`http://localhost:5000/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            bookid:data.bookid
                        })
                    })

                    const verifyData = await res.json();

                    if (verifyData.message) {
                        toast.success(verifyData.message)
                        fetchBookings()
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

  return (
     <>
    <Navbar />

      {/* Header Start */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
          <h3 className="text-white display-4 mb-4">
            <span style={{ color: "white", textShadow: "0 0 7px #9d391b" }}>Booking</span>
          </h3>
          <ol className="breadcrumb justify-content-center mb-0">
            <Link to="/bookingDetails">
              <li className="breadcrumb-item1">Home/ </li>
            </Link>
            <Link to="#">
              <li className="breadcrumb-item1">Pages/ </li>
            </Link>
            <li className="breadcrumb-item active text-white">Bookings</li>
          </ol>
        </div>
      </div>
      {/* Header End */}
    <div className="container mt-5">
      <h2 className="mb-5 text-center">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center fs-5 text-muted">No bookings found.</p>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => (
            <div className="col-md-6" key={booking._id}>
            <div className="card shadow-sm h-100 rounded-4 border border-warning">
              <div className="card shadow-sm h-100 border-0 rounded-4">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold mb-3">{booking.package_id.package_name}</h5>
                  <ul className="list-unstyled mb-4 flex-grow-1">
                    <li><strong>Date:</strong> {new Date(booking.datetime).toLocaleString()}</li>
                    <li><strong>Adults:</strong> {booking.adults} | <strong>Kids:</strong> {booking.kids}</li>
                    <li><strong>Total:</strong> ₹{booking.bookingAmount.toFixed(2)}</li>
                    <li>
                      <strong>Status:</strong> 
                      <span className={`ms-2 badge ${booking.status === 0 ? "bg-warning text-dark" : "bg-success"}`}>
                        {booking.status === 0 ? "Pending" : "Confirmed"}
                      </span>
                    </li>
                    <li><strong>Special Request:</strong> {booking.specialRequest || "None"}</li>
                  </ul>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-danger"
                      disabled={isCancelling}
                      onClick={() => handleCancel(booking._id)}
                    >
                      {isCancelling ? "Cancelling..." : "Cancel Booking"}
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => handlePayment(booking._id)}
                    >
                      Make Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <br/><br/>
    
      {/* Subscribe Start */}
      <Subscribe />
      {/* Subscribe End */}

      <Footer />
</>
  );
};

export default BookingDetails;
