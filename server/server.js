// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// --- MIDDLEWARE CONFIGURATION ---
/**
 * CORS configuration to allow requests from your GitHub Pages frontend.
 * This prevents "Cross-Origin Request Blocked" errors in production.
 */
app.use(cors({
    origin: ['https://yurii0210.github.io', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json()); // Middleware to parse JSON bodies

/**
 * Serve uploaded files statically. 
 * Allows access to images via http://your-server.com/uploads/filename.jpg
 */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- UPLOADS FOLDER INITIALIZATION ---
/**
 * Ensure the 'uploads' directory exists on the server to prevent errors
 * when users upload project images.
 */
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// --- MONGODB CONNECTION ---
/**
 * Connect to MongoDB Atlas using the URI stored in environment variables.
 */
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- DATABASE SCHEMAS & MODELS ---

/**
 * Project Schema for portfolio items.
 */
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

/**
 * Skill Schema for technical expertise visualization.
 */
const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, min: 0, max: 100 },
    category: String,
    icon: String 
});
const Skill = mongoose.model('Skill', skillSchema);

/**
 * Contact Schema to store messages from the website.
 */
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// --- NODEMAILER (EMAIL PROVIDER) CONFIGURATION ---
/**
 * Transporter setup for sending emails via Gmail.
 * Using port 587 and STARTTLS for better compatibility with cloud hosting like Render.
 */
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Must be false for port 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // 16-character App Password
    },
    tls: {
        // Essential for avoiding connection timeouts on some networks
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
    }
});

/**
 * Verify the SMTP connection settings on server startup.
 * This will log success or specific error details to the Render console.
 */
transporter.verify((err, success) => {
    if (err) {
        console.error('❌ Email provider error (Connection failed):', err);
    } else {
        console.log('📧 Email server is ready to send messages');
    }
});

// --- MULTER (FILE UPLOAD) CONFIGURATION ---
/**
 * Storage configuration for Multer to handle image uploads.
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.test(ext)) cb(null, true);
        else cb(new Error('Only images are allowed'));
    }
});

// --- API ROUTES ---

/**
 * @route   POST /api/contact
 * @desc    Save inquiry to DB and send notification email.
 */
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        // Save the message to MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Prepare email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

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
 * @desc    Fetch all projects sorted by date.
 */
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error('❌ Projects fetch error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * @route   GET /api/skills
 * @desc    Fetch all skills for the skills section.
 */
app.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        console.error('❌ Skills fetch error:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- SERVER INITIALIZATION ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});