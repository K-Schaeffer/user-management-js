var fields = document.querySelectorAll("#form-user-create [name]");
var user = {}; // My JSON

function addLine(dataUser) {

    console.log(dataUser)

    document.getElementById("table-users").innerHTML = `
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

}

document.querySelector("#form-user-create").addEventListener("submit", function (event) {

    event.preventDefault(); //Canceling the default comportament

    fields.forEach(function (field, index) {

        if (field.name == "gender") {
            if (field.checked) {
                user[field.name] = field.value; //Name of the JSON property / Value of it
            }
        } else {
            user[field.name] = field.value;
        }

    });

    var objectUser = new User(
        user.name,
        user.gender,
        user.birth,
        user.country,
        user.email,
        user.password,
        user.photo,
        user.admin
    );

    addLine(objectUser);

});

