'use strict'

module.exports = getProtocols

var sys = require('util')
var exec = require('child_process').exec;


function getProtocols(callback) {
    var name;
    var counter = -1;
    var out = [];

    exec("sudo birdc show protocols all", function (error, stdout, stderr) {
        var lines = stdout.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var row = lines[i].replace(/\,|\!|\?|\;/g, '').split(' ').filter(Boolean);
            if (row[2] == "master") {
                name = row[0];
                out.push({
                    "name": row[0],
                    "proto": row[1],
                    "table": row[2],
                    "state": row[3],
                    "since": row[4],
                    "info": row[5],
                    neighbor: {}
                });
                counter++;
            }
            switch (row[0]) {
                case "Routes:":
                    out[counter].routes = {
                        "imported": row[1],
                        "filtered": row[3],
                        "exported": row[5],
                        "preferred": row[7]
                    };
                    break;
                case "Neighbor":
                    switch (row[1]) {
                        case "address:":
                            out[counter].neighbor.address = row[2];
                            break;
                        case "AS:":
                            out[counter].neighbor.as = row[2];
                            break;
                        case "ID:":
                            out[counter].neighbor.id = row[2];
                            break;
                    }
                    break;
                case "Source":
                    out[counter].sourceAddress = row[2];
                    break;
                case "Route":
                    if (row[1] == "limit:") {
                        out[counter].routeLimit = row[2];
                    }
                    break;
                case "Hold":
                    out[counter].holdTimer = row[2];
                    break;
                case "Keepalive":
                    out[counter].keepaliveTimer = row[2];
                    break;
            }
        }
        callback(out);
    });
}