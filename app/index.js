var db = require('./db');

setInterval(countNewEmails, 300000); //every 5 minutes

function countNewEmails() {
    console.log("start");
    db.count();
}