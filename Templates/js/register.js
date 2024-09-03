document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registro-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Siempre prevenir el comportamiento por defecto para manejar la sumisión manualmente

        const valid = await validateForm();
        if (valid) {
            SaveUser();
        }
    });

    async function checkEmailExists(email) {
        try {
            const response = await $.ajax({
                type: "GET",
                url: `http://localhost:8080/emprendev/v1/user/email/${email}`, // Ajusta la URL según sea necesario
                contentType: "application/json",
                xhrFields: {
                    withCredentials: true,
                },
            });
            return response.exists; // Suponiendo que tu API devuelve { exists: true } si el email existe
        } catch (error) {
            console.error("Error checking email:", error);
            return false;
        }
    }

    async function validateForm() {
        const nombre = document.querySelector('[name="nombre"]').value;
        const segundoNombre = document.querySelector('[name="nombre2"]').value;
        const apellido = document.querySelector('[name="apellido"]').value;
        const segundoApellido = document.querySelector('[name="apellido2"]').value;
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
                icon: "error",
                title: "Error",
                text: message,
            });
            todasLasValidacionesPasaron = false;
        }

        const validaciones = [
            "terminosCheckbox",
            "confirmarContrasena",
            "contrasena",
            "correo",
            "telefono",
            "rol",
            "fechaNacimiento",
            "documentoIdentidad",
            "tipoDocumento",
            "segundoApellido",
            "apellido",
            "segundoNombre",
            "nombre",
        ];

        for (let validacion of validaciones) {
            switch (validacion) {
                case "nombre":
                    if (/[\d\W]+/.test(nombre)) {
                        showErrorMessage("Los nombres no pueden contener números o simbologías.");
                    }
                    if (nombre.trim() === "") {
                        showErrorMessage("Por favor, completa el campo Primer Nombre");
                    }
                    break;
                case "segundoNombre":
                    if (/[\d\W]+/.test(segundoNombre)) {
                        showErrorMessage("Los nombres no pueden contener números o simbologías.");
                    }
                    break;
                case "apellido":
                    if (/[\d\W]+/.test(apellido)) {
                        showErrorMessage("Los apellidos no pueden contener números o simbologías.");
                    }
                    if (apellido.trim() === "") {
                        showErrorMessage("Por favor, completa el campo Primer Apellido");
                    }
                    break;
                case "segundoApellido":
                    if (/[\d\W]+/.test(segundoApellido)) {
                        showErrorMessage("Los apellidos no pueden contener números o simbologías.");
                    }
                    break;
                case "tipoDocumento":
                    if (tipoDocumento === "0") {
                        showErrorMessage("Por favor, selecciona el tipo de documento.");
                    }
                    break;
                case "documentoIdentidad":
                    let documentoIdentidad = document.getElementById("userid").value;
                    if (isNaN(documentoIdentidad) || /^\s*$/.test(documentoIdentidad)) {
                        showErrorMessage("El documento de identidad debe ser un número válido.");
                    } else {
                        documentoIdentidad = documentoIdentidad.toString().padStart(10, "0");
                        document.getElementById("userid").value = documentoIdentidad;
                        console.log("Documento de identidad ajustado:", documentoIdentidad);
                    }
                    break;
                case "fechaNacimiento":
                    if (!fechaNacimiento) {
                        showErrorMessage("Por favor, ingresa tu fecha de nacimiento.");
                    } else {
                        const fechaNacimientoDate = new Date(fechaNacimiento);
                        const hoy = new Date();
                        if (fechaNacimientoDate > hoy) {
                            showErrorMessage("La fecha de nacimiento no puede estar en el futuro.");
                            break;
                        }
                        if (isNaN(fechaNacimientoDate.getTime())) {
                            showErrorMessage("La fecha de nacimiento no es válida.");
                            break;
                        }
                        let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
                        if (hoy.getMonth() < fechaNacimientoDate.getMonth() || (hoy.getMonth() === fechaNacimientoDate.getMonth() && hoy.getDate() < fechaNacimientoDate.getDate())) {
                            edad--;
                        }
                        if (edad < 18 || edad > 70) {
                            showErrorMessage("Tu edad no es válida, intenta nuevamente.");
                        }
                    }
                    break;
                case "rol":
                    if (rol === "0") {
                        showErrorMessage("Por favor, selecciona un rol.");
                    }
                    break;
                case "telefono":
                    if (isNaN(telefono)) {
                        showErrorMessage("Por favor, ingrese un número de teléfono válido.");
                    }
                    if (telefono.length != 10) {
                        showErrorMessage("El número de celular debe contener 10 dígitos.");
                    }
                    break;
                case "correo":
                    if (!/^\S+@\S+\.\S+$/.test(correo)) {
                        showErrorMessage("Por favor, ingresa un correo electrónico válido.");
                    } else {
                        const emailExists = await checkEmailExists(correo);
                        if (emailExists) {
                            showErrorMessage("El correo electrónico ya está registrado.");
                        }
                    }
                    break;
                case "contrasena":
                    if (!contrasena.match(validacionPassword)) {
                        showErrorMessage("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.");
                    }
                    break;
                case "confirmarContrasena":
                    if (contrasena !== confirmarContrasena) {
                        showErrorMessage("La contraseña no coincide.");
                    }
                    break;
                case "terminosCheckbox":
                    if (!terminosCheckbox) {
                        showErrorMessage("Debes aceptar los términos y condiciones.");
                    }
                    break;
                default:
                    break;
            }
        }

        if (todasLasValidacionesPasaron) {
            await Swal.fire({
                icon: "success",
                title: "¡Cuenta Creada!",
                text: "Su cuenta ha sido creada exitosamente...",
            });

            // Redirigir a otra vista después de la espera
            window.location.href = "./Login.html";
        }

        return todasLasValidacionesPasaron;
    }

    function getAdjustedDate(dateString) {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1); // Add one day
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }

    function SaveUser() {
        const userName = $("#username").val();
        const userSecName = $("#usersecname").val();
        const userLName = $("#userlname").val();
        const userLSecName = $("#userlsecname").val();
        const docType = $("#doctype").prop("value");
        const userId = $("#userid").val();
        const birthDate = $("#birthdate").val();
        const role = $("#role").prop("value");
        const phoneNum = $("#phonenum").val();
        const address = $("#address").val();
        const email = $("#email").val();
        const password = $("#password").val();
        const imgProfile = $("#user_icon").attr("src");
        const accountState = 1;
        const creationDate = new Date().toISOString(); // Usa formato ISO

        const formattedBirthDate = getAdjustedDate(birthDate); // Use the defined function
        console.log(formattedBirthDate);


        const newUser = {
            firstName: userName,
            secondName: userSecName,
            lastName: userLName,
            lastName2: userLSecName,
            docType: docType,
            docNum: userId,
            birthDate: formattedBirthDate,
            role: role,
            phoneNum: phoneNum,
            address: address,
            email: email,
            password: password,
            imgProfile: imgProfile,
            accountState: accountState,
            creationDate: creationDate,
        };

        const userInfo = {
            profileDescription: "editar",
            university: "editar",
            career: "editar",
            careerStartDate: "",
            careerEndDate: "",
            charge: "editar",
            company: "editar",
            chargeStartDate: "",
            chargeEndDate: "",
            chargeDescription: "editar",
        }

        function Show() {
            console.log(JSON.stringify(newUser));
        }

        Show();

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/emprendev/v1/user",
            contentType: "application/json",
            data: JSON.stringify(newUser),
            xhrFields: {
                withCredentials: true,
            },
            success: function (response) {
                console.log("Usuario registrado");
            },
            error: function (xhr, status, error) {
                console.error("Error al agregar usuario:", error);
            },
        });

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/devs",
            contentType: "application/json",
            data: JSON.stringify(userInfo),
            xhrFields: {
                withCredentials: true,
            },
            success: function (response) {
                console.log("Datos registrados");
            },
            error: function (xhr, status, error) {
                console.error("Error al agregar datos:", error);
            },
        });

        window.location.href = "Login.html";
    }
});