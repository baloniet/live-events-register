var mysql = require('mysql');
var mail = require('./mail');

var pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'vgccrm.moj-servis.si',
    user: 'event',
    password: 'Vgccrm2=!/',
    database: 'live_events',
    port: '20050',
    debug: false
});

const cntSql = 'SELECT count(*) cnt FROM register r, location l, event e ' +
    'where r.sent = 0 and l.id = e.location_id and e.id = r.event_id and l.email is not null order by r.cdate desc;';
const dataSql =
    'SELECT r.*,l.email lemail,e.name ename,e.starttime,e.endtime FROM register r, location l, event e ' +
    'where r.sent = 0 and l.id = e.location_id and e.id = r.event_id and l.email is not null order by r.cdate desc;';
const updateSql =
    'UPDATE register set sent = 1 where id =';

function count() {

    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("Error in connection database");
            return;
        }

        connection.query(cntSql, function (err, rows) {
            connection.release();
            if (!err) {
                let row = rows[0];
                if (row.cnt == 0)
                    console.log("No new registered users")
                else
                    send(row)
            }
        });

        connection.on('error', function (err) {
            console.log("Error in connection database");
            return;
        });
    });
}

function send(row) {

    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("Error in connection database");
            return;
        }

        connection.query(dataSql, function (err, rows) {
            connection.release();
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    mail.send(rows[i]);
                }
            };

            connection.on('error', function (err) {
                console.log("Error in connection database");
                return;
            });
        });
    })

}

function close(id) {

    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("Error in connection database");
            return;
        }

        connection.query(updateSql + id, function (err, rows) {
            connection.release();
            if (!err) {
                console.log(id + ' closed.')
            };

            connection.on('error', function (err) {
                console.log("Error in connection database");
                return;
            });
        });
    })

}

module.exports.count = count
module.exports.close = close