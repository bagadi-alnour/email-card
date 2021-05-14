const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors());

const uri = require("./config/keys").mongoURI;

mongoose.connect(
    uri,{
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);

app.use("/api/email", require("./routes/api/mail"))

if (process.env.NODE_ENV === "production") {
    app.use('/static', express.static(path.join(__dirname, 'public')))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));

    });
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

