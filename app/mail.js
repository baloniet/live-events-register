var nodemailer = require("nodemailer");
var dateformat = require('dateformat')
var smtpTransport = nodemailer.createTransport({
    /*service: "Outlook365",
    host: "smtp.office365.com",
    auth: {
        user: "vgccrm@luniverza.si",
        pass: "Mawo5722"
    }*/
    service: "gmail",
    auth: {
        user: "jsoftl.apps@gmail.com",
        pass: "jlavric12976"
    }

});

function send(data) {
    var mailOptions = {
        to: data.lemail,
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
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            if (res.response.indexOf('250') > -1) {
                // console.log(res.response); LOG to pm2 log ??
            } else {
                console.log(JSON.stringify(res));
                res.end("sent");
            }
        }
    });
}

module.exports.send = send