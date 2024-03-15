const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/receive-log', (req, res) => {
    const logData = req.body;
    console.log(`${logData.user}: ${logData.message} timestamp: ${logData.timestamp}`);
    res.send('Log received');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});