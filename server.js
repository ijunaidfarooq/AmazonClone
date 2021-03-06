var express = require("express"),
		morgan = require("morgan"),
		mongoose = require("mongoose"),
		bodyParser = require("body-parser"),
		ejs = require("ejs"),
		engine = require("ejs-mate"),
		session = require("express-session"),
		cookieParser = require("cookie-parser"),
		flash = require("express-flash"),
		secret = require("./config/secret"),
		app = express();


// connecting MongoLabs

mongoose.connect(secret.database, function(err){
	if (err) {
		console.log(err);
	}
	else{
		console.log("Connected to the Database");
	}
});

// Middleware

app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ entended: true }));
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: secret.secretKey
}));
app.use(flash());


app.engine("ejs", engine);
app.set("view engine", "ejs");

var mainRoutes = require("./routes/main");
var userRoutes = require("./routes/user");

app.use(mainRoutes);
app.use(userRoutes);

// created 3000 port as server

app.listen(secret.port, function(err){
	if (err) throw error;
	console.log("Server is running");
});
