import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentHistory = ({ selectedArchitectId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const arch=localStorage.getItem('arch')
  const aid =JSON.parse(arch).id

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/Appointment/${aid}`);
      console.log(res.data)
      setAppointments(res.data);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchAppointments();
  }, []);

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':');
    const h = parseInt(hour, 10);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${minute} ${suffix}`;
  };
const handleResponse = async (appointment, status) => {
    try {
      const res = await axios.post("http://localhost:5000/Appointment/appointment/status", {
        id: appointment,
        status: status,
      });
      fetchAppointments()
      alert(`Email sent: Appointment is ${status}`);
    } catch (err) {
      console.error("Email send error:", err);
      alert("Failed to send email.");
    }
  };

  // Filter appointments based on selected architect
  const filteredAppointments = selectedArchitectId
    ? appointments.filter(appointment => appointment.architect === selectedArchitectId)
    : appointments;

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>List of Appointments</h2>
      {filteredAppointments.length === 0 ? (
        <p>No appointments available for the selected architect.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Architect</th>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td style={styles.tableCell}>{appointment.name}</td>
                <td style={styles.tableCell}>{appointment.email_id}</td>
                <td style={styles.tableCell}>{appointment.architect?.architect_name || 'Unknown'}</td>
                <td style={styles.tableCell}>{new Date(appointment.app_date).toLocaleDateString('en-GB')}</td>
                <td style={styles.tableCell}>{formatTime(appointment.app_time)}</td>
                <td style={styles.tableCell}>{appointment.app_desc}</td>
                <td style={styles.tableCell}>
                  <span
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      color: 'white',
                      backgroundColor:
                        appointment.status === 'Approved'
                          ? '#4CAF50'
                          : appointment.status === 'Rejected'
                          ? '#f44336'
                          : '#ff9800',
                    }}
                  >
                    {appointment.status || 'Pending'}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: 'rgba(141, 117, 87, 0.75)',
    color: 'black',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(101, 111, 183, 0.5)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
    marginTop: '20px',
  },
  tableCell: {
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  acceptButton: {
    padding: '6px 12px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',  // Green color for accept
    color: 'white',
  },
  rejectButton: {
    padding: '6px 12px',
    marginLeft: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#f44336',  // Red color for reject
    color: 'white',
  },
};

export default AppointmentHistory;
