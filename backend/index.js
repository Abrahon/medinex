const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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

    const userCollection = client.db("medinex").collection("users");
    const doctorCollection = client.db("medinex").collection("doctors");
    const bookingCollection = client.db("medinex").collection("bookings");
    // const confrimAppointmentCollection = client
    //   .db("medinex")
    //   .collection("appointment");
    const scheduleCollection = client.db("medinex").collection("schedules");
    const paymentCollection = client.db("medinex").collection("payments");

    //Token genarate
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      // Generate the JWT token
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    });

    // Verify Token API
    const verifyToken = (req, res, next) => {
      console.log("Authorization header:", req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send("unauthorized");
      }

      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).send("Forbidden");
        req.user = decoded;
        next();
      });
    };

    //admin veryfy API
    const verifyAdmin = async (req, res, next) => {
      const email = req.user?.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);

      if (user?.role !== "admin") {
        return res.status(403).send("Forbidden: Admins only");
      }
      next();
    };

    // Role-based Access API
    app.get("/users/role", verifyToken, async (req, res) => {
      const email = req.query.email;

      // Use req.user instead of req.decoded to get the decoded email
      if (email !== req.user.email) {
        return res
          .status(403)
          .send({ message: "Forbidden access", role: null });
      }
      try {
        const user = await userCollection.findOne({ email });

        if (user && user.role) {
          res.send({ role: user.role });
        } else {
          res
            .status(404)
            .send({ message: "User not found or role missing", role: null });
        }
      } catch (error) {
        res
          .status(500)
          .send({ message: "Server error", error: error.message, role: null });
      }
    });

    // Users
    app.post("/users", async (req, res) => {
      const user = req.body;
      const existingUser = await userCollection.findOne({ email: user.email });

      if (existingUser) {
        return res.status(409).send({ message: "User already exists" });
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      console.log(req.headers);
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const userId = req.params.id;
      const result = await userCollection.deleteOne({
        _id: new ObjectId(userId),
      });
      res.send(result);
    });

    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const result = await userCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role: "admin" } }
        );
        res.send(result);
      }
    );

    app.patch(
      "/users/doctor/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const result = await userCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role: "doctor" } }
        );
        res.send(result);
      }
    );

    app.patch("/users/user/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role: "user" } }
      );
      res.send(result);
    });

    // Doctors API start here
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

    app.delete("/doctors/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const result = await doctorCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.patch("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const updateDoc = {
        $set: {
          img: req.body.img,
          name: req.body.name,
          email: req.body.email,
          specialty: req.body.specialty,
        },
      };
      const result = await doctorCollection.updateOne(
        { _id: new ObjectId(id) },
        updateDoc
      );
      res.send(result);
    });

    // Appointment booking API start here
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
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

    app.patch("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const updateDoc = {
        $set: {
          status: req.body.status,
          fullName: req.body.fullName,
          // email: req.body.email,
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

    // Schedules API set
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
      console.log(doctorEmail);
      if (!doctorEmail) {
        return res.status(400).send({ message: "Missing doctorEmail" });
      }

      const schedule = await scheduleCollection.findOne({ doctorEmail });
      res.send(schedule?.availableDays || []);
    });

    // Stripe Payment API
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
      console.log(appointmentId);

      if (!appointmentId || !ObjectId.isValid(appointmentId)) {
        return res
          .status(400)
          .send({ error: "Invalid or missing appointmentId format" });
      }

      try {
        const insertResult = await paymentCollection.insertOne(payment);

        res.send({
          success: true,
          message: "Payment info saved successfully",
          insertedId: insertResult.insertedId,
        });
      } catch (error) {
        res
          .status(500)
          .send({ error: "Server error while processing payment" });
      }
    });

    app.get("/payment-history/:email", async (req, res) => {
      const query = { email: req.params.email };
      console.log("payment history", query);
      const result = await paymentCollection
        .find(query)
        .sort({ paymentTime: -1 })
        .toArray();
      res.send(result);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
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
