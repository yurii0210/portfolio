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
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- UPLOADS FOLDER INITIALIZATION ---
// Ensure the uploads directory exists to prevent errors during file saving
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// --- MONGODB CONNECTION ---
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- DATABASE SCHEMAS & MODELS ---

// Project Schema: For portfolio items
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

// Skill Schema: For technical expertise visualization
const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, min: 0, max: 100 },
    category: String, // e.g., 'Frontend', 'Backend', 'Tools'
    icon: String      // Name of the icon or icon URL
});
const Skill = mongoose.model('Skill', skillSchema);

// Contact Schema: To store inquiries from the contact form
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);



// --- NODEMAILER (EMAIL PROVIDER) CONFIGURATION ---
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL/TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password for Gmail
    },
    tls: { rejectUnauthorized: false }
});

// Verify SMTP connection settings on startup
transporter.verify((err) => {
    if (err) console.error('❌ Email provider error:', err);
    else console.log('📧 Email server is ready');
});

// --- MULTER (FILE UPLOAD) CONFIGURATION ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        // Generate unique filename using timestamp and random suffix
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Limit uploads to images only and max size of 5MB
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
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
 * @desc    Save contact inquiry to DB and send notification email
 */
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('❌ Contact error:', error);
        res.status(500).json({ success: false, error: 'Server error, try again later.' });
    }
});

/**
 * @route   GET /api/projects
 * @desc    Get all projects sorted by newest first
 */
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error('❌ Projects error:', error);
        res.status(500).json({ error: 'Server error fetching projects' });
    }
});

/**
 * @route   GET /api/skills
 * @desc    Get all skills
 */
app.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        console.error('❌ Skills error:', error);
        res.status(500).json({ error: 'Server error fetching skills' });
    }
});

/**
 * @route   POST /api/upload
 * @desc    Upload an image for a project
 */
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });
    res.json({ success: true, url: `/uploads/${req.file.filename}` });
});



// --- SERVER INITIALIZATION ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});