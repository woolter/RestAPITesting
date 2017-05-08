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

describe("Delete", function () {

    it("Delete by Id", function () {
        let userID = deleteUserById(ddt.userData.deleteId);
        return chakram.delete(userID)
            .then(function (response) {
                expect(response.response.statusCode).to.equal(204);
                return chakram.get(userID)
                    .then(function (response) {
                        expect(response.response.body.errorMessage).to.equal("User with id "+ddt.userData.deleteId+" not found");
                    })
            })
    });
    it("All User", function () {
        return chakram.delete(deleteAllUser())
            .then(function (response) {
                expect(response.response.statusCode).to.equal(204);
                return chakram.get(deleteAllUser())
                    .then(function (response) {
                        expect(response.response.statusCode).to.equal(204);
                        console.log(response);
                    })
            })
    });
});