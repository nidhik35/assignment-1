const express = require('express');
const app = express();
app.use(express.json());
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Nidhik:nidhik123@cluster0.nvszu0s.mongodb.net/?appName=Cluster0";
// Create MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Database and Collection
const dbName = "college";
const collectionName = "professors";

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}
connectDB();

// ➕ Add a new professor
app.post('/add-professor', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    res.json({ message: "Professor added successfully!", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add professor", details: error.message });
  }
});

// 📋 Get all professors
app.get('/professors', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const filter = req.query.dept ? { dept: req.query.dept } : {};
    const professors = await collection.find(filter).toArray();
    res.json({ total: professors.length, data: professors });
  } catch (error) {
    res.status(500).json({ error: "Failed to get professors", details: error.message });
  }
});

// ✏️ Update professor by name
app.put('/update-professor/:name', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(
      { name: req.params.name },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ message: "Professor not found" });
    } else {
      res.json({ message: "Professor updated successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update professor", details: error.message });
  }
});

// ❌ Delete professor by name
app.delete('/delete-professor/:name', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ name: req.params.name });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Professor not found" });
    } else {
      res.json({ message: "Professor deleted successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete professor", details: error.message });
  }
});

// 🏁 Default route
app.get('/', (req, res) => {
  res.send(" MongoDB Professor API is running...");
});

const PORT = 3000;
app.listen(PORT, () => console.log('Server running on  http://localhost:${PORT}'));