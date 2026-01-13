require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();

// --- MIDDLEWARE ---
app.use(cors({
    origin: ['https://yurii0210.github.io', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- INITIALIZE UPLOADS DIR ---
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// --- MONGODB CONNECTION ---
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- SCHEMAS & MODELS ---
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

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

// --- API ROUTES ---

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // 1. Basic Validation
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        // 2. Save to MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        console.log('📝 Message saved to Database');

        // 3. Prepare Brevo API call
        const apiKey = String(process.env.BREVO_API_KEY || '').trim();
        const senderEmail = String(process.env.EMAIL_USER || '').trim();

        // Debug info (only existence, not the key itself)
        console.log('🛠 Debug: API Key length:', apiKey.length);
        console.log('🛠 Debug: Sender Email:', senderEmail);

        if (!apiKey) {
            throw new Error('BREVO_API_KEY is missing in environment variables');
        }

        // 4. Send Email via Brevo HTTP API
        const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: { name: "Portfolio Contact", email: senderEmail },
            to: [{ email: senderEmail }], 
            replyTo: { email: email },
            subject: `New Portfolio Message from ${name}`,
            textContent: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        }, {
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log('📧 Email sent successfully via Brevo. ID:', response.data.messageId);
        res.status(201).json({ success: true, message: 'Message processed successfully!' });

    } catch (error) {
        // Detailed error extraction
        const errorData = error.response ? error.response.data : error.message;
        console.error('❌ Detailed Error:', errorData);

        res.status(500).json({ 
            success: false, 
            error: 'Failed to process message',
            details: typeof errorData === 'object' ? errorData.message : errorData
        });
    }
});

app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- START SERVER ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});