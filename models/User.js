class User {

    constructor(name, gender, birth, country, email, password, photo, admin) {

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get gender() {
        return this._gender;
    }

    set gender(value) {
        this._gender = value;
    }

    get birth() {
        return this._birth;
    }

    set birth(value) {
        this._birth = value;
    }

    get country() {
        return this._country;
    }

    set country(value) {
        this._country = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    set photo(value) {
        this._photo = value;
    }

    get admin() {
        return this._admin;
    }

    get register() {
        return this._register;
    }

    loadFromJSON(json) {

        for (let name in json) {

            switch (name) {
                case '_register':
                    this[name] = new Date(json[name]);
                    break;
                default:
                    this[name] = json[name];
            }

        }

    }

    static getUsersStorage() {
        let users = []; // Array of users

        if (localStorage.getItem("users")) { // Is there any user?

            users = JSON.parse(localStorage.getItem("users")); // Yes? So convert it

        }

        return users;

    }

    getNewId() {

        if (!window.id) window.id = 0;

        id++;

        return id;

    }

    save() {

        let users = User.getUsersStorage(); // Taking all users

        if (this.id > 0) { // Is there any id? (Editing)

            users.map(u => { // Looking for the data I want to replace

                if (u._id == this.id) { // Replacing

                    Object.assign(u, this);

                }

                return u;

            })

        } else { // Creating

            this.id = this.getNewId();

            users.push(this);

        }

        localStorage.setItem("users", JSON.stringify(users));


    }





}