document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('offer_form');

    form.addEventListener('submit', async function (event) {
        if (!await validateForm()) {
            event.preventDefault(); // Detiene el envío del formulario si no es válido
        } else {
            SaveOffer(); // O maneja el envío del formulario aquí si la validación es correcta
        }
    });
    CardPreviewDesc();
    CardPreviewPago();
    CardPreviewTitle();
    CardPreviewField();
});

async function validateForm() {
    const tituloOferta = document.querySelector('[name="titulo_oferta"]').value;
    const descripcionOferta = document.querySelector('[name="desc_oferta"]').value;
    const pagoOferta = document.querySelector('[name="pago"]').value;
    const cuposOferta = document.querySelector('[name="cupos"]').value;

    let errorMessages = [];
    let isValid = true;

    function showErrorMessage(message) {
        errorMessages.push(message);
        isValid = false;
    }

    if (tituloOferta.trim() === '') {
        showErrorMessage("Por favor, completa el campo Titulo");
    }
    if (descripcionOferta.trim() === '') {
        showErrorMessage("Por favor, completa el campo Descripcion");
    }
    if (descripcionOferta.length < 200) {
        showErrorMessage("La descripcion de la oferta debe contener por lo menos 200 caracteres");
    }
    if (pagoOferta.trim() === '') {
        showErrorMessage("Por favor, completa el campo Pago");
    }
    if (isNaN(pagoOferta)) {
        showErrorMessage("El pago por la oferta solo puede contener numeros");
    } else {
        if (pagoOferta <= 0) {
            showErrorMessage("El pago por la oferta no puede ser menor o igual a 0");
        }
        if (pagoOferta < 100000) {
            showErrorMessage("El pago por la oferta no puede ser menor a 100.000");
        }
    }
    if (cuposOferta.trim() === '') {
        showErrorMessage("Por favor, completa el campo Cupos");
    }
    if (isNaN(cuposOferta)) {
        showErrorMessage("Los cupos de la oferta solo pueden contener numeros");
    } else {
        if (cuposOferta <= 0) {
            showErrorMessage("La oferta debe contener al menos un cupo");
        }
    }

    if (!isValid) {
        Swal.fire({
            icon: 'error',
            title: 'Errores',
            text: errorMessages.join('\n')
        });
    }

    return isValid;
}

//fotos de oferta
const dropArea = document.querySelector(".drop-area");
const button = document.querySelector(".subir-foto");
const input = document.querySelector("#photo-input");
const drop_text = document.querySelector("#drop-text");

//Submenu del perfil del usuario (imagen arriba a la izquierda)

const userSubMenu = document.getElementById("user-sub-menu");

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


//fotos oferta
const photoInput = document.getElementById("photoInput");
const photoContainer = document.getElementById("photoContainer");
const photoPreview = document.getElementById("photoPreview");
const imagePreviewContainer = document.getElementById("image-preview-container");

// Vista previa de la imagen subida
photoInput.addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            photoPreview.src = e.target.result;
            photoPreview.style.display = 'block';
            // Actualiza la vista previa de la imagen en la tarjeta
            imagePreviewContainer.src = e.target.result;
        };

        reader.readAsDataURL(file);
    } else {
        photoPreview.src = '';
        photoPreview.style.display = 'none';
        // Borra la imagen en la tarjeta de vista previa
        imagePreviewContainer.src = 'svg/ImageIcon.svg';
    }
});

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
    let maxLength = 300;

    if (cardDescInput.length === 0) {
        cardDesc.textContent = "Descripción de Oferta";
    } else {

        if (cardDescInput.length > maxLength) {
            
            let truncated = cardDescInput.substring(0, maxLength);
            let lastSpaceIndex = truncated.lastIndexOf(" ");
            
            if (lastSpaceIndex > -1) {
                truncated = truncated.substring(0, lastSpaceIndex);
            }
            cardDesc.innerHTML = truncated + "...";
        } else {
            cardDesc.innerHTML = cardDescInput;
        }
    }
}

function formatearNumero(numero) {
    // Eliminar el signo "-" si está presente
    numero = numero.toString().replace(/-/g, '');

    // Formatear el número con puntos
    return numero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

const numberInput = document.getElementById('card_pago_input');

// Escucha el evento 'input'
numberInput.addEventListener('input', function() {
    // Reemplaza el signo "-" con una cadena vacía
    this.value = this.value.replace(/-/g, '');
});

function CardPreviewField() {
    let cardFieldInput = document.getElementById("offer_fields").value;
    let cardField = document.getElementById("card_fields");

    if(cardFieldInput.length === 0) {
        cardField.textContent = "Cupos 0"
    }else{
        cardField.innerHTML = `<span>Cupos </span>` + formatearNumero(cardFieldInput);
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

const file = photoInput.files[0];

// Función para manejar el click del botón de envío
document.getElementById("submit_offer").addEventListener("click", function () {
    if (validateForm()) {
        // Crea un nuevo FormData
        let formData = new FormData();

        // Obtén los valores del formulario
        formData.append("title", document.getElementById("card_title_input").value);
        formData.append("userId", localStorage.getItem('userId'));
        formData.append("description", document.getElementById("card_desc_input").value);
        formData.append("payment", document.getElementById("card_pago_input").value);
        formData.append("fields", document.getElementById("offer_fields").value);

        // Obtén el archivo de imagen
        const file = document.getElementById("photoInput").files[0];
        if (file) {
            formData.append("image", file);
        }

        // Enviar datos usando fetch
        fetch('http://localhost:8080/api/offers', {
            method: 'POST',
            body: formData,
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos obligatorios.',
        });
    }
});