class UserController {

    constructor(formId, tableId) {
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }

    onSubmit() {

        this.formEl.addEventListener("submit", event => {

            event.preventDefault(); //Canceling the default comportament

            this.addLine(this.getValues());

        });

    } //Closing onSubmit()

    getValues() {

        let user = {};

       [...this.formEl.elements].forEach(function (field, index) { //Converting to array and using spread

            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value; //Name of the JSON property / Value of it
                }
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

        console.log(dataUser)

        this.tableEl.innerHTML = `
        <tr>
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
    `;

    } //Closing addLine()
}