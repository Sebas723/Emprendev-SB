// Desde aquí empieza el guardado de los cambios de la oferta
$(document).ready(function () {
    // Obtener el ID de la oferta desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const offerId = urlParams.get("id");

    if (offerId) {
        // Llamar a la función para cargar los datos de la oferta
        loadOfferData(offerId);
    } else {
        console.error("No se encontró el ID de la oferta en la URL.");
    }

    function loadOfferData(id) {
        console.log(id);
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/api/offers/${id}`, // Aquí es donde se llama a tu método Spring Boot
            dataType: "json",
            xhrFields: {
                withCredentials: true,
            },
            success: function (data) {
                // Poblar el formulario con los datos de la oferta
                $("#card_title_input").val(data.title);
                $("#card_desc_input").val(data.description);
                $("#card_pago_input").val(data.payment);
                $("#offer_fields").val(data.fields);
                $("#hidden_creation_date").val(data.creationDate);
                $("#hidden_finalization_date").val(data.finalizationDate);
                $("#hidden_offer_state").val(data.offerState);

                // Mostrar la imagen si existe
                var imgSrc = data.image ? `data:image/jpeg;base64,${data.image}` : "";

                if (imgSrc) {
                    $("#photoPreview").attr("src", imgSrc).show();
                } else {
                    $("#photoPreview").hide();
                }

                CardPreviewTitle();
                CardPreviewDesc();
                CardPreviewPago();
                CardPreviewField();
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar datos de la oferta:", error);
            },
        });
    }



    const numberInput = document.getElementById('card_pago_input');

    // Escucha el evento 'input'
    numberInput.addEventListener('input', function() {
        // Reemplaza el signo "-" con una cadena vacía
        this.value = this.value.replace(/-/g, '');
    });

// Desde aquí empieza el guardado de los cambios de la oferta
$(document).on("click", "#edit_offer_form", async function () {

  // Ejecutar las validaciones antes de proceder
  const validacionExitosa = await validateForm();
  if (!validacionExitosa) {
      // Si alguna validación falla, no continuar con la actualización
      return;
  }

  // Verifica si existe un ID de la oferta
  if (!offerId) {
      alert("El ID de la oferta no se ha encontrado. Por favor, intente nuevamente.");
      return;
  }

  // Confirmar si el usuario desea guardar los cambios
  if (confirm("¿Desea guardar los cambios realizados?")) {
      
      // Crear un objeto FormData para enviar la imagen y otros datos
      var formData = new FormData();
      const file = document.getElementById("photoInput").files[0];
      if (file) {
          formData.append("image", file); // Añadir la imagen si existe
      }
      
      // Obtener valores de los campos del formulario
      var title = $("#card_title_input").val();
      var description = $("#card_desc_input").val();
      var payment = $("#card_pago_input").val();
      var fields = $("#offer_fields").val();
      var offerState = $("#hidden_offer_state").val(); // Obtener el estado de la oferta
      var creationDate = $("#hidden_creation_date").val(); // Fecha de creación
      var finalizationDate = $("#hidden_finalization_date").val(); // Fecha de finalización
      
      // Añadir los otros datos al FormData
      formData.append("title", title);
      formData.append("description", description);
      formData.append("payment", payment);
      formData.append("fields", fields);
      formData.append("offerState", offerState);
      formData.append("creationDate", creationDate);
      formData.append("finalizationDate", finalizationDate);

      // Realizar la solicitud AJAX con PUT
      $.ajax({
          type: "PUT",
          url: `http://localhost:8080/api/offers/${offerId}`, // Usa la variable correcta para el ID
          data: formData, // Enviar el FormData que incluye la imagen y otros datos
          processData: false, // Evitar que jQuery procese los datos (ya que es FormData)
          contentType: false, // Evitar que jQuery establezca el tipo de contenido
          success: function (response) {
              Swal.fire({
                  icon: "success",
                  title: "¡Oferta Actualizada!",
                  text: "Los cambios se han guardado exitosamente...",
                }).then(() => {
                  // Redirigir a otra vista
                  window.location.href = "catalogo.html"; // Cambia la URL a la ruta deseada
                });
          },
          error: function (xhr, status, error) {
              console.error("Error al actualizar la oferta:", error);
              alert("Hubo un error al guardar los cambios. Por favor, inténtelo nuevamente.");
          },
      });
  } else {
      window.location.href = "#";
  }
});
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
      'cuposOferta',
      'pagoOferta',
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
          case 'pagoOferta':
              if (pagoOferta.trim() === '') {
                  showErrorMessage("Por favor, completa el campo Pago");
              }
              if (isNaN(pagoOferta)) {
                  showErrorMessage("El pago por la oferta solo puede contener números");
              }
              if (parseFloat(pagoOferta) < 100000) {
                  showErrorMessage("El pago por la oferta no puede ser menor a 100.000");
              }
              break;
          case 'cuposOferta':
              if (cuposOferta.trim() === '') {
                  showErrorMessage("Por favor, completa el campo Cupos");
              }
              if (isNaN(cuposOferta)) {
                  showErrorMessage("Los cupos de la oferta solo pueden contener números");
              }
              if (parseInt(cuposOferta) <= 0) {
                  showErrorMessage("La oferta debe contener al menos un cupo");
              }
              break;
          default:
              break;
      }
  }

  return todasLasValidacionesPasaron;
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
function OpenPerfilSubMenu() {
  if (!SubmenuPerfilBtn_isShowing) {
    userSubMenu.style.display = "block";
  } else {
    userSubMenu.style.display = "none";
  }
  SubmenuPerfilBtn_isShowing = !SubmenuPerfilBtn_isShowing;
}

//fotos oferta
const form = document.getElementById("form");
const photoInput = document.getElementById("photoInput");
const photoContainer = document.getElementById("photoContainer");
const photoPreview = document.getElementById("photoPreview");
const imagePreviewContainer = document.getElementById(
  "image-preview-container"
);

// Vista previa de la imagen subida
photoInput.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      photoPreview.src = e.target.result;
      photoPreview.style.display = "block";
      // Actualiza la vista previa de la imagen en la tarjeta
      imagePreviewContainer.src = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    photoPreview.src = "";
    photoPreview.style.display = "none";
    // Borra la imagen en la tarjeta de vista previa
    imagePreviewContainer.src = "svg/ImageIcon.svg";
  }
});

//update de oferta en tiempo real
function CardPreviewTitle() {
  let cardTileInput = document.getElementById("card_title_input").value;
  let cardTitle = document.getElementById("card_title");

  if (cardTileInput.length === 0) {
    cardTitle.textContent = "Título de Oferta";
  } else {
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
  } else {
    cardPago.innerHTML = `<span>$</span>` + formatearNumero(cardPagoInput);
  }
}

function CardPreviewField() {
  let cardFieldInput = document.getElementById("offer_fields").value;
  let cardField = document.getElementById("card_fields");

  if (cardFieldInput.length === 0) {
    cardField.textContent = "Cupos 0";
  } else {
    cardField.innerHTML =
      `<span>Cupos </span>` + formatearNumero(cardFieldInput);
  }
}

const file = photoInput.files[0];