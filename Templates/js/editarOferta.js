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
          window.location.href = "catalogo.html"; // Cambia la URL a la ruta deseada
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
const form = document.getElementById("form");
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


const file = photoInput.files[0];



function validarFormulario() {
    // Aquí va la lógica de validación del formulario
    // Retornar true si el formulario es válido, o false si no lo es
    return true;
}