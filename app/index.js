var db = require('./db');

setInterval(countNewEmails, 10000);

function countNewEmails() {
    db.count();
}