document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('offer_form');


    form.addEventListener('submit', function (event) {
        SaveOffer();
    });
});

function validarFormulario(){
    const pago = document.querySelector('[name="pago"]').value;
    const cupos = document.querySelector('[name="cupos"]').value;
    const tituloOferta = document.querySelector('[name="titulo_oferta"]').value;

    const validaciones = [
        'tituloOferta',
        'pago',
        'cupos'
    ];

    for (let validacion of validaciones) {
        switch (validacion) {
            case 'tituloOferta':
                if (tituloOferta.trim() === '') {
                    alert('Por favor, completa el campo titulo');
                    return false;
                }
                break;
            case 'pago':
                if (pago.trim() === '') {
                    alert("Por favor, completa el campo pago.");
                    return false;
                }
                if (pago <= 0) {
                    alert('El pago por la oferta no puede ser menor o igual a 0');
                    return false;
                }
                if(isNaN(pago)){
                    alert("El pago por las ofertas no puede contener letras");
                    return false;
                }
                break;
            case 'cupos':
                if (cupos.trim === '') {
                    alert('Por favor, ingresa el numero de cupos');
                    return false;
                }
                if(isNaN(cupos)){
                    alert("El pago por las ofertas no puede contener letras");
                    return false;
                }
                if (cupos <= 0) {
                    alert('El pago por la oferta no puede ser menor o igual a 0');
                    return false;
                }
                break;
            default:
                break;
        }
    }
    return true;
}

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
            container.innerHTML = ''; // Limpiar el contenido del contenedor
            const photoContainer = document.createElement("div");
            photoContainer.className = "photo-preview";
            const photo = document.createElement("img");
            photo.src = fileUrl;
            photo.alt = file.name;
            photoContainer.appendChild(photo);

            container.appendChild(photoContainer);
            photoContainer.style.display = 'block';

            photoContainer.addEventListener("click", () => {
                container.innerHTML = '';
                container.appendChild(button); // Reinsertar el botón para subir foto
                container.appendChild(input);
            });
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

