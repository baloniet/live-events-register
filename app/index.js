var db = require('./db');

setInterval(countNewEmails, 10000);

function countNewEmails() {
    console.log("start");
    db.count();
}