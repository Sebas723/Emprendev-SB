document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registro-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Always prevent default to handle submission manually
        validateForm().then(valid => {
            if (valid) {
                SaveUser();
            }
        });
    });

    async function checkEmailExists(email) {
        try {
            const response = await $.ajax({
                type: 'GET',
                url: `http://localhost:8080/emprendev/v1/user/email/${email}`, // Adjust URL as necessary
                contentType: 'application/json'
            });
            return response.exists; // Assuming your API returns { exists: true } if email exists
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    }

    async function validateForm() {
        const nombre = document.querySelector('[name="nombre"]').value;
        const apellido = document.querySelector('[name="apellido"]').value;
        const tipoDocumento = document.querySelector('[name="td"]').value;
        const documentoIdentidad = document.querySelector('[name="id_usuario"]').value;
        const fechaNacimiento = document.querySelector('[name="fecha_nac"]').value;
        const rol = document.querySelector('[name="rol"]').value;
        const telefono = document.querySelector('[name="telefono"]').value;
        const correo = document.querySelector('[name="correo"]').value;
        const contrasena = document.querySelector('[name="contrasena"]').value;
        const confirmarContrasena = document.querySelector('[name="confirmarContrasena"]').value;
        const terminosCheckbox = document.querySelector('[name="form-checkbox"]').checked;

        const validacionPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,15}$/;

        let todasLasValidacionesPasaron = true;

        function showErrorMessage(message) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message
            });
            todasLasValidacionesPasaron = false;
        }

        const validaciones = [
            'terminosCheckbox',
            'contrasena',
            'correo',
            'telefono',
            'rol',
            'edad',
            'fechaNacimiento',
            'documentoIdentidad',
            'tipoDocumento',
            'nombreApellido',
            'confirmarContrasena'
        ];

        for (let validacion of validaciones) {
            switch (validacion) {
                case 'terminosCheckbox':
                    if (!terminosCheckbox) {
                        showErrorMessage('Debes aceptar los términos y condiciones.');
                    }
                    break;
                case 'confirmarContrasena':
                    if (contrasena !== confirmarContrasena) {
                        showErrorMessage('La contraseña no coincide');
                    }
                    break;
                case 'contrasena':
                    if (!contrasena.match(validacionPassword)) {
                        showErrorMessage('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.');
                    }
                    break;
                case 'correo':
                    if (!/^\S+@\S+\.\S+$/.test(correo)) {
                        showErrorMessage('Por favor, ingresa un correo electrónico válido.');
                    } else {
                        const emailExists = await checkEmailExists(correo);
                        if (emailExists) {
                            showErrorMessage('El correo electrónico ya está registrado.');
                        }
                    }
                    break;
                case 'telefono':
                    if (isNaN(telefono) || telefono.length != 10) {
                        showErrorMessage('Por favor, ingrese un número de teléfono válido.');
                    }
                    break;
                case 'rol':
                    if (rol === "0") {
                        showErrorMessage('Por favor, selecciona un rol.');
                    }
                    break;
                case 'edad':
                    const fechaNacimientoDate = new Date(fechaNacimiento);
                    const hoy = new Date();
                    let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
                    if (hoy.getMonth() < fechaNacimientoDate.getMonth() || (hoy.getMonth() === fechaNacimientoDate.getMonth() && hoy.getDate() < fechaNacimientoDate.getDate())) {
                        edad--;
                    }
                    if (edad <= 18 || edad > 80) {
                        showErrorMessage('Tu edad no es válida, intenta nuevamente');
                    }
                    break;
                case 'fechaNacimiento':
                    if (!fechaNacimiento) {
                        showErrorMessage('Por favor, ingresa tu fecha de nacimiento.');
                    }
                    break;
                case 'documentoIdentidad':
                    if (isNaN(documentoIdentidad) || /^\s*$/.test(documentoIdentidad) || documentoIdentidad.length != 10) {
                        showErrorMessage('El documento de identidad debe ser un número válido.');
                    }
                    break;
                case 'tipoDocumento':
                    if (tipoDocumento === "0") {
                        showErrorMessage('Por favor, selecciona un tipo de documento.');
                    }
                    break;
                case 'nombreApellido':
                    if (/^\d+$/.test(nombre) || /^\d+$/.test(apellido)) {
                        showErrorMessage('Los nombres y apellidos no pueden contener números.');
                    }
                    if (nombre.trim() === "" || apellido.trim() === "") {
                        showErrorMessage('Por favor, completa los campos de nombres y apellidos.');
                    }
                    break;
                default:
                    break;
            }
        }

        return todasLasValidacionesPasaron;
    }
});

function SaveUser() {
    const userName = $('#username').val();
    const userSecName = $('#usersecname').val();
    const userLName = $('#userlname').val();
    const userLSecName = $('#userlsecname').val();
    const docType = $('#doctype').prop('value');
    const userId = $('#userid').val();
    const birthDate = $('#birthdate').val();
    const role = $('#role').prop('value');
    const phoneNum = $('#phonenum').val();
    const address = $('#address').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const imgProfile = $('#user_icon').attr('src');
    const accountState = 1;
    const creationDate = new Date().toLocaleDateString();

    const newUser = {
        firstName: userName,
        secondName: userSecName,
        lastName: userLName,
        lastName2: userLSecName,
        docType: docType,
        docNum: userId,
        birthDate: birthDate,
        role: role,
        phoneNum: phoneNum,
        address: address,
        email: email,
        password: password,
        imgProfile: imgProfile,
        accountState: accountState,
        creationDate: creationDate
    };

    function Show() {
        console.log(JSON.stringify(newUser));
    }

    Show();

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/emprendev/v1/user",
        contentType: "application/json",
        data: JSON.stringify(newUser),
        success: function (response) {
            console.log("Usuario registrado");
        },
        error: function (xhr, status, error) {
            console.error("Error al agregar estudiante:", error);
        }
    });

    window.location.href = 'Login.html';
}