const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

//medilwear
app.use(cors());
app.use(express.json());

//Uu0c4TxTgVvRVZ7n
app.get('/', (req, res)=>{
    res.send('server is running')
})


const uri = "mongodb+srv://dinislamadin2004:Uu0c4TxTgVvRVZ7n@cluster0.9ekbhpf.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("usersDB");
        const userCollection = database.collection("users");

        // const userCollection =client.db('usersDB').collection.apply('users');


        app.get("/users", async(req, res) =>{
            const cursor = userCollection.find()
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post("/users", async(req,res)=>{
            const user = req.body;
            console.log('this is ',user);
            const result = await userCollection.insertOne(user);
            res.send(result)
        })

        app.delete("/users/:id",async(req, res)=>{
            const id = req.params.id;
            console.log("please delete  this", id);
            const query = {_id: new ObjectId(id)};
            const result = await userCollection.deleteOne(query);   
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.log);


app.listen(port, ()=>{
    console.log(`server is running in port : ${port}`);
})