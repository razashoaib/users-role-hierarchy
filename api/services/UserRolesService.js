const Role = require("../classes/Role");
const User = require("../classes/User");

class UserRolesService {
    static rolesList = [];
    static usersList = [];
    static resultUsers = [];
    static resultObject = [];

    /**
     * Sets the roles
     * 
     * @param {*} roles 
     */
    static setRoles = (roles) => {
        if (roles.length < 1) {
            throw Error('Atleast one role should be present.');
        };
        roles.forEach(role => {
            if(this.rolesList.hasOwnProperty(role.id)) {
                throw Error('Role ids should be unique');
            }
            if (role.Parent !== 0 && !(this.rolesList.hasOwnProperty(role.Parent))) {
                throw Error('Parent not found. Child cannot be created yet.');
            }
            if (role.Parent !== 0) {
                this.rolesList[role.Parent].addChildRole(role.Id);
            }
            this.rolesList[role.Id] = new Role(role.Name, role.Parent);
        });

        return this.rolesList;
    };

    /**
     * Sets the users and adds the user in the rolesList for that particular role
     * 
     * @param {*} users 
     */
    static setUsersWithRoles = (users) => {
        if (this.rolesList.length < 1) {
            throw Error('Please add roles first');
        }
        if (users.length < 1) {
            throw Error('Users array cannot be empty');
        }
        users.forEach(user => {
            if(!this.rolesList.hasOwnProperty(user.Role)) {
                throw Error('Users cannot have a role thats not included in the roles');
            }
            if(this.usersList.hasOwnProperty(user.Id)) {
                throw Error('Users cannot have a duplicate user Id. Each user should have a unique Id.');
            }
            this.usersList[user.Id] = new User(user.Name, user.Role);
            this.rolesList[user.Role].addUser(user.Id);
        });
        return this.usersList;
    };

    /**
     * Returns the list of users for the given childRoles array
     * 
     * @param {*} childRoles 
     */
    static getUsersAgainstRoles = (childRoles) => {
        childRoles.forEach((childRoleId) => {
            this.rolesList[childRoleId].users.forEach((userId) => {
                this.resultObject.push({
                    'id': userId,
                    'name': this.usersList[userId].name,
                    'role': this.usersList[userId].role
                });
            });
        });
        return this.resultObject;
    }

    /**
     * Gets all the child roles recursively for the given roleId
     * 
     * @param {*} roleId 
     * @param {*} childRoles 
     */
    static getSubordinatesSubRoles = (roleId, childRoles) => {
        if (this.rolesList[roleId].childRoles.length === 0) {
            return childRoles;
        }
        this.rolesList[roleId].childRoles.forEach((role) => {
            childRoles.push(role);
            this.getSubordinatesSubRoles(role, childRoles);
        });
        return childRoles;
    }

    /**
     * Gets the subordinates of the given userId and it's subordinate's subordinates
     * 
     * @param {*} userId 
     */
    static getSubOrdinates = (userId) => {
        let subordinatesSubRoles = this.getSubordinatesSubRoles(this.usersList[userId].role, []);
        return this.getUsersAgainstRoles(subordinatesSubRoles);
    }

    /**
     * Flushes all the variables for this service
     */
    static flushObjects = () => {
        this.rolesList = [];
        this.usersList = [];
        this.resultUsers = [];
        this.resultObject = [];
    }
};

module.exports = UserRolesService;
