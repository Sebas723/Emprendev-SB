const userSubMenu = document.getElementById("user-sub-menu");

function validarFormulario() {
    const nombre = document.querySelector('[name="nombre"]').value;
    const segundoNombre = document.querySelector('[name="segundo_nombre"]').value;
    const apellido = document.querySelector('[name="apellido"]').value;
    const segundoApellido = document.querySelector('[name="segundo_apellido"]').value;
    const documentoIdentidad = document.querySelector('[name="id_usuario"]').value;
    const fechaNacimiento = document.querySelector('[name="fecha_nac"]').value;
    const telefono = document.querySelector('[name="telefono"]').value;
    const correo = document.querySelector('[name="correo"]').value;

    const validaciones = [
        'nombre',
        'segundo_nombre',
        'apellido',
        'segundo_apellido',
        'documentoIdentidad',
        'fechaNacimiento',
        'edad',
        'telefono',
        'correo',
    ];

    for (let validacion of validaciones) {
        switch (validacion) {
            case 'correo':
                if (!/^\S+@\S+\.\S+$/.test(correo)) {
                    alert('Por favor, ingresa un correo electrónico válido.');
                    return false;
                }
                break;
            case 'telefono':
                if (telefono.trim() === '') {
                    alert("Por favor, ingresa tu número de teléfono.");
                    return false;
                }
                if (isNaN(telefono)) {
                    alert('El número de teléfono no puede contener letras.');
                    return false;
                }
                if (telefono.length != 10) {
                    alert("El número de teléfono debe contener 10 números.");
                    return false;
                }
                break;
            case 'fechaNacimiento':
                if (fechaNacimiento.trim() === '') {
                    alert('Por favor, ingresa tu fecha de nacimiento.');
                    return false;
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
                    alert('Tu edad no es válida, intenta nuevamente');
                    return false;
                }
                break;
            case 'documentoIdentidad':
                if (isNaN(documentoIdentidad) || /^\s*$/.test(documentoIdentidad) || documentoIdentidad.length != 10) {
                    alert('El documento de identidad debe ser un número válido.');
                    return false;
                }
                break;
            case 'segundo_apellido':
                if (/^\d+$/.test(segundoApellido)) {
                    alert("Los apellidos no pueden contener números.");
                    return false;
                }
                break;
            case 'apellido':
                if (apellido.trim() === "") {
                    alert("Por favor, completa el campo Primer Apellido para continuar.");
                    return false;
                }
                if (/^\d+$/.test(apellido)) {
                    alert("Los apellidos no pueden contener números.");
                    return false;
                }
                break;
            case 'segundo_nombre':
                if (/^\d+$/.test(segundoNombre)) {
                    alert("Los nombres no pueden contener números.");
                    return false;
                }
                break;
            case 'nombre':
                if (nombre.trim() === "") {
                    alert("Por favor, completa el campo Primer Nombre para continuar.");
                    return false;
                }
                if (/^\d+$/.test(nombre)) {
                    alert("Los nombres no pueden contener números.");
                    return false;
                }
                break;
            default:
                break;
        }
    }
    return true;
}

$(document).ready(function() {
    function populateForm(data) {
        const formattedDate = formatDate(data.birthDate);
        $('#id').val(data.userId);
        $('#firstName').val(data.firstName);
        $('#lastName').val(data.lastName);
        $('#secondName').val(data.secondName || "");
        $('#lastName2').val(data.lastName2 || "");
        $('#docType').val(data.docType);
        $('#docNum').val(data.docNum);
        $('#birthDate').val(formattedDate);
        $('#role').val(data.role);
        $('#phoneNum').val(data.phoneNum);
        $('#address').val(data.address || "");
        $('#email').val(data.Email);
        $('#password').val(data.password);
        $('#imgProfile').val(data.imgProfile);
        $('#accountState').val(data.accountState);
        $('#creationDate').val(data.creationDate);
    }
    
    function loadUserData() {
        $.ajax({
            url: 'http://localhost:8080/emprendev/v1/user/sessionStatus',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                if (data.sessionActive) {
                    console.log('Session is active:', data);
                    populateForm(data);
                } else {
                    console.log('No active session:', data.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error checking session status:', textStatus, errorThrown);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo verificar el estado de la sesión.',
                });
            }
        });
    }

    
// Función para formatear la fecha
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString;
    }

    // Llama a la función para cargar los datos del usuario cuando el documento esté listo
    loadUserData();
});

