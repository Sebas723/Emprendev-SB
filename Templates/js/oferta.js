document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('offer_form');


    form.addEventListener('submit', function (event) {
        SaveOffer();
    });
    /*form.addEventListener('submit', function (event) {
        event.preventDefault(); // Always prevent default to handle submission manually
        validateForm().then(valid => {
            if (valid) {
                SaveUser();
            }
        });
    });

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
    }*/
});

//guardar oferta a la database
function SaveOffer() {
    const title = $('#card_title_input').val();
    const description = $('#card_desc_input').val();
    const payment = $('#card_pago_input').val();
    const fields = $('#offer_fields').val();
    const offerState = 1;
    const creationDate = new Date().toLocaleDateString();
    const finalizationDate = "NF";

    const newOffer = {
        title: title,
        description: description,
        payment: payment,
        fields: fields,
        offerState: offerState,
        creationDate: creationDate,
        finalizationDate: finalizationDate
    };

    function Show() {
        console.log(JSON.stringify(newOffer));
    }

    Show();

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/emprendev/v1/offer",
        contentType: "application/json",
        data: JSON.stringify(newOffer),
        success: function (response) {
            console.log("Oferta Agregada");
        },
        error: function (xhr, status, error) {
            console.error("Error al agregar la oferta:", error);
        }
    });

    window.location.href = 'catalogo_devs.html';
}

const userSubMenu = document.getElementById("user-sub-menu");

//fotos de oferta
const dropArea = document.querySelector(".drop-area");
const button = document.querySelector(".subir-foto");
const input = document.querySelector("#photo-input");
const drop_text = document.querySelector("#drop-text");

//Submenu del perfil del usuario (imagen arriba a la izquierda)

SubmenuPerfilBtn_isShowing = false;
function OpenPerfilSubMenu(){
    if (!SubmenuPerfilBtn_isShowing){
        userSubMenu.style.display="block";
    }
    else{
        userSubMenu.style.display="none";
    }
    SubmenuPerfilBtn_isShowing = !SubmenuPerfilBtn_isShowing;
}

//subir fotos

const maxPhotos = 4;
let uploadedPhotos = 0;   

button.addEventListener("click", (e) => {
    input.click();
});

input.addEventListener("change", (e) => {
    e.preventDefault();
    files = e.target.files;
    ShowFiles(files);
    dropArea.classList.remove("active");
});

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
});

dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    ShowFiles(files);
    dropArea.classList.remove("active");
});

function ShowFiles(files) {
    if (files.length === undefined) {
        ProcessFile(files);
    } else {
        for (const file of files) {
            ProcessFile(file);
        }
    }
}

function ProcessFile(file) {
    const docType = file.type;
    const validExtensions = ['image/jpg', 'image/png', 'image/jpeg'];

    if (validExtensions.includes(docType)) {
        if (uploadedPhotos < maxPhotos) {
            const fileReader = new FileReader();
            const id = `file-${Math.random().toString(32).substring(7)}`;
            uploadedPhotos++;

            fileReader.addEventListener("load", (e) => {
                const fileUrl = fileReader.result;
                const photoContainer = document.createElement("div");
                photoContainer.className = "photo-preview";
                const photo = document.createElement("img");
                photo.id = id;
                photo.src = fileUrl;
                photo.alt = file.name;
                photo.width = 170;
                photoContainer.appendChild(photo);

                const cardImg = document.getElementById("card-img");
                if (uploadedPhotos <= 1){
                    cardImg.src = photo.src;
                    cardImg.width = 600;
                    cardImg.height = 200;
                }

                photoContainer.addEventListener("click", () => {
                    photoContainer.remove();
                    uploadedPhotos--;
                });

                const photoPreviewContainer = document.querySelector("#photo-preview-container");
                photoPreviewContainer.insertBefore(photoContainer, photoPreviewContainer.firstChild);
            });

            fileReader.readAsDataURL(file);
            //uploadFile(file, id);
        } else {
            alert("Se ha alcanzado el límite de fotos (4).");
        }
    } else {
        alert("No es un archivo válido: jpg, jpeg o png");
    }
}

//update de oferta en tiempo real
function CardPreviewTitle() {
    let cardTileInput = document.getElementById("card_title_input").value;
    let cardTitle = document.getElementById("card_title");

    if (cardTileInput.length === 0) {
        cardTitle.textContent = "Título de Oferta";
    }
    else {
        cardTitle.innerHTML = cardTileInput;
    }
}

function CardPreviewDesc() {
    let cardDescInput = document.getElementById("card_desc_input").value;
    let cardDesc = document.getElementById("card_desc"); 
    
    if (cardDescInput.length === 0) {
        cardDesc.textContent = "Descripción de Oferta";
    }
    else {
        cardDesc.innerHTML = cardDescInput;
    }
}

function formatearNumero(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function CardPreviewPago() {
    let cardPagoInput = document.getElementById("card_pago_input").value;
    let cardPago = document.getElementById("card_pago"); 
    
    if (cardPagoInput.length === 0) {
        cardPago.textContent = "$0";
    }
    else {
        cardPago.innerHTML = `<span>$</span>` + formatearNumero(cardPagoInput);
    }
}

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

