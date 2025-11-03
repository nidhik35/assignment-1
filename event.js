// Import express
const express = require('express');
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// In-memory data store for bookings
let bookings = [];
let nextId = 1; // to auto-increment booking IDs

// ----------------------------
// 1. GET /api/bookings - View all bookings
// ----------------------------
app.get('/api/bookings', (req, res) => {
  res.json({
    message: 'All event bookings',
    total: bookings.length,
    data: bookings
  });
});

// ----------------------------
// 2. POST /api/bookings - Register for the event
// ----------------------------
app.post('/api/bookings', (req, res) => {
  const { name, email, phone, event } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !event) {
    return res.status(400).json({ error: 'All fields are required: name, email, phone, event' });
  }

  const newBooking = {
    id: nextId++,
    name,
    email,
    phone,
    event,
    registrationDate: new Date().toISOString()
  };

  bookings.push(newBooking);

  res.status(201).json({
    message: 'Booking created successfully',
    booking: newBooking
  });
});

// ----------------------------
// 3. GET /api/bookings/:id - View a specific booking by ID
// ----------------------------
app.get('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const booking = bookings.find(b => b.id === bookingId);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  res.json({
    message: 'Booking details found',
    booking
  });
});

// ----------------------------
// 4. PUT /api/bookings/:id - Update participant details
// ----------------------------
app.put('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const booking = bookings.find(b => b.id === bookingId);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  const { name, email, phone, event } = req.body;

  // Update fields if provided
  if (name) booking.name = name;
  if (email) booking.email = email;
  if (phone) booking.phone = phone;
  if (event) booking.event = event;

  res.json({
    message: 'Booking updated successfully',
    updatedBooking: booking
  });
});

// ----------------------------
// 5. DELETE /api/bookings/:id - Cancel a booking
// ----------------------------
app.delete('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const index = bookings.findIndex(b => b.id === bookingId);

  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  const deleted = bookings.splice(index, 1);

  res.json({
    message: 'Booking cancelled successfully',
    cancelledBooking: deleted[0]
  });
});

// ----------------------------
// Start the server
// ----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Synergia Event Booking API running on http://localhost:${PORT}`);
});
