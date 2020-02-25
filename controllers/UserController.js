class UserController {

    constructor(formId, tableId) {
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }

    onSubmit() {

        this.formEl.addEventListener("submit", event => {

            event.preventDefault(); //Canceling the default comportament

            let values = this.getValues();

            this.getPhoto().then(
                (content) => { // If everything went good, then...
                    values.photo = content;
                    this.addLine(values);
                },
                (e) => { // If something went wrong, then...
                    console.error(e);
                });
        });

    } //Closing onSubmit()

    getPhoto() {

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item => { // filter each item

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

    getValues() {

        let user = {};

        [...this.formEl.elements].forEach(function (field, index) { //Converting to array and using spread

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

        tr.innerHTML;;

        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
    `;

        this.tableEl.appendChild(tr); //Adding a chield to the current element

    } //Closing addLine()
}