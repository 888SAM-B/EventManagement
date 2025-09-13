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

const orgSchema = new mongoose.Schema({
  orgName:String,
  number:Number,
  userName:String,
  password:String,
})

const User = mongoose.model('user', userSchema);
const Organization =mongoose.model('organization',orgSchema)

const OtherContactSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  number: {
    type: String,
    
  }
});

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  timing: {
    type: Date,
    required: true
  },
  organizationName: {
    type: String,
    required: true
  },
  organizerName: {
    type: String,
    required: true
  },
  organizerNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  organizerMail: {
    type: String,
    required: true
  },
  registrationLink: {
    type: String,
    required: true
  },
  awards: {
    type: String
  },
  entranceFees: {
    type: String,
    default: "0"
  },
  category: {
    type: String,
    required: true,
    enum: ["technical", "cultural", "mathematical", "science", "arts", "mixed"]
  },
  description: {
    type: String
  },
  pdfFileUrl: {
    type: String,
    required: true
  },
  otherContacts: [OtherContactSchema],
  createdAt: {
    type: String,
    required: true,
    default: Date.now
  },
  createdBy: {
    type: String,
    required: true
  }
});

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

app.post('/insregister', async (req, res) => {
  const { insName, number,userName, password } = req.body;
  
  if ( !insName || !number|| !userName || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const exist = await Organization.findOne({ userName });
    if (exist) {
      return res.status(400).json({ success: false, message: 'User Already Exist' });
    }

    const newOrganization = new Organization({ orgName:insName,number,userName, password });
    await newOrganization.save();
    
    return res.status(201).json({
      success: true,
      message: 'Organization registered successfully',
    });
  } catch (error) {
    console.log("error in register", error);
    return res.status(500).json({ success: false, message: "Error Registering User" });
  }
});




app.post('/login',async(req,res)=>{
  const { userName, password } = req.body;
  if(!userName || !password){
    return res.status(400).json({success:false,message:"All fields are required"});
  }
  const user =await User.findOne({userName,password});
  if(!user){
    return res.status(400).json({success:false,message:"Invalid Credentials"});
  }
  console.log("user",user);
  
  return res.status(200).json({success:true,message:"Login Successful",user});

})

app.get('/fetchOrg',async(req,res)=>{
  try {
    const orgs = await Organization.find({});
    console.log(orgs)
    res.status(200).json({ success: true, orgNames: orgs.map(org => org.orgName) });

  } catch (error) {
    console.error("Error fetching organizations:", error);
    res.status(500).json({ success: false, message: "Error fetching organizations" });
  }
})

app.post('/inslogin',async(req,res)=>{
  const {institution,userName,password}=req.body;
  console.log(institution,userName,password)
   if(!institution || !userName || !password){
    return res.status(400).json({success:false,message:"All fields are required"});
  }
  const user =await Organization.findOne({orgName:institution,userName,password});
  if(!user){
    return res.status(400).json({success:false,message:"Invalid Credentials"});
  }
  console.log("Ins Login",user);
  
  return res.status(200).json({success:true,message:"Login Successful",user});
})


app.get('/fetchUser', async (req, res) => {
  const userId = req.query.user;
  console.log("UserId:", userId);
  try {
    const user = await User.findOne({ userName: userId });
    if (!user) {
      console.log("User Not Found");
      return res.status(400).json({ success: false, message: "Cannot find User" }); // ✅ added return
    }
    console.log("User Found:", user);
    return res.status(200).json({ success: true, user }); // ✅ 200 OK instead of 201 Created
  } catch (error) {
    console.error("Error in /fetchUser:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});


app.get('/fetchOrgUser', async (req, res) => {
  const userId = req.query.user;
  console.log("UserId:", userId);
  try {
    const user = await Organization.findOne({ userName: userId });
    if (!user) {
      console.log("User Not Found");
      return res.status(400).json({ success: false, message: "Cannot find User" }); // ✅ added return
    }
    console.log("User Found:", user);
    return res.status(200).json({ success: true, user }); // ✅ 200 OK instead of 201 Created
  } catch (error) {
    console.error("Error in /fetchUser:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});


app.post('/addEvent', async (req, res) => {
  const {
    eventName,
    venue,
    timing,
    organizerName,
    organizerNumber,
    organizerMail,
    registrationLink,
    awards,
    entranceFees,
    category,
    description,
    pdfFileUrl,
    otherContacts,
    createdAt,
    createdBy
  } = req.body;

  if (!eventName || !venue || !timing || !organizerName || !organizerNumber || !organizerMail || !registrationLink || !category || !pdfFileUrl) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const org=await Organization.findOne({userName:createdBy})
    const orgName = org.orgName;
    console.log(org,orgName)

    const newEvent = new mongoose.model('Event', EventSchema)({
      eventName,
      venue,
      timing: new Date(timing),
      organizationName:orgName,
      organizerName,
      organizerNumber,
      organizerMail,
      registrationLink,
      awards,
      entranceFees: entranceFees == 0 ?"Free": entranceFees || "0", // Default to "0" if not provided
      category,
      description: description || '', // Default to empty string if not provided
      pdfFileUrl,
      otherContacts: otherContacts || [],
      createdAt: new Date(createdAt),
      createdBy
    });

    await newEvent.save();
    
    return res.status(201).json({ success: true, message: 'Event added successfully' });
  } catch (error) {
    console.error("Error adding event:", error);
    return res.status(500).json({ success: false, message: 'Error adding event' });
  }
});


app.get('/getData', async (req, res) => {
  try {
    const events = await mongoose.model('Event', EventSchema).find({});
    if (events.length === 0) {
      return res.status(404).json({ success: false, message: 'No events found' });
    }
    const userName = req.headers['username'];
    console.log("Request from user:", userName);
    if (!userName) {
      return res.status(400).json({ success: false, message: 'Username  is required' });
    }
    return res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ success: false, message: 'Error fetching events' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});