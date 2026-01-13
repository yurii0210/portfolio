require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); // Required for HTTP-based email sending via Brevo API
const path = require('path');
const fs = require('fs');

const app = express();

// --- MIDDLEWARE CONFIGURATION ---
app.use(cors({
    origin: ['https://yurii0210.github.io', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));

// Parse incoming JSON requests
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- DIRECTORY INITIALIZATION ---
// Create 'uploads' folder if it doesn't exist to prevent errors
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// --- MONGODB CONNECTION ---
// Using environment variable for security
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- DATABASE MODELS ---

// Schema for contact form submissions
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// Schema for portfolio projects
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [String],
    githubUrl: String,
    liveUrl: String,
    featuredImage: String,
    category: String,
    createdAt: { type: Date, default: Date.now }
});
const Project = mongoose.model('Project', projectSchema);

// Schema for technical skills
const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, min: 0, max: 100 },
    category: String,
    icon: String 
});
const Skill = mongoose.model('Skill', skillSchema);

// --- API ROUTES ---

/**
 * @route   POST /api/contact
 * @desc    Save message to DB and send notification via Brevo API (HTTP)
 */
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation: Ensure all fields are provided
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        // 1. Save data to MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // 2. Send email notification via Brevo API
        // This bypasses SMTP port blocking on hosting providers like Render
        await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: { name: "Portfolio Site", email: process.env.EMAIL_USER },
            to: [{ email: process.env.EMAIL_USER }], // Receives notification to your own email
            subject: `New Message from ${name}`,
            textContent: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
            replyTo: { email: email }
        }, {
            headers: {
                'api-key': process.env.BREVO_API_KEY, // Set this in Render Env Vars
                'Content-Type': 'application/json'
            }
        });

        res.status(201).json({ success: true, message: 'Message sent and saved successfully!' });

    } catch (error) {
        // Detailed error logging for debugging in Render logs
        console.error('❌ Contact Route Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Server error', 
            details: error.message 
        });
    }
});

/**
 * @route   GET /api/projects
 * @desc    Fetch all projects sorted by newest first
 */
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @route   GET /api/skills
 * @desc    Fetch all technical skills
 */
app.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- SERVER STARTUP ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});