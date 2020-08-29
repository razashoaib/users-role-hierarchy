class Role {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.childRoles = [];
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    addChildRole(roleId) {
        this.childRoles.push(roleId);
    }
}

module.exports = Role;