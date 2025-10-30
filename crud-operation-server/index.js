const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

//Cross Origin Resource Sharing;
app.use(cors());

//Middleware;
app.use(express.json());

//Create mongoDb connection;
const uri =
  "mongodb+srv://simpleDBUser:4UaEud3ESRMe3qR1@cluster0.zxor2rk.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const usersDB = client.db("usersDB"); //usersDB name database create korbo
    const usersCollection = usersDB.collection("users"); //users name ekta collection create korbo usersDB database e

    //add database related apis here;
    app.post("/users", async (req, res) => {
      const newUser = req.body; //Req user data recieved from fornt-end input
      console.log("User Info", newUser);
      const result = await usersCollection.insertOne(newUser); //database e user data set korsi
      res.send(result); //user data set korar por res pathabe client side e with (insertedId)
    });
     
    app.get('/users', async (req, res)=>{
        const cursor = usersCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error.
    //await client.close();
  }
}
run().catch(console.dir); //dir-method will print the full object details

app.get("/", (req, res) => {
  res.send("crud server is running");
});

app.listen(port, () => {
  console.log(`crud server is running on port: ${port}`);
});
