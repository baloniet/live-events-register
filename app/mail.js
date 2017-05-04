var nodemailer = require("nodemailer");
var db = require("./db");
var dateformat = require('dateformat');
var smtpTransport = nodemailer.createTransport({
    service: "Outlook365",
    auth: {
        user: "vgccrm@luniverza.si",
        pass: "Mawo5722"
    }
});

function send(data) {
    var mailOptions = {
        to: data.lemail,
        from: 'vgccrm@luniverza.si',
        subject: 'VGCCRM prijava preko spletnega obrazca',
        text: 'Na dogodek ' + data.ename + ', ' + dateformat(data.starttime, 'd. m. yyyy') + ' ob ' +
            dateformat(data.starttime, 'H.MM') + ' uri,  se prijavlja ' + data.name + ' ' + data.lastname +
            '. Kontaktni podatki: ' + data.email + ', telefon:' + data.phone,
        html: 'Na dogodek <b>' + data.ename + '</b>, ' + dateformat(data.starttime, 'd. m. yyyy') + ' ob ' +
            dateformat(data.starttime, 'H.MM') + ' uri,  se prijavlja <b>' + data.name + ' ' + data.lastname +
            '</b>. Kontaktni podatki: <a href="mailto:' + data.email + '">' + data.email + '</a> ' +
            'telefon: ' + data.phone
    }
    smtpTransport.sendMail(mailOptions, function (error, res) {
        console.log(JSON.stringify(res));
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            if (res.response.indexOf('250') > -1) {
                console.log(res.response, data.lastname, data.ename);
                db.close(data.id);
            } else {
                console.log(JSON.stringify(res));
                res.end("sent");
            }
        }
    });
}

function testMail() {
    var mailOptions = {
        to: 'janez.lavric@gmail.com',
        from: 'vgccrm@luniverza.si',
        subject: 'VGCCRM register mail test',
        text: '',
        html: 'Register server has started.'
    }
    console.log('sending test mail');
    smtpTransport.sendMail(mailOptions, function (error, res) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            if (res.response.indexOf('250') > -1) {
                console.log(res.response, data.lastname, data.ename);
                db.close(data.id);
            } else {
                console.log(JSON.stringify(res));
                res.end("sent");
            }
            console.log('mail server response: ', res, error);
        }
        console.log('mail server response: ', res, error);
    });
}

module.exports.send = send
module.exports.testMail = testMail