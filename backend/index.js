<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
require('dotenv').config();  // <-- Move this to the top
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
=======
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
>>>>>>> appointment-booking

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
  },
});

async function run() {
  try {
    await client.connect();

<<<<<<< HEAD
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
=======
    const userCollection = client.db("medinex").collection("users");
    const doctorCollection = client.db("medinex").collection("doctors");
    const bookingCollection = client.db("medinex").collection("bookings");
    const scheduleCollection = client.db("medinex").collection("schedules");
    const paymentCollection = client.db("medinex").collection("payments");

    // Role-based Access
    app.get("/users/role", async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.findOne({ email });
      if (user) {
        res.send({ role: user.role });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    });

    // Users
    app.post("/users", async (req, res) => {
>>>>>>> appointment-booking
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    app.delete("/users/:id", async (req, res) => {
      const userId = req.params.id;
      const result = await userCollection.deleteOne({
        _id: new ObjectId(userId),
      });
      res.send(result);
    });

    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role: "admin" } }
      );
      res.send(result);
    });

    app.patch("/users/doctor/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role: "doctor" } }
      );
      res.send(result);
    });

<<<<<<< HEAD
    app.patch('/doctors/:id', async (req, res) => {
=======
    // Doctors
    app.post("/doctors", async (req, res) => {
      const newDoctor = req.body;
      if (!newDoctor.img) {
        return res.status(400).json({ error: "Image is required" });
      }
      const result = await doctorCollection.insertOne(newDoctor);
      res.status(201).send(result);
    });

    app.get("/doctors", async (req, res) => {
      const doctors = await doctorCollection.find().toArray();
      res.send(doctors);
    });

    app.get("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const doctor = await doctorCollection.findOne({ _id: new ObjectId(id) });
      if (!doctor) return res.status(404).send({ error: "Doctor not found" });
      res.send(doctor);
    });

    app.delete("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const result = await doctorCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.patch("/doctors/:id", async (req, res) => {
>>>>>>> appointment-booking
      const id = req.params.id;
      const updateDoc = {
        $set: {
          img: req.body.img,
          name: req.body.name,
          email: req.body.email,
          specialty: req.body.specialty,
        },
      };
<<<<<<< HEAD
      const result = await doctorCollection.updateOne({ _id: new ObjectId(id) }, updateDoc);
      console.log(updateDoc)
      res.send(result);
    });

     // Booking Appointment
     app.get('/bookings', async (req, res) => {
      const email = req.query.email;
      const result = await bookingCollection.find({ userEmail: email }).toArray();
=======
      const result = await doctorCollection.updateOne(
        { _id: new ObjectId(id) },
        updateDoc
      );
>>>>>>> appointment-booking
      res.send(result);
    });

    // Bookings for user
    app.get("/bookings", async (req, res) => {
      const userEmail = req.query.email;
      const doctorEmail = req.query.doctorEmail;

      const query = doctorEmail
        ? { doctorEmail }
        : userEmail
        ? { userEmail }
        : {};

      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });
<<<<<<< HEAD
    
    // booking
    app.post('/bookings', async (req, res) => {
=======

    app.get("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }
      const booking = await bookingCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!booking) return res.status(404).send({ error: "Booking not found" });
      res.send(booking);
    });

    app.post("/bookings", async (req, res) => {
>>>>>>> appointment-booking
      const booking = req.body;
      console.log(booking);
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

    app.patch("/bookings/:id", async (req, res) => {
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
      const result = await bookingCollection.updateOne(
        { _id: new ObjectId(id) },
        updateDoc
      );
      res.send(result);
    });

    app.delete("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const result = await bookingCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // Schedules
    app.post("/schedules", async (req, res) => {
      const { doctorEmail, day, slots } = req.body;

      if (!doctorEmail || !day || !Array.isArray(slots)) {
        return res.status(400).send({ message: "Missing required fields" });
      }

      try {
        const result = await scheduleCollection.updateOne(
          { doctorEmail, "availableDays.day": day },
          {
            $addToSet: {
              "availableDays.$.slots": { $each: slots },
            },
          }
        );

        // If the day doesn't exist yet, push it as a new entry
        if (result.matchedCount === 0) {
          await scheduleCollection.updateOne(
            { doctorEmail },
            {
              $push: {
                availableDays: {
                  day,
                  slots,
                },
              },
            },
            { upsert: true }
          );
        }

        res.send({ success: true, message: "Schedule updated successfully" });
      } catch (error) {
        console.error("Error updating schedule:", error);
        res.status(500).send({ message: "Failed to update schedule" });
      }
    });

    app.get("/schedules", async (req, res) => {
      const { doctorEmail } = req.query;
      console.log("doctor", doctorEmail);
      if (!doctorEmail) {
        return res.status(400).send({ message: "Missing doctorEmail" });
      }

      const schedule = await scheduleCollection.findOne({ doctorEmail });
      res.send(schedule?.availableDays || []);
    });

    // GET: Get a doctor's schedule by email
    // app.get("/schedules/:doctorEmail", async (req, res) => {
    //   const doctorEmail = req.params.doctorEmail;
    //   try {
    //     const schedule = await scheduleCollection.findOne({
    //       doctorEmail,
    //     });
    //     if (!schedule) {
    //       return res.status(404).send({ message: "Schedule not found" });
    //     }
    //     res.send(schedule);
    //   } catch (error) {
    //     console.error("Error fetching schedule:", error);
    //     res.status(500).send({ message: "Server error" });
    //   }
    // });

    // Stripe Payment
    app.post("/create-payment-intent", async (req, res) => {
      const { fees } = req.body;
      const amount = parseInt(fees * 100);
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
          payment_method_types: ["card"],
        });
        res.send({ clientSecret: paymentIntent.client_secret });
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const { appointmentId } = payment;

      if (!appointmentId || !ObjectId.isValid(appointmentId)) {
        return res
          .status(400)
          .send({ error: "Invalid or missing appointmentId format" });
      }

      try {
        const insertResult = await paymentCollection.insertOne(payment);

        const foundBooking = await bookingCollection.findOne({
          _id: new ObjectId(appointmentId),
        });

        if (!foundBooking) {
          return res.status(404).send({
            success: false,
            message:
              "Booking not found. Payment was saved, but booking not deleted.",
          });
        }

        const deleteResult = await bookingCollection.deleteOne({
          _id: new ObjectId(appointmentId),
        });

        res.send({
          success: true,
          message: "Payment info saved & booking deleted",
          insertedId: insertResult.insertedId,
          deletedBooking: deleteResult.deletedCount,
        });
      } catch (error) {
        res
          .status(500)
          .send({ error: "Server error while processing payment" });
      }
    });
  } catch (error) {
<<<<<<< HEAD
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
=======
    console.error("Error connecting to MongoDB:", error);
>>>>>>> appointment-booking
  }
}
run().catch(console.dir);

// Root route
app.get("/", (req, res) => {
  res.send("Medinex is running");
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
