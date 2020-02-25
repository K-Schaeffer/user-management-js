class UserController {

    constructor(formIdCreate, formIdUpdate, tableId) {
        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();

    } //Closing constructor

    onSubmit() {

        this.formEl.addEventListener("submit", event => {

            event.preventDefault(); //Canceling the default comportament

            let btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formEl);

            if (!values) return false;

            this.getPhoto(this.formEl).then(
                (content) => { // If everything went good, then...
                    values.photo = content;
                    this.addLine(values);

                    this.formEl.reset();

                    btn.disabled = false;
                },
                (e) => { // If something went wrong, then...
                    console.error(e);
                });
        });

    } //Closing onSubmit()

    onEdit() {

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {
            this.showPanelCreate();
        });

        this.formUpdateEl.addEventListener("submit", event => {

            event.preventDefault();

            let btn = this.formUpdateEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, userOld, values); // Switching data

            this.getPhoto(this.formUpdateEl).then(
                (content) => {

                    if (!values.photo) {
                        result._photo = userOld._photo; // Keeping old photo
                    } else {
                        result._photo = content; // New photo
                    }

                    tr.dataset.user = JSON.stringify(result); // Converting to string

                    tr.innerHTML = `
                    <td><img src="${result._photo}" alt="User Image" class="img-circle img-sm"></td>
                    <td>${result._name}</td>
                    <td>${result._email}</td>
                    <td>${(result._admin) ? 'Sim' : 'Não'}</td>
                    <td>${Utils.dateFormat(result._register)}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
                     `;

                    this.addEventsTR(tr);
                    this.updateCount();
                    this.formUpdateEl.reset();
                    btn.disabled = false;
                    this.showPanelCreate();
                },
                (e) => {
                    console.error(e);
                });
        }); 


    } //Closing onEdit()

    getPhoto(formEl) {

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            let elements = [...formEl.elements].filter(item => { // filter each item

                if (item.name === 'photo') { // if this item is a photo, so, return
                    return item;
                }

            });

            let file = elements[0].files[0]; // Only one file

            fileReader.onload = () => { //onload is the callback, it will run after the upload

                fileReader.result;
                resolve(fileReader.result); //it will send the resolve
            };

            fileReader.onerror = () => {
                reject(e); //In case of error it will send the reject
            };

            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg'); // Returning a default image
            }

        });

    } //Closing getPhoto()

    getValues(formEl) {

        let user = {};
        let isValid = true;

        [...formEl.elements].forEach(function (field, index) { //Converting to array and using spread

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) { //Searching for name, email and password in the array

                field.parentElement.classList.add('has-error'); //Calling the parentElement and using the classList colection
                isValid = false;
            }

            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value; //Name of the JSON property / Value of it
                }
            } else if (field.name == "admin") {
                user[field.name] = field.checked;
            } else {
                user[field.name] = field.value;
            }

        });

        if (!isValid) {
            return false;
        }

        return new User( // Instead of returning a JSON, I'm returning a user object
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );

    } //Closing getValues()


    addLine(dataUser) {

        let tr = document.createElement('tr');

        //using a dataset called user
        tr.dataset.user = JSON.stringify(dataUser); //Converting object to a JSON string

        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
            `;

        this.addEventsTR(tr);

        this.tableEl.appendChild(tr); //Adding a child to the current element

        this.updateCount();


    } //Closing addLine()


    addEventsTR(tr) {
        tr.querySelector(".btn-edit").addEventListener("click", e => {

            let json = JSON.parse(tr.dataset.user);

            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for (let name in json) {

                let field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "]"); // Selecting the same element of the JSON

                if (field) {

                    switch (field.type) {
                        case 'file':
                            continue;
                            break;

                        case 'radio':
                            field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            field.checked = true;
                            break;

                        case 'checkbox':
                            field.checked = json[name];
                            break;

                        default:
                            field.value = json[name];
                    }

                    field.value = json[name];
                }
            }

            this.formUpdateEl.querySelector(".photo").src = json._photo; // Switching photos

            this.showPanelUpdate();

        })

    } //Closing addEventsTR

    showPanelCreate() {
        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";
    } //Closing showPanelCreate()

    showPanelUpdate() {
        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";
    } //Closing showPanelUpdate()

    updateCount() {

        let numberUsers = 0;
        let numberAdmins = 0;

        [...this.tableEl.children].forEach(tr => { //Converting colection to array and using spread

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmins++; // I call the private one because It's inside of the JSON,
            // and not in a instance of my obj

        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmins;


    } //Closing updateCount()
}