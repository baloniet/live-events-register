var db = require('./db');

console.log(new Date(), 'start');
db.testMail();

countNewEmails();
setInterval(countNewEmails, 300000); //every 5 minutes

function countNewEmails() {
    db.count();
}