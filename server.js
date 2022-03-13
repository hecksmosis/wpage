// imports
const express = require("express");
const app = express();
const http = require("http").Server(app); // http
const io = require("socket.io")(http);
const fs = require("fs");

// .env constants
const host = process.env.HOST | "localhost";
const port = process.env.PORT | 8000;

// variables
var data = fs.readFileSync(__dirname + "/private/users.json", "utf8");
var users = JSON.parse(data);

// setup express
app.use("/public", express.static(__dirname + "/public"));

// handle get requests
app.get("/", (req, res) => {
    res.sendFile("/public/index.html", { root: __dirname }); // send index.html to client
});

// socket.io handling
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("newUser", (data) => {
        users[data.username] = { username: data.username, password: data.password };
        fs.writeFile(
            __dirname + "/private/users.json",
            JSON.stringify(users),
            (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            }
        );
    });

    socket.on("logonUser", (data) => {
        if (data.password === users[data.username][password]) {
            socket.emit("successfulLogon", {
                username: data.username,
            });
        } else {
            socket.emit("incorrectPassword", {
                username: data.username,
            });
        }
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// http listener
http.listen(port, () => {
    console.log("listening on " + host + ":" + port);
});