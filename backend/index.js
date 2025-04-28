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

    // POST route for user signup
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      console.log('Received new user:', newUser);
      const result = await userCollection.insertOne(newUser);
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
