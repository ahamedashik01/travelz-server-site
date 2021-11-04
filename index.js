const { MongoClient } = require('mongodb');
const express = require('express');
var cors = require('cors');
require('dotenv').config();
const ObjcetId = require('mongodb').ObjectId;

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

        const database = client.db('travelz');
        const packagesCollection = database.collection('packages');
        const orderCollection = database.collection('orders')


        //GET API
        app.get('/packages', async (req, res) => {
            const cursor = packagesCollection.find({});
            const packages = await cursor.toArray();
            res.send(packages);
        });
        app.get('/packages/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjcetId(id) };
            const package = await packagesCollection.findOne(query);
            res.json(package);
        })

        //POST API
        app.post('/packages', async (req, res) => {
            const package = req.body;
            const result = await packagesCollection.insertOne(package);
            res.json(result);

        });

        //ORDER API
        app.post('/booking', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result);
        });

        app.get('/booking', async (req, res) => {
            const cursor = orderCollection.find({});
            const bookings = await cursor.toArray();
            res.json(bookings);
        })

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('ROOT OF TRAVELZ SERVER')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});