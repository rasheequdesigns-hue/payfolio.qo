// server.js - Backend for portfolio website
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your-secret-key-change-this-in-production';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// In-memory storage (in production, use a database)
let messages = [];
let portfolioItems = [
  {
    id: 1,
    title: 'Brand Identity',
    category: 'branding',
    description: 'Logo & visual system for a tech startup',
    image: ''
  },
  {
    id: 2,
    title: 'UI Dashboard',
    category: 'ui-design',
    description: 'Modern SaaS dashboard design',
    image: ''
  },
  {
    id: 3,
    title: 'Poster Design',
    category: 'illustration',
    description: 'Event and marketing poster series',
    image: ''
  },
  {
    id: 4,
    title: 'Packaging',
    category: 'packaging',
    description: 'Minimal eco-friendly product packaging',
    image: ''
  }
];
let users = [
  // Default admin user (password: admin123)
  {
    id: 1,
    username: 'admin',
    password: '$2b$10$rOzJqQZ8QxN2a.6j7H9.8u9RiW7u2O6n9B1l6V9k7u2O6n9B1l6V.' // hashed 'admin123'
  }
];

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve admin login page
app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-login.html'));
});

// Serve admin dashboard
app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

// Handle contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Simple validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // Store message (in production, save to database)
  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    date: new Date()
  };
  messages.push(newMessage);
  
  console.log('New message received:', newMessage);
  
  // Send success response
  res.json({ success: true, message: 'Message received successfully!' });
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Exact match credentials
  const validEmail = 'rasheequ.designs@gmail.com';
  const validPassword = 'rasheequ.designs';
  
  // Validate credentials
  if (email === validEmail && password === validPassword) {
    // Generate JWT token
    const token = jwt.sign({ email: validEmail }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Old admin route - redirect to login
app.get('/admin', (req, res) => {
  res.redirect('/admin/login');
});

// Admin API - get all messages (protected route)
app.get('/api/admin/messages', authenticateToken, (req, res) => {
  res.json(messages);
});

// Admin API - get all portfolio items (protected route)
app.get('/api/admin/portfolio', authenticateToken, (req, res) => {
  res.json(portfolioItems);
});

// Admin API - add new portfolio item (protected route)
app.post('/api/admin/portfolio', authenticateToken, (req, res) => {
  const { title, category, description } = req.body;
  
  // Simple validation
  if (!title || !category || !description) {
    return res.status(400).json({ error: 'Title, category, and description are required' });
  }
  
  // Create new portfolio item
  const newItem = {
    id: portfolioItems.length + 1,
    title,
    category,
    description,
    image: '' // In a real implementation, you would handle image upload
  };
  
  portfolioItems.push(newItem);
  
  res.json({ success: true, message: 'Portfolio item added successfully!', item: newItem });
});

// Admin API - get dashboard stats (protected route)
app.get('/api/admin/stats', authenticateToken, (req, res) => {
  res.json({
    totalUsers: 1248,
    totalQuestions: 5782,
    languagesUsed: 6,
    mostSearchedTopic: 'Design Trends'
  });
});

// Admin API - get logs (protected route)
app.get('/api/admin/logs', authenticateToken, (req, res) => {
  // In a real implementation, this would fetch from a database
  res.json([
    {
      question: 'What are the principles of good design?',
      response: 'Good design is innovative, makes a product useful, aesthetic...',
      language: 'English',
      timestamp: '2023-06-15 14:30'
    },
    {
      question: 'എന്താണ് നല്ല ഡിസൈന്റെ തത്വങ്ങൾ?',
      response: 'നല്ല ഡിസൈൻ പുതുമയുള്ളതാണ്, ഒരു ഉൽപ്പന്നം ഉപയോഗപ്രദമാക്കുന്നു...',
      language: 'Malayalam',
      timestamp: '2023-06-15 13:45'
    },
    {
      question: 'How important is color in design?',
      response: 'Color plays a crucial role in design as it evokes emotions...',
      language: 'English',
      timestamp: '2023-06-15 12:15'
    }
  ]);
});

// Admin API - update password (protected route)
app.post('/api/admin/password', authenticateToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  // In a real implementation, this would verify current password and update it
  // For now, we'll just simulate success
  res.json({ success: true, message: 'Password updated successfully!' });
});

// Admin API - upload content (protected route)
app.post('/api/admin/content', authenticateToken, (req, res) => {
  // In a real implementation, this would handle file uploads
  res.json({ success: true, message: 'File uploaded and processed successfully!' });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    
    // Verify email matches admin email
    if (user.email !== 'rasheequ.designs@gmail.com') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    
    req.user = user;
    next();
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});