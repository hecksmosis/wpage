// Wait for the window to load
window.onload = () => {
    // setup socket.io
    var socket = io();

    var newUserB = document.getElementById("newUser");
    var existingUserB = document.getElementById("existingUser");
    var check1 = document.getElementById("nameForm");
    var passwd = document.getElementById("passwd");

    // check if the checkboxes are checked and append thing
    newUserB.onclick = () => {
        socket.emit("newUser", {
            username: check1.value,
            password: passwd.value,
        });
    };
    newUserB.onclick = () => {
        socket.emit("logonUser", {
            username: check1.value,
            password: passwd.value,
        });
    };

    socket.on("userExists", (data) => {
        alert("User " + data.username + " already exists, please log on to continue.");
    });
};