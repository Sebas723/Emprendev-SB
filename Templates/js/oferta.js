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
    CardPreviewField();
});

async function validateForm() {
    const tituloOferta = document.querySelector('[name="titulo_oferta"]').value;
    const descripcionOferta = document.querySelector('[name="desc_oferta"]').value;
    const pagoOferta = document.querySelector('[name="pago"]').value;
    const cuposOferta = document.querySelector('[name="cupos"]').value;

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
        'cupos',
        'pago',
        'descripcionOferta',
        'tituloOferta'
    ];

    for (let validacion of validaciones) {
        switch (validacion) {
            case 'tituloOferta':
                if (tituloOferta.trim() === '') {
                    showErrorMessage("Por favor, completa el campo Titulo");
                }
            break;
            case 'descripcionOferta':
                if (descripcionOferta.trim() === '') {
                    showErrorMessage("Por favor, completa el campo Descripcion");
                }
                if (descripcionOferta.length < 200) {
                    showErrorMessage("La descripcion de la oferta debe contener por lo menos 200 caracteres");
                }
            break;
            case 'pago':
                if (pagoOferta.trim() === '') {
                    showErrorMessage("Por favor, completa el campo Pago");
                }
                if(isNaN(pagoOferta)){
                    showErrorMessage("El pago por la oferta solo puede contener numeros");
                }
                if(pagoOferta < 100000){
                    showErrorMessage("El pago por la oferta no puede ser menor a 100.000");
                }
            break;
            case 'cupos':
                if (cuposOferta.trim() === '') {
                    showErrorMessage("Por favor, completa el campo Cupos");
                }
                if(isNaN(cuposOferta)){
                    showErrorMessage("Los cupos de la oferta solo pueden contener numeros");
                }
                if(cuposOferta <= 0){
                    showErrorMessage("La oferta debe contener almenos un cupo");
                }
            break;
            default:
            break;
        }
    }
    if (todasLasValidacionesPasaron) {
        Swal.fire({
          icon: "success",
          title: "¡Oferta Creada!",
          text: "La oferta ha sido creada exitosamente...",
        }).then(() => {
          // Redirigir a otra vista
          window.location.href = "/catalogo.html"; // Cambia la URL a la ruta deseada
        });
      }
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

/*dropAreas.forEach((dropArea, index) => {
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
});*/

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

// Función para manejar el click del botón de envío
document.getElementById("submit_offer").addEventListener("click", function () {
    // Validate the form
    if (validarFormulario()) {
        // Create a new FormData object
        let formData = new FormData();

        // Append form fields to the FormData object
        formData.append("title", document.getElementById("card_title_input").value);
        formData.append("description", document.getElementById("card_desc_input").value);
        formData.append("payment", document.getElementById("card_pago_input").value);
        formData.append("fields", document.getElementById("offer_fields").value);

        // Append image files to the FormData object
        for (let i = 1; i <= 4; i++) {
            let photoInput = document.getElementById(`photo_input_${i}`);
            if (photoInput.files.length > 0) {
                formData.append(`imageUrl${i}`, photoInput.files[0]);
            }
        }

        // Send the form data using fetch
        fetch('http://localhost:8080/api/offers', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Oferta creada con éxito!');
                // Optionally, reset the form here
            } else {
                alert('Error al crear la oferta.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al enviar la oferta.');
        });
    } else {
        alert("Por favor, complete todos los campos obligatorios.");
    }
});

function validarFormulario() {
    // Aquí va la lógica de validación del formulario
    // Retornar true si el formulario es válido, o false si no lo es
    return true;
}
