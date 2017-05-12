/**
 * Created by wlijo on 5/8/17.
 */
let chakram = require('chakram');
let expect = chakram.expect;
endPoint = require('../data/endPoint.json');
ddt = require('../data/ddt.json');


function deleteAllUser() {
    let users = ddt.environment.protocol + ddt.environment.hostname + ddt.environment.port + endPoint.user;
    return users;
}

function deleteUserById(id) {
    let usersID = ddt.environment.protocol + ddt.environment.hostname + ddt.environment.port + endPoint.userById;
    usersID = usersID.replace("{id}", id);
    return usersID;
}

