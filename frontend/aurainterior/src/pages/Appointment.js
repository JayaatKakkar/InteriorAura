import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [boxVisible, setBoxVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [architectList, setArchitectList] = useState([]);
  const calendarRef = useRef(null);

  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    time: '',
    architect: '',
    description: '',
  });

  const [architectID, setArchitectID] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setAppointmentData((prevData) => ({
        ...prevData,
        name: user.name || '',
        email: user.email || '',
      }));
    }
  }, []);

  useEffect(() => {
    const fetchArchitects = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/Architectprofile');
        setArchitectList(res.data);
      } catch (err) {
        console.error('Failed to fetch architects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArchitects();
  }, []);

  const handleNavigationChange = () => {
    setBoxVisible(true);
  };

  const handleBookAppointment = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setBoxVisible(false);
    setSelectedDate(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate) return alert('Please select a date.');

    try {
      const payload = {
        name: appointmentData.name,
        email_id: appointmentData.email,
        architect: appointmentData.architect,
        app_date: selectedDate,
        app_time: appointmentData.time,
        app_desc: appointmentData.description,
      };

      await axios.post('http://localhost:5000/Appointment', payload);

      alert('Appointment booked successfully!');

      setAppointmentData((prevData) => ({
        ...prevData,
        time: '',
        architect: '',
        description: '',
      }));
      closeModal();
    } catch (err) {
      console.error(err);
      alert('Failed to book appointment');
    }
  };

  useEffect(() => {
    document.body.style.overflow = modalVisible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalVisible]);

  useEffect(() => {
    if (!selectedDate || !calendarRef.current) return;

    const cells = Array.from(calendarRef.current.querySelectorAll('.react-calendar__tile'));
    const selectedCell = cells.find(cell => cell.innerText === selectedDate.getDate().toString());

    if (selectedCell) {
      const rect = selectedCell.getBoundingClientRect();
      const calRect = calendarRef.current.getBoundingClientRect();

      const position = {
        top: rect.top - calRect.top + rect.height + 5,
        left: rect.left - calRect.left,
      };

      const appointmentBox = document.createElement('div');
      appointmentBox.className = 'appointment-box';
      appointmentBox.style.position = 'absolute';
      appointmentBox.style.top = `${position.top}px`;
      appointmentBox.style.left = `${position.left}px`;

      appointmentBox.innerHTML = `
        <p style="margin: 0 0 8px; color: white;">Selected Date: ${selectedDate.toLocaleDateString('en-GB')}</p>
        <button 
          style="margin:2px; background-color: white; color: #333; border:none; padding: 8px 16px; border-radius: 5px; cursor: pointer;" 
          id="bookAppointmentButton">
          Book Appointment
        </button>
      `;

      selectedCell.insertAdjacentElement('afterend', appointmentBox);

      const bookButton = document.getElementById('bookAppointmentButton');
      if (bookButton) {
        bookButton.addEventListener('click', handleBookAppointment);
      }

      return () => {
        appointmentBox.remove();
        if (bookButton) {
          bookButton.removeEventListener('click', handleBookAppointment);
        }
      };
    }
  }, [selectedDate, boxVisible]);

return (
  <div>
    <div className="container-xxl" style={{ paddingTop: '0px', paddingBottom: '0px' }}>

      <div className="container">
        <div
          className="text-center mx-auto mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: 600 }}
        >
          <h4 className="section-title">Appointment</h4>
          <h1 className="display-5 mb-4">
            Book Your Appointment With Us.
          </h1>
        </div>
      </div>
    </div>


      <div style={styles.container}>
        <div style={styles.calendarWrapper}>
          <h2 style={styles.heading}>Choose Your Appointment Date</h2>
          <div style={{ position: 'relative' }} ref={calendarRef}>
            <Calendar
              onChange={setSelectedDate}
              onActiveStartDateChange={handleNavigationChange}
              value={selectedDate}
            />
          </div>
        </div>

        {modalVisible && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <div style={styles.closeIcon} onClick={closeModal}>X</div>
              <h3>Book Your Appointment</h3>

              <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Your Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={appointmentData.name}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Your Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={appointmentData.email}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Architect:</label>
                  <select
                    name="architect"
                    value={appointmentData.architect}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  >
                    <option value="">-- Select an architect --</option>
                    {loading ? (
                      <option value="" disabled>Loading architects...</option>
                    ) : architectList.length === 0 ? (
                      <option value="" disabled>No architects available</option>
                    ) : (
                      architectList.map((arch) => (
                        <option key={arch._id} value={arch._id}>
                          {arch.architect_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Selected Date:</label>
                  <input
                    type="text"
                    value={selectedDate?.toLocaleDateString('en-GB') || ''}
                    readOnly
                    style={{ ...styles.input, backgroundColor: '#f9f9f9', cursor: 'not-allowed' }}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Select Time:</label>
                  <input
                    type="time"
                    name="time"
                    value={appointmentData.time}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Description:</label>
                  <textarea
                    name="description"
                    value={appointmentData.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    style={styles.textarea}
                  />
                </div>

                <button type="submit" style={styles.submitButton}>Submit</button>
              </form>
            </div>
          </div>
        )}

        <style>{`
          .appointment-box {
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            margin-top: 5px;
            border-radius: 8px;
            box-shadow: 0 0 6px #B78D65;
            text-align: center;
            width: 100%;
            height: auto;
            box-sizing: border-box;
          }

          .appointment-box button:hover {
            background-color: #B78D65;
          }
        `}</style>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundImage: process.env.PUBLIC_URL +'url("/img/how-work3.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  calendarWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(183, 141, 101, 0.5)',
    color: 'white',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: 'white',
  },
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9999',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '700px',
    textAlign: 'center',
    position: 'relative',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
  closeIcon: {
    position: 'absolute',
    top: '35px',
    right: '20px',
    fontSize: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#B78D65',
  },
  submitButton: {
    backgroundColor: '#B78D65',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px',
    width: '100%',
  },
  form: {
    textAlign: 'left',
    marginTop: '20px',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
};

export default Appointment;
