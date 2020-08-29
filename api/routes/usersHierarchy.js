var express = require('express');
var router = express.Router();
const UserRolesService = require('../services/UserRolesService');

let roles = [
  {
    "Id": 1,
    "Name": "System Administrator",
    "Parent": 0
  },
  {
    "Id": 2,
    "Name": "Location Manager",
    "Parent": 1,
  },
  {
    "Id": 3,
    "Name": "Supervisor",
    "Parent": 2,
  },
  {
    "Id": 4,
    "Name": "Employee",
    "Parent": 3,
  },
  {
    "Id": 5,
    "Name": "Trainer",
    "Parent": 3,
  }
]

let users = [
  {
    "Id": 1,
    "Name": "Adam Admin",
    "Role": 1
  },
  {
    "Id": 2,
    "Name": "Emily Employee",
    "Role": 4
  },
  {
    "Id": 3,
    "Name": "Sam Supervisor",
    "Role": 3
  },
  {
    "Id": 4,
    "Name": "Mary Manager",
    "Role": 2
  },
  {
    "Id": 5,
    "Name": "Steve Trainer",
    "Role": 5
  }
]

/* GET users listing. */
router.get('/', function (req, res, next) {
  UserRolesService.setRoles(roles);
  UserRolesService.setUsersWithRoles(users);

  let jsonToReturn = {
    'status': 'success',
    'users': UserRolesService.usersList.map((val, key) => ({ 'id': key, ...val })).filter((val) => { return val !== null })
  };

  UserRolesService.flushObjects();
  res.json(jsonToReturn);
});

/* GET subordinates w.r.t user_id listing. */
router.get('/subordinates', function (req, res, next) {

  var userId = parseInt(req.query.user_id);
  let jsonToReturn = {};

  // Return 422 'Unprocessible entity' if the user_id is not valid
  if (!userId) {
    jsonToReturn = {
      'status': 'error',
      'message': 'Please add a valid user id'
    }
    res.status(422).json(jsonToReturn);
  }

  UserRolesService.setRoles(roles);
  UserRolesService.setUsersWithRoles(users);

  jsonToReturn = {
    'status': 'success',
    'subordinates': UserRolesService.getSubOrdinates(userId)
  }
  UserRolesService.flushObjects();
  res.json(jsonToReturn);
});

module.exports = router;
