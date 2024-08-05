document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('offer_form');

    form.addEventListener('submit', function (event) {
        if (!validarFormulario()) {
            event.preventDefault(); // Detiene el envío del formulario si no es válido
        } else {
            SaveOffer();
        }
    });
    CardPreviewDesc();
    CardPreviewPago();
    CardPreviewTitle();
});

function validarFormulario() {
    const pago = document.querySelector('[name="pago"]').value;
    const cupos = document.querySelector('[name="cupos"]').value;
    const tituloOferta = document.querySelector('[name="titulo_oferta"]').value;

    if (tituloOferta.trim() === '') {
        alert('Por favor, completa el campo título');
        return false;
    }

    if (pago.trim() === '') {
        alert('Por favor, completa el campo pago.');
        return false;
    }
    if (pago <= 0) {
        alert('El pago por la oferta no puede ser menor o igual a 0');
        return false;
    }
    if (isNaN(pago)) {
        alert('El pago por las ofertas no puede contener letras');
        return false;
    }

    if (cupos.trim() === '') {
        alert('Por favor, ingresa el número de cupos');
        return false;
    }
    if (isNaN(cupos)) {
        alert('El número de cupos no puede contener letras');
        return false;
    }
    if (cupos <= 0) {
        alert('El número de cupos no puede ser menor o igual a 0');
        return false;
    }

    return true;
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

const dropAreas = document.querySelectorAll('.drop-area');

dropAreas.forEach((dropArea, index) => {
    const button = dropArea.querySelector('.subir-foto');
    const input = dropArea.querySelector('input[type="file"]');

    button.addEventListener("click", (e) => {
        input.click();
    });

    input.addEventListener("change", (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            ShowFile(file, dropArea);
            dropArea.classList.remove("active");
        }
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
        const file = e.dataTransfer.files[0];
        if (file) {
            ShowFile(file, dropArea);
            dropArea.classList.remove("active");
        }
    });
});

function ShowFile(file, container) {
    const docType = file.type;
    const validExtensions = ['image/jpg', 'image/png', 'image/jpeg'];

    if (validExtensions.includes(docType)) {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", (e) => {
            const fileUrl = fileReader.result;

            // Mostrar la imagen en el contenedor original
            container.innerHTML = ''; // Limpiar el contenido del contenedor
            const photoContainer = document.createElement("div");
            photoContainer.className = "photo-preview";
            const photo = document.createElement("img");
            photo.src = fileUrl;
            photo.alt = file.name;
            photoContainer.appendChild(photo);
            container.appendChild(photoContainer);
            photoContainer.style.display = 'block';

            // Copiar la imagen al contenedor de vista previa
            const previewPhoto = document.getElementById("image-preview-container");
            previewPhoto.src = photo.src;
            previewPhoto.alt = file.name;
            previewPhoto.className = "card-img";
        });

        fileReader.readAsDataURL(file);
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

// Función para manejar el click del botón de envío
document.getElementById('submit_offer').addEventListener('click', function() {
    // Obtener los datos del formulario
    const titleInput = document.getElementById('card_title_input')?.value;
    const descriptionInput = document.getElementById('card_desc_input')?.value;
    const paymentInput = document.getElementById('card_pago_input')?.value;
    const fieldsInput = document.getElementById('offer_fields')?.value;
    var imageUrl1 = document.getElementById('photo_input_1')?.files[0];
    var imageUrl2 = document.getElementById('photo_input_2')?.files[0];
    var imageUrl3 = document.getElementById('photo_input_3')?.files[0];
    var imageUrl4 = document.getElementById('photo_input_4')?.files[0];

    if (titleInput && descriptionInput && paymentInput && fieldsInput) {
        const offerData = {
            title: titleInput,
            description: descriptionInput,
            payment: paymentInput,
            fields: fieldsInput,
            imageUrl1: imageUrl1,
            imageUrl2: imageUrl2,
            imageUrl3: imageUrl3,
            imageUrl4: imageUrl4,
            // Aquí podrías agregar más campos si es necesario
        };

        // Enviar los datos al backend
        fetch('http://localhost:8080/api/offers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(offerData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Oferta creada:', data);
            alert('Oferta creada con éxito');
            // Aquí puedes redirigir o actualizar la interfaz si es necesario
        })
        .catch(error => {
            console.error('Error al crear la oferta:', error);
            alert('Hubo un error al crear la oferta');
        });
    } else {
        console.error('Uno o más elementos del formulario no se encontraron.');
    }
});
