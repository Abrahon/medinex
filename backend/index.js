const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

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

    // POST route for user signup
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      console.log('Received new user:', newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });
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
    app.get('/bookings', async (req, res) => {
      const email = req.query.email;
      const result = await bookingCollection.find({ userEmail: email }).toArray();
      res.send(result);
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
    // booking
    app.post('/bookings', async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
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
