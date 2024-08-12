const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rajan&mysql123',
    database: 'bannerDB'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

app.get('/api/banner', (req, res) => {
    const query = 'SELECT * FROM bannerSettings LIMIT 1';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});



app.post('/api/banner', (req, res) => {
    const { description, timer, link, isVisible } = req.body;

    const sql = `
        UPDATE bannerSettings
        SET description = ?, timer = ?, link = ?, isVisible = ?
        WHERE id = 1
    `;

    db.query(sql, [description, timer, link, isVisible], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to update banner settings' });
        }
        res.status(200).json({ message: 'Banner settings updated!' });
    });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
