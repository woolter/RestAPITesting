/**
 * Created by wlijo on 5/8/17.
 */
let chakram = require('chakram');
let expect = chakram.expect;
endPoint = require('../data/endPoint.json');
ddt = require('../data/ddt.json');

let schemaCreateUser = {
    name: "",
    age: "",
    salary: ""
};
function userById(id) {
    let usersID = ddt.environment.protocol + ddt.environment.hostname + ddt.environment.port + endPoint.userById;
    usersID = usersID.replace("{id}", id);
    return usersID;
}


describe("Put", function () {
    let userIdToSearch=1;
    let userIdInformation;
    before(function () {
        let userID = userById(userIdToSearch);
        return chakram.get(userID)
            .then (function (response) {
                userIdInformation=response.body;
            })
    });
});