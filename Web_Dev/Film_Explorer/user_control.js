class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}
class GuestUser extends User {
    constructor() {
        this.name = 'Guest';
        this.email = 'Guest@guest';
    }

}

