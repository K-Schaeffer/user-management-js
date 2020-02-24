var fields = document.querySelectorAll("#form-user-create [name]");
var user = {}; // My JSON

fields.forEach(function (field, index) {

    if (field.name == "gender") {
        if (field.checked) {
            user[field.name] = field.value; //Name of the JSON property / Value of it
        }
    } else {
        user[field.name] = field.value;
    }

});

console.log(user);