const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

mongoose.connect("mongodb+srv://dyceventmanagementsystem:dyceventmanagementsystem@cluster0.bsyyzn6.mongodb.net/events",
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Database"))
  .catch(() => { console.log("Error connecting to Database"); })

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
});

const User = mongoose.model('user', userSchema);

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.post('/register', async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;
  
  if (!firstName || !lastName || !userName || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const exist = await User.findOne({ userName });
    if (exist) {
      return res.status(400).json({ success: false, message: 'User Already Exist' });
    }

    const newUser = new User({ firstName, lastName, userName, password });
    await newUser.save();
    
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.log("error in register", error);
    return res.status(500).json({ success: false, message: "Error Registering User" });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});