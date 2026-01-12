// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { google } = require('googleapis'); // Added for HTTP-based email sending
const path = require('path');
const fs = require('fs');

const app = express();

// --- MIDDLEWARE CONFIGURATION ---
app.use(cors({
    origin: ['https://yurii0210.github.io', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- UPLOADS FOLDER INITIALIZATION ---
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// --- MONGODB CONNECTION ---
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- DATABASE SCHEMAS & MODELS ---
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

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, min: 0, max: 100 },
    category: String,
    icon: String 
});
const Skill = mongoose.model('Skill', skillSchema);

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// --- GMAIL OAUTH2 SETUP (BYPASSING SMTP BLOCKING) ---
/**
 * Using Google OAuth2 Client to generate dynamic access tokens.
 * This allows sending emails via HTTPS instead of restricted SMTP ports.
 */
const oAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

oAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

/**
 * Helper function to send email using the latest access token.
 */
async function sendMail(mailOptions) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                accessToken: accessToken.token, // Dynamic token for each request
            },
        });

        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        throw error;
    }
}

// --- API ROUTES ---

/**
 * @route   POST /api/contact
 * @desc    Save inquiry to DB and send notification email via Google API.
 */
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        // 1. Save to MongoDB first
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // 2. Prepare and send email using our OAuth2 helper
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        await sendMail(mailOptions);

        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('❌ Detailed Contact error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Server error', 
            details: error.message 
        });
    }
});

/**
 * @route   GET /api/projects
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
 */
app.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- SERVER INITIALIZATION ---
const PORT = process.env.PORT || 10000; // Updated to match Render default
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});