//Guardar los datos editados
const form = document.getElementById('form-dev');
const id = $("#id").val();

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

    // Recolecta los datos del formulario

    const formData = {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        secondName: $("#secondName").val(),
        lastName2: $("#lastName2").val(),
        docType: $("#docType").val(),
        docNum: $("#docNum").val(),
        birthDate: $("#birthDate").val(),
        role: $("#role").val(),
        phoneNum: $("#phoneNum").val(),
        address: $('#address').val(),
        Email: $('#email').val(),
    }

    const formData2 = {
        profileDescription: $("#profileDescription").val(),
        university: $("#university").val(),
        career: $("#career").val(),
        careerStartDate: $("#careerStartDate").val(),
        careerEndDate: $("#careerEndDate").val(),
        charge: $("#charge").val(),
        company: $("#company").val(),
        chargeStartDate: $("#chargeStartDate").val(),
        chargeEndDate: $("#chargeEndDate").val(),
        chargeDescription: $('#chargeDescription').val(),
    }

    try {
        // Envía los datos al servidor usando fetch con método PUT
        const userUpdate = await fetch(`http://localhost:8080/emprendev/v1/user/${id}` , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });

        if (!userUpdate.ok) {
            throw new Error(`HTTP error! status: ${userUpdate.status}`);
        }

        const result = await userUpdate.json();

        // Maneja la respuesta del servidor
        console.log('Success:', result);
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Los datos se han actualizado correctamente.',
        });

        const dataUpdate = await fetch(`http://localhost:8080/api//devs/${id}` , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData2)
        });

        if (!dataUpdate.ok) {
            throw new Error(`HTTP error! status: ${dataUpdate.status}`);
        }

        const results = await dataUpdate.json();

        // Maneja la respuesta del servidor
        console.log('Success:', results);
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Los datos se han actualizado correctamente.',
        });

        // Opcional: redirige o limpia el formulario
        window.location.href = 'perfil_dev.html'; // Redirige si es necesario

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar los datos.',
        });
    }
});


//Submenu del perfil del usuario (imagen arriba a la izquierda)

userSubMenu.style.display = "none";

SubmenuPerfilBtn_isShowing = false;
function OpenPerfilSubMenu(){
    if (!SubmenuPerfilBtn_isShowing){
        userSubMenu.style.display="block";
    }
    else{
        userSubMenu.style.display="none";
    }
    SubmenuPerfilBtn_isShowing = !SubmenuPerfilBtn_isShowing;
};


//drag n drop tags

let tags = document.getElementsByClassName("tag");
let tagsContainer = document.getElementById("tags-container");
let dropAreaTags = document.getElementById("drop-area-tags");
let cardTagsPreview = document.getElementById("card-tags-preview");

for (tag of tags){
    tag.addEventListener("dragstart", function(e){
        let selected = e.target;

        tagsContainer.addEventListener("dragover", function(e){
            e.preventDefault();
        })
        tagsContainer.addEventListener("drop", function(e){
            tagsContainer.appendChild(selected);
            UpdateCard();
            selected = null;
        })

        dropAreaTags.addEventListener("dragover", function(e){
            e.preventDefault();
            dropAreaTags.classList.add("active")
        })
        dropAreaTags.addEventListener("drop", function(e){
            dropAreaTags.appendChild(selected);
            UpdateCard();
            selected = null;
        })
    })
}

function UpdateCard(){
    let html = `<div id="drop-area-tags" class="card-area-tags">${dropAreaTags.innerHTML}</div>`;
    cardTagsPreview.innerHTML = html;
}

