/**
 * Created by wlijo on 5/8/17.
 */
let chakram = require('chakram');
let expect = chakram.expect;
endPoint = require('../data/endPoint.json');
ddt = require('../data/ddt.json');

let schemaGetAll = {
    "items": {
        "id": "/items",
        "properties": {
            "age": {
                "id": "/items/properties/age",
                "type": "integer"
            },
            "id": {
                "id": "/items/properties/id",
                "type": "integer"
            },
            "name": {
                "id": "/items/properties/name",
                "type": "string"
            },
            "salary": {
                "id": "/items/properties/salary",
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
    },
    "type": "array"
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

function allUser() {
    let users = ddt.environment.protocol + ddt.environment.hostname + ddt.environment.port + endPoint.user;
    return users;
}

function userById(id) {
    let usersID = ddt.environment.protocol + ddt.environment.hostname + ddt.environment.port + endPoint.userById;
    usersID = usersID.replace("{id}", id);
    return usersID;
}

describe("Get User", function () {
    it("All User", function () {
        return chakram.get(allUser())
            .then(function (response) {
                expect(response).to.have.schema(schemaGetAll);
                expect(response.response.statusCode).to.equal(200);
            })
    });
});