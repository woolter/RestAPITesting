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
    it("Update Age", function () {
        schemaCreateUser.name = userIdInformation.name;
        schemaCreateUser.age = ddt.userData.ageUpdate;
        schemaCreateUser.salary = userIdInformation.salary;
        return chakram.put(userById(userIdToSearch),schemaCreateUser)
            .then(function (response) {
                console.log(response.body);
                expect(response.body.id).to.equal(userIdToSearch);
                expect(response.body.name).to.equal(userIdInformation.name);
                expect(response.body.age).to.equal(ddt.userData.ageUpdate);
                expect(response.body.salary).to.equal(userIdInformation.salary);
            })
    });
});