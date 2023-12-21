const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const csrf = require('csurf');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const dataFilePath = path.join(__dirname + "/src/mock/", 'db.json');
// Middleware
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(csrf({ cookie: true }));

// Routes
app.get('/api/memo_list', async (req, res) => {
    // Handle GET request for items
    const user_id = req.query.user_id;
    let session_id = req.query.session_id;
    let json_file = await fs.readFile(dataFilePath);
    let data = JSON.parse(json_file);
    const user = data.users.find(item => {
        return item.user_id === user_id;
    });
    if (!user) {
        session_id = uuidv4();
        data.users.push({ user_id: user_id, session_id: session_id });
        const updatedData = JSON.stringify(data, null, 2);
        await fs.writeFile(dataFilePath, updatedData);
    }

    res.json({ session_id: session_id, memos: data.memos });
});
app.post('/api/memo_add', async (req, res) => {
    // Handle GET request for items
    const user_id = req.body.user_id;
    const session_id = req.body.session_id;
    const memo_id = req.body.memo_id;
    const content = req.body.content;
    let json_file = await fs.readFile(dataFilePath);
    let data = JSON.parse(json_file);
    const user = data.users.find(item => {
        return item.user_id === user_id;
    });
    if (user) {
        if(user.session_id != session_id)
        {
            res.json({ state: false });
            return;
        }
        data.memos.push({id:memo_id, content: content});

        const updatedData = JSON.stringify(data, null, 2);
        await fs.writeFile(dataFilePath, updatedData);
    }
    else
    {
        res.json({ state: false });
        return;
    }
    res.json({ state: true, memos: data.memos });
});
app.get('/api/memo_delete/:memo_id', async (req, res) => {
    // Handle GET request for items
    const user_id = req.query.user_id;
    const session_id = req.query.session_id;
    const memo_id = req.params.memo_id;
    let json_file = await fs.readFile(dataFilePath);
    let data = JSON.parse(json_file);
    const user = data.users.find(item => {
        return item.user_id === user_id;
    });
    if (user) {
        if(user.session_id != session_id)
        {
            res.json({ state: false });
            return;
        }
        const update_memos = data.memos.filter((memo) => memo.id != memo_id);
        data.memos = [];
        data.memos = update_memos;
        const updatedData = JSON.stringify(data, null, 2);
        await fs.writeFile(dataFilePath, updatedData);
    }
    else
    {
        res.json({ state: false });
        return;
    }
    res.json({ state: true, memos: data.memos });
});
app.get('/api/all_delete', async (req, res) => {
    // Handle GET request for items
    const user_id = req.query.user_id;
    const session_id = req.query.session_id;
    let json_file = await fs.readFile(dataFilePath);
    let data = JSON.parse(json_file);
    const user = data.users.find(item => {
        return item.user_id === user_id;
    });
    if (user) {
        if(user.session_id != session_id)
        {
            res.json({ state: false });
            return;
        }      
        data.memos = [];
        const updatedData = JSON.stringify(data, null, 2);
        await fs.writeFile(dataFilePath, updatedData);
    }
    else
    {
        res.json({ state: false });
        return;
    }
    res.json({ state: true, memos: data.memos });
});
// Start the server
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
