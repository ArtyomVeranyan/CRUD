var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://artyomveranyan:Tyom2010@artyomveranyan.onzl8fg.mongodb.net/sample_mflix";

app.use(express.static("public"));

app.get("/", function (req, res) {
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Connection error:"));
    db.once("open", async () => {
      console.log("Connected to MongoDB!");

      try {
        const mascots = await mongoose.connection.db
          .collection("theaters")
          .find({
              'location.address.city': "Bloomington"
          }, ).toArray();

          res.render('../public/form.ejs', {
            info : mascots
          })
      } catch (error) {
        console.error("Error retrieving movies:", error);
      } finally {
        mongoose.connection.close();
      }
    });
});

app.post("/addName", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", async () => {
    console.log("Connected to MongoDB!");

    try {
      const allMovies = await mongoose.connection.db
        .collection("theaters")
        .find([{
            'location.address.city': "Bloomington"
        }, {
            'location.address.city': "Bloomington"
        }]).toArray();
      console.log("All Movies:", allMovies);
    } catch (error) {
      console.error("Error retrieving movies:", error);
    } finally {
      mongoose.connection.close();
    }
  });
});

app.listen(3000, function () {
  console.log("Example is running on port 3000");
});
