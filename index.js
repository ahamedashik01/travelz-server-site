const { MongoClient } = require('mongodb');
const express = require('express');
var cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// uri 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5cdlp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
// client 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('client connected');
    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('ROOT OF TRAVELZ SERVER')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});