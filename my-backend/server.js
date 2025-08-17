const express = require('express');
const multer = require('multer');
const mysql = require('mysql2/promise');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET = 'your_super_secret_key_that_should_be_long_and_random';

const app = express();
const PORT = 3001;

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// --- Database Connection ---
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Tejas2257',
    database: 'NavGallary_db'
};

// --- Multer Configuration ---
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image or video file!'), false);
    }
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage, fileFilter: fileFilter });

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- GALLERY ROUTES (Protected and User-Specific) ---
app.post('/api/upload', authenticateToken, upload.single('photo'), async (req, res) => {
    try {
        const { description } = req.body;
        const filePath = '/uploads/' + req.file.filename;
        const userId = req.user.id; // Get the logged-in user's ID from the token

        const connection = await mysql.createConnection(dbConfig);
        // Add user_id to the INSERT statement to link the upload to the user
        await connection.execute('INSERT INTO gallery (description, file_path, user_id) VALUES (?, ?, ?)', [description, filePath, userId]);
        await connection.end();
        res.status(201).json({ message: 'File uploaded successfully!' });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ message: 'Error uploading file.' });
    }
});

app.get('/api/gallery', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get the logged-in user's ID

        const connection = await mysql.createConnection(dbConfig);
        // Add a "WHERE" clause to only fetch items belonging to the logged-in user
        const [rows] = await connection.execute('SELECT id, description, file_path FROM gallery WHERE user_id = ? ORDER BY uploaded_at DESC', [userId]);
        await connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Fetch Gallery Error:', error);
        res.status(500).json({ message: 'Error fetching gallery.' });
    }
});

app.delete('/api/gallery/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Get the logged-in user's ID

        const connection = await mysql.createConnection(dbConfig);
        // First, get the file path to ensure it exists and belongs to the user
        const [rows] = await connection.execute('SELECT file_path FROM gallery WHERE id = ? AND user_id = ?', [id, userId]);
        if (rows.length > 0) {
            const filePath = rows[0].file_path;
            const fullPath = path.join(__dirname, 'public', filePath);
            fs.unlink(fullPath, (err) => {
                if (err) console.error("File Deletion Error:", err);
            });
        }
        // Add user_id to the DELETE statement for security, so users can only delete their own items
        await connection.execute('DELETE FROM gallery WHERE id = ? AND user_id = ?', [id, userId]);
        await connection.end();
        res.status(200).json({ message: 'Item deleted successfully!' });
    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({ message: 'Error deleting item.' });
    }
});

// --- AUTHENTICATION ROUTES (Public) ---
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        await connection.end();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Username already exists.' });
        }
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Error registering user.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
        await connection.end();
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful!', token: token });
        } else {
            res.status(401).json({ message: 'Invalid username or password.' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Error logging in.' });
    }
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});