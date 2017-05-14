/**
 * Created by wlijo on 5/8/17.
 */

let chakram = require('chakram');
let expect = chakram.expect;
endPoint = require('../data/endPoint.json');
ddt = require('../data/ddt.json');

let bodyCreateUser = {
    name: "",
    age: "",
    salary: ""
};
let schemaGetById = {
    "properties": {
        "age": {
            "id": "/properties/age",
            "type": "integer"
        },
        "id": {
            "id": "/properties/id",
            "type": "integer"
        },
        "name": {
            "id": "/properties/name",
            "type": "string"
        },
        "salary": {
            "id": "/properties/salary",
            "type": "integer"
        }
    },
    "required": [
        "salary",
        "age",
        "id",
        "name"
    ],
    "type": "object"
};

function createUser() {
    let users = ddt.environment.protocol + ddt.environment.hostname + ddt.environment.port + endPoint.user;
    return users;
}
function userById(id) {
    let usersID = ddt.environment.protocol + ddt.environment.hostname + ddt.environment.port + endPoint.userById;
    usersID = usersID.replace("{id}", id);
    return usersID;
}
function getIdAfeterCreate(newIdInfo) {
    let sln = newIdInfo.length;
    let n = newIdInfo.lastIndexOf("/");
    let newId = newIdInfo.slice(n+1, sln);
    let userId = userById(newId);
    return userId
}


describe("Create user", function () {
    it("Create new user", function () {
        bodyCreateUser.name = ddt.userData.name;
        bodyCreateUser.age = ddt.userData.age;
        bodyCreateUser.salary = ddt.userData.salary;
        return chakram.post(createUser(), bodyCreateUser)
            .then(function (response) {
                expect(response.response.statusCode).to.equal(201);
                let newIdInfo = response.response.headers.location;
                let userId=getIdAfeterCreate(newIdInfo)
                return chakram.get(userId)
                    .then(function (response) {
                        console.log(response.body);
                        expect(response).to.have.schema(schemaGetById);
                        expect((response.body.id).toString()).to.equal(newID);
                        expect(response.body.name).to.equal(ddt.userData.name);
                        expect(response.body.age).to.equal(ddt.userData.age);
                        expect(response.body.salary).to.equal(ddt.userData.salary);
                    })
            })
    });
});