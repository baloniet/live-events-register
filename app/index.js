var db = require('./db');

countNewEmails();
setInterval(countNewEmails, 300000); //every 5 minutes

function countNewEmails() {
    console.log(new Date(), 'start');
    db.testMail();
    db.count();
}