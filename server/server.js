require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();

// --- МІДЛВЕЙРИ ---
app.use(cors({
    origin: ['https://yurii0210.github.io', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ІНІЦІАЛІЗАЦІЯ ПАПКИ UPLOADS ---
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// --- ПІДКЛЮЧЕННЯ ДО MONGODB ---
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- СХЕМИ ТА МОДЕЛІ ---
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

// --- НАЛАШТУВАННЯ ПОШТИ (Secure SMTP Port 465) ---
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Використовуємо SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS 
    },
    tls: {
        rejectUnauthorized: false 
    }
});

// --- API МАРШРУТИ ---

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        // 1. Збереження в базу
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // 2. Відправка листа
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
        console.error('❌ Detailed Contact error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Server error', 
            details: error.message 
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

// --- ЗАПУСК СЕРВЕРА ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});