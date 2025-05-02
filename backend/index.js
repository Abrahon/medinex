const express = require('express');
const cors = require('cors');
require('dotenv').config();  // <-- Move this to the top
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0xcir2l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect MongoDB
    await client.connect();

    const userCollection = client.db('medinex').collection('users');
    const doctorCollection = client.db('medinex').collection('doctors');
    const bookingCollection = client.db('medinex').collection('bokings');
    const doctorScheduleCollection = client.db('medinex').collection('schedules');
    const paymentCollection = client.db('medinex').collection('payments');
    // AdminRoute
     app.get('/user/role', async(req, res)=>{
      const email = req.query.email;
      const result = await userCollection.findOne({email});
      console.log("user role email", result);
      res.send(result);
     })
    // POST route for user signup
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      console.log('Received new user:', newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });
    app.get('/users', async(req, res)=>{
      const user = await userCollection.find().toArray();
      console.log(user);
      res.send(user);
    })

    app.delete('/users/:id', async (req, res) => {
      const userId = req.params.id;
    
      try {
        const result = await userCollection.deleteOne({ _id: new ObjectId(userId) });
    
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.patch('/users/admin/:id', async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const updateDoc = {
        $set: {
          role: 'admin',

        }
      }
      const result = await userCollection.updateOne(filter,updateDoc);
      res.send(result);
    })
    // app.delete('/users/:id', async(req, res)=>{
    //   constid = req.params.id;
    //   const query = {_id: ObjectId(id)};
    //   console.log(query)
    //   const result = await userCollection.deleteOne(query);
    //   res.send(result)
    // })
    
    // Pst Doctor
    app.post('/doctors', async (req, res) => {
      try {
        const newDoctor = req.body;
        console.log("Adding new doctor:", newDoctor);

        if (!newDoctor.img) {
          return res.status(400).json({ error: "Image is required" });
        }
    
        const result = await doctorCollection.insertOne(newDoctor);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ error: "Failed to add doctor" });
      }
    });
   
    // get data
    app.get('/doctors', async (req, res) => {
      try {
        const doctors = await doctorCollection.find().toArray();
        res.json(doctors);  // ✅ CORRECT way
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch doctors" });
      }
    });

    app.get('/doctors/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const doctor = await doctorCollection.findOne({ _id: new ObjectId(id) });
    
        if (!doctor) {
          return res.status(404).send({ error: 'Doctor not found' });
        }
    
        res.send(doctor);
      } catch (error) {
        console.error('Error fetching doctor:', error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });

    app.delete('/doctors/:id', async (req, res) => {
      const doctorId = req.params.id;
    
      try {
        const result = await doctorCollection.deleteOne({ _id: new ObjectId(doctorId) });
    
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Doctor deleted successfully" });
        } else {
          res.status(404).json({ error: "Doctor not found" });
        }
      } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.patch('/doctors/:id', async (req, res) => {
      const id = req.params.id;
      const updateDoc = {
        $set: {
          img:req.body.img,
          name: req.body.name,
          email: req.body.email,
          specialty:req.body.specialty,

        },
      };
      const result = await doctorCollection.updateOne({ _id: new ObjectId(id) }, updateDoc);
      console.log(updateDoc)
      res.send(result);
    });

     // Booking Appointment
     app.get('/bookings', async (req, res) => {
      const email = req.query.email;
      const result = await bookingCollection.find({ userEmail: email }).toArray();
      res.send(result);
    });

app.get('/bookings/:id', async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid ID format" });
  }

  try {
    const booking = await bookingCollection.findOne({ _id: new ObjectId(id) });
    if (!booking) return res.status(404).send({ error: "Booking not found" });

    res.send(booking);
  } catch (err) {
    res.status(500).send({ error: "Server error", message: err.message });
  }
});
    // GET /appointments/doctor?email=doctor@gmail.com
    app.get('/bookings/doctors', async (req, res) => {
      const doctorEmail = req.query.email;
    
      if (!doctorEmail) {
        return res.status(400).send({ error: 'Doctor email is required' });
      }
    
      try {
        // Find all bookings where the doctor's email matches
        const query = { email: doctorEmail }; // Make sure this matches your DB field for doctor email
        const result = await bookingCollection.find(query).toArray();
    
        if (!Array.isArray(result)) {
          return res.status(500).send({ error: 'Unexpected response from database' });
        }
    
        res.send(result);
      } catch (error) {
        console.error('Error fetching patients for doctor:', error);
        res.status(500).send({ error: 'Failed to fetch doctor\'s patients' });
      }
    });
    
    // booking
    app.post('/bookings', async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

    app.patch('/bookings/:id', async (req, res) => {
      const id = req.params.id;
      const updateDoc = {
        $set: {
          status: req.body.status,
          fullName: req.body.fullName,
          email: req.body.email,
          phone: req.body.phone,
          age: req.body.age,
          gender: req.body.gender,
          paymentMethod: req.body.paymentMethod,
        },
      };
      const result = await bookingCollection.updateOne({ _id: new ObjectId(id) }, updateDoc);
      res.send(result);
    });

    app.delete('/bookings/:id', async (req, res) => {
      const bookingId = req.params.id;
    
      try {
        const result = await bookingCollection.deleteOne({ _id: new ObjectId(bookingId) });
    
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Booking deleted successfully" });
        } else {
          res.status(404).json({ error: "Booking not found" });
        }
      } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
    // doctor scheduel collection
    // MongoDB collection: doctorSchedules

app.post('/schedules', async (req, res) => {
  try {
    const { doctorEmail, availableDays } = req.body;

    if (!doctorEmail || !availableDays) {
      return res.status(400).send({ message: 'Missing doctorEmail or availableDays' });
    }

    const result = await doctorScheduleCollection.updateOne(
      { doctorEmail },
      { $set: { availableDays } },
      { upsert: true }
    );

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to set schedule' });
  }
});

// payment card
app.post("/create-payment-intent", async (req, res) => {
  const { fees } = req.body;
  console.log("💸 Received price:", fees); // <-- Add this

  const amount = parseInt(fees * 100);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log("✅ Sending client secret:", paymentIntent.client_secret); // <-- Log this too
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("❌ Stripe error:", err.message);
    res.status(500).send({ error: err.message });
  }
});

app.post('/payments', async (req, res) => {
  const payment = req.body;  // Get the payment object from the request body
  console.log("💰 Payment received:", payment);

  // Destructure payment fields
  const { appointmentId, fees, email, transactionId, name } = payment;
  console.log(fees)

  // Validate bookingId format
  if (!appointmentId || !ObjectId.isValid(appointmentId)) {
    return res.status(400).send({ error: "Invalid or missing appointmentId format" });
  }
  
  const bookingObjectId = new ObjectId(appointmentId);
  console.log("appointmentId :", appointmentId)

  try {
    // Insert payment record
    const insertResult = await paymentCollection.insertOne(payment);
    console.log("✅ Payment inserted with ID:", insertResult.insertedId);

    // Find the booking before deleting
    const foundBooking = await bookingCollection.findOne({ _id: bookingObjectId });
    // console.log("founfdBooking",foundBooking)

    if (!foundBooking) {
      console.log("❌ No booking found for ID:", appointmentId);
      return res.status(404).send({
        success: false,
        message: "Booking not found. Payment was saved, but booking not deleted."
      });
    }

    console.log("🔍 Booking found:", foundBooking);

    // Delete the booking
    const deleteResult = await bookingCollection.deleteOne({ _id: bookingObjectId });

    console.log("🗑 Booking deleted count:", deleteResult.deletedCount);

    // Send response with details about the inserted payment and booking deletion
    res.send({
      success: true,
      message: "Payment info saved & booking deleted",
      insertedId: insertResult.insertedId,
      deletedBooking: deleteResult.deletedCount
    });

  } catch (error) {
    console.error("❌ Error processing payment:", error);
    res.status(500).send({ error: "Server error while processing payment" });
  }
});

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
run().catch(console.dir);

// Test route
app.get('/', (req, res) => {
  res.send('Medinex is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
