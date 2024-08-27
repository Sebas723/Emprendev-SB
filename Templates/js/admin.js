$(document).ready(function () {

    function cargarUsuarios() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/emprendev/v1/user/listOrderAccount",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                $("#tabla > tbody").empty();
                data.forEach(item => {
                    const fullName = `${item.firstName} ${item.secondName}`;
                    const fullLastName = `${item.lastName} ${item.lastName2}`;
                    const accountStateText = item.accountState === 1 ? "Activo" : "Desactivado";
                    const stateClass = item.accountState === 1 ? '' : 'class="deactivated_user"';

                    const row = `
                        <tr ${stateClass}>
                            <td>${item.docNum}</td>
                            <td>${item.role}</td>
                            <td>${fullName}</td>
                            <td>${fullLastName}</td>
                            <td>${item.birthDate}</td>
                            <td>${item.phoneNum}</td>
                            <td>${item.address}</td>
                            <td>${item.email}</td>
                            <td>${accountStateText}</td>
                            <td>${item.creationDate}</td>
                            <td>
                                <img id='user_icon' class='user_img' src='${item.imgProfile}' alt='Imagen de perfil' width='40' height='40'>
                            </td>
                            <td>
                                <button class='btn btn-primary btn-sm editarUser' data-id='${item.id}'>Editar</button>
                                <button class='btn btn-${item.accountState === 1 ? 'danger' : 'success'} btn-sm ${item.accountState === 1 ? 'desactivarUser' : 'reactivarUser'}' data-id='${item.id}'>
                                    ${item.accountState === 1 ? 'Desactivar' : 'Reactivar'}
                                </button>
                            </td>
                        </tr>
                    `;
                    $("#tabla > tbody").append(row);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar Usuarios:", error);
            }
        });
    }

    cargarUsuarios();

    // Eventos delegados para editar, desactivar y reactivar
    $(document).on('click', '.editarUser', function () {
        const id = $(this).data('id');
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/emprendev/v1/user/${id}`,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                $("#edit-id").val(data.id);
                $("#edit_first_name").val(data.firstName);
                $("#edit_sec_name").val(data.secondName);
                $("#edit_last_name").val(data.lastName);
                $("#edit_last_name2").val(data.lastName2);
                $("#edit_birth_date").val(data.birthDate);
                $("#edit_phone_number").val(data.phoneNum);
                $("#edit_address").val(data.address);
                $("#edit_email").val(data.email);
                $("#edit-form").show();
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar datos de Usuario:", error);
            }
        });
    });

    $(document).on('click', '#user-save-edit-btn', function () {
        if (confirm("¿Desea Guardar Los cambios Realizados?")) {
            const id = $("#edit-id").val();
            const data = {
                firstName: $("#edit_first_name").val(),
                secondName: $("#edit_sec_name").val(),
                lastName: $("#edit_last_name").val(),
                lastName2: $("#edit_last_name2").val(),
                birthDate: $("#edit_birth_date").val(),
                phoneNum: $("#edit_phone_number").val(),
                address: $("#edit_address").val(),
                email: $("#edit_email").val(),
            };

            $.ajax({
                type: "PUT",
                url: `http://localhost:8080/emprendev/v1/user/${id}`,
                contentType: "application/json",
                data: JSON.stringify(data),
                xhrFields: {
                    withCredentials: true
                },
                success: function () {
                    $("#edit-form").hide();
                    cargarUsuarios();
                },
                error: function (xhr, status, error) {
                    console.error("Error al actualizar Usuario:", error);
                }
            });
        } else {
            $("#edit-form").hide();
        }
    });

    $(document).on('click', '.desactivarUser, .reactivarUser', function () {
        const id = $(this).data('id');
        const isDeactivating = $(this).hasClass('desactivar');
        const accountState = isDeactivating ? 0 : 1;

        if (confirm(`¿Desea ${isDeactivating ? 'desactivar' : 'reactivar'} este usuario?`)) {
            $.ajax({
                type: "PUT",
                url: `http://localhost:8080/emprendev/v1/user/${id}`,
                contentType: "application/json",
                data: JSON.stringify({ accountState }),
                xhrFields: {
                    withCredentials: true
                },
                success: function () {
                    cargarUsuarios();
                },
                error: function (xhr, status, error) {
                    console.error(`Error al ${isDeactivating ? 'desactivar' : 'reactivar'} Usuario:`, error);
                }
            });
        }
    });


    //Desde aqui empiezan las llamada de la oferta en la tabla para el administrador
    //Desde aqui empiezan las llamada de la oferta en la tabla para el administrador
    //Desde aqui empiezan las llamada de la oferta en la tabla para el administrador
    function cargarOfertas() {
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/api/offers/listOrderAccount`,
            xhrFields: {
                withCredentials: true
            },
            success: function (offer) {
                $("#tablaOferta > tbody").empty();
                $.each(offer, function (i, data) {

                    // Convertir el BLOB en una URL para la imagen
                    var imgSrc = data.image ? 'data:image/jpeg;base64,' + data.image : '';

                    if (imgSrc) {
                        $("#edit_offer_image").attr("src", imgSrc).show();
                    } else {
                        $("#edit_offer_image").hide();
                    }

                    // Limitar la descripción a 50 caracteres, comprobando que no sea null o undefined
                    var limitedDescription = data.description ?
                        (data.description.length > 50 ? data.description.substring(0, 50) + '...' : data.description) : '';

                    // Verificar el estado de la oferta y construir la fila correspondiente
                    var row = `<tr>
                        <td><img src="${imgSrc}" alt="imagen-oferta" width="50px" height="30px"></td>
                        <td>${data.title}</td>
                        <td>${limitedDescription}</td>
                        <td>${data.payment}</td>
                        <td>${data.fields}</td>
                        <td>${data.creationDate}</td>
                        <td>${data.offerState}</td>
                        <td>`;

                    if (data.offerState == 1) {
                        row += `<button class='btn btn-primary btn-sm editarOffer' data-offer-id='${data.id}'>Editar</button>
                                <button class='btn btn-danger btn-sm desactivarOffer' data-offer-id='${data.id}'>Desactivar</button>`;
                    } else {
                        row += `<button class='btn btn-success btn-sm reactivarOffer' data-id='${data.id}'>Reactivar</button>`;
                    }

                    row += `</td></tr>`;

                    $("#tablaOferta > tbody").append(row);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar Ofertas:", error);
            }
        });
    }

    cargarOfertas();

    // Mostrar el formulario de edición con los datos de la oferta
    $(document).on('click', '.editarOffer', function () {
        var id = $(this).data('offer-id');

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/offers/" + id,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                $("#edit-offer-id").val(data.id);
                $("#edit_offer_tittle").val(data.title);
                $("#edit_offer_desc").val(data.description);
                $("#edit_offer_payment").val(data.payment);
                $("#edit_offer_fields").val(data.fields);
                $("#edit_offer_state").val(data.offerState);

                // Almacenar las fechas existentes en los campos ocultos
                $("#hidden_creation_date").val(data.creationDate);
                $("#hidden_finalization_date").val(data.finalizationDate);

                var imgSrc = data.image ? 'data:image/jpeg;base64,' + data.image : '';

                if (imgSrc) {
                    $("#edit_offer_image").attr("src", imgSrc).show();
                } else {
                    $("#edit_offer_image").hide();
                }

                $("#edit-offer-form").show();
                $("#deactivate-offer-form").hide();
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar datos de la Oferta:", error);
            }
        });
    });

    // Manejar la previsualización de la nueva imagen seleccionada
    $(document).on('change', '#edit_offer_image_input', function () {
        var file = this.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                // Mostrar la imagen seleccionada en el formulario
                $("#edit_offer_image").attr("src", e.target.result).show();
            };
            reader.readAsDataURL(file);
        }
    });

    // Funcionalidad de guardado para los cambios de la oferta
    $(document).on('click', '#offer-save-edit-btn', function () {
        if (confirm("¿Desea Guardar Los cambios Realizados?") == true) {
            var id = $("#edit-offer-id").val();
            var title = $("#edit_offer_tittle").val();
            var description = $("#edit_offer_desc").val();
            var payment = $("#edit_offer_payment").val();
            var fields = $("#edit_offer_fields").val();
            var offerState = $("#edit_offer_state").val();

            // Usar las fechas almacenadas en los campos ocultos
            var creationDate = $("#hidden_creation_date").val();
            var finalizationDate = $("#hidden_finalization_date").val();

            var data = {
                title: title,
                description: description,
                payment: payment,
                fields: fields,
                offerState: offerState,
                creationDate: creationDate,
                finalizationDate: finalizationDate
            };

            $.ajax({
                type: "PUT",
                url: "http://localhost:8080/api/offers/" + id,
                contentType: "application/json",
                data: JSON.stringify(data),
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {
                    $("#edit-offer-form").hide();
                    cargarOfertas(); // Recargar la lista de ofertas
                },
                error: function (xhr, status, error) {
                    console.error("Error al actualizar la oferta:", error);
                }
            });
        } else {
            $("#edit-offer-form").hide();
        }
    });

    // Mostrar formulario de desactivación de la oferta
    $(document).on('click', '.desactivarOffer', function () {
        var id = $(this).data('offer-id');

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/offers/" + id,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                $("#edit-offer-id").val(data.id);
                $("#deactivate-offer-form").show(); // Mostrar el formulario de desactivación de oferta
                $("#edit-offer-form").hide();
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar datos de Oferta:", error);
            }
        });
    });

    // Actualizar estado de la oferta para la desactivación
    $(document).on('click', '#deactivate-offer-btn', function () {
        if (confirm("¿Desea desactivar este registro?") == true) {
            var id = $("#edit-offer-id").val();

            // Obtener los datos actuales de la oferta
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/offers/" + id,
                contentType: "application/json",
                success: function (offer) {
                    // Cambiar solo el estado de la oferta
                    offer.offerState = 0;

                    // Enviar la oferta completa con el estado actualizado
                    $.ajax({
                        type: "PUT",
                        url: "http://localhost:8080/api/offers/" + id,
                        contentType: "application/json",
                        data: JSON.stringify(offer),
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function (response) {
                            $("#deactivate-offer-form").hide();
                            cargarOfertas(); // Actualizar la lista de ofertas
                        },
                        error: function (xhr, status, error) {
                            console.error("Error al actualizar la oferta:", error);
                        }
                    });
                },
                error: function (xhr, status, error) {
                    console.error("Error al obtener la oferta:", error);
                }
            });
        } else {
            $("#deactivate-offer-form").hide();
        }
    });

    // Manejar la reactivación de una oferta
    $(document).on('click', '.reactivarOffer', function () {
        if (confirm("¿Desea reactivar esta Oferta?") == true) {
            var id = $(this).data('id');
            
            // Realiza la petición GET para obtener la oferta antes de hacer cambios
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/offers/" + id,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function (offer) {
                    // Solo cambiar el estado de la oferta
                    offer.offerState = 1;
    
                    // Actualizar la oferta en el backend
                    $.ajax({
                        type: "PUT",
                        url: "http://localhost:8080/api/offers/" + id,
                        contentType: "application/json",
                        data: JSON.stringify(offer),
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function () {
                            cargarOfertas(); // Recargar la lista de ofertas
                        },
                        error: function (xhr, status, error) {
                            console.error("Error al actualizar la Oferta:", error);
                        }
                    });
                },
                error: function (xhr, status, error) {
                    console.error("Error al obtener la oferta:", error);
                }
            });
        }
    });

});

//admin search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const table = document.getElementById('tabla');
    const tbody = table.querySelector('tbody');
  
    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();
      const rows = tbody.querySelectorAll('tr');
  
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
  
        if (rowText.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const table = document.getElementById('tablaOferta');
    const tbody = table.querySelector('tbody');
  
    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();
      const rows = tbody.querySelectorAll('tr');
  
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
  
        if (rowText.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

//functionalities

const user_tbl_btn = document.getElementById("user-table-btn");
const dev_tbl_btn = document.getElementById("dev-table-btn");
const mipyme_tbl_btn = document.getElementById("mipyme-table-btn");
const UserTable = document.getElementById("UserTable");
const devTable = document.getElementById("DevTable");
const userdroplist = document.getElementById("userdroplist");

const user_sub_menu = document.getElementById("user-sub-menu");
const adminButtons = document.getElementById("adminbuttons");

const region_tbl_btn = document.getElementById("region-tbl-btn");
const offertable = document.getElementById("offerTable");
const offerbtn = document.getElementById("offerbtn");
const offerdroplist = document.getElementById("offer-drop-list");

var TituloTabla = document.getElementById("TituloTabla");


user_sub_menu.classList.add("hidden");
user_btn_IsShowing = false;
function OpenUserSubMenu() {
    if (!user_btn_IsShowing) {
        dev_tbl_btn.style.display = "block";
        mipyme_tbl_btn.style.display = "block";
        userdroplist.style.backgroundColor = "gray";
    }
    else {
        dev_tbl_btn.style.display = "none";
        mipyme_tbl_btn.style.display = "none";
        userdroplist.style.backgroundColor = "#f5f5f5";
    }
    user_btn_IsShowing = !user_btn_IsShowing;
}

function UserTableSelected() {
    AddAnimation();
    TituloTabla.textContent = "Tabla Usuarios";
    user_tbl_btn.style.backgroundColor = "gray";
    user_tbl_btn.style.color = "white";

    dev_tbl_btn.style.backgroundColor = "#f5f5f5";
    dev_tbl_btn.style.color = "black";

    mipyme_tbl_btn.style.backgroundColor = "#f5f5f5";
    mipyme_tbl_btn.style.color = "black";

    offerbtn.style.backgroundColor = "#f5f5f5";
    offerbtn.style.color = "black"

    offertable.style.display = "none";
    UserTable.style.display = "block";
    adminButtons.style.display = "block";

    $("#deactivate-offer-form").hide();
    $("#edit-offer-form").hide();
    $("#edit-form").hide();
}

function DevTableSelected() {
    AddAnimation();
    TituloTabla.textContent = "Tabla Desarrolladores";
    dev_tbl_btn.style.backgroundColor = "gray";
    dev_tbl_btn.style.color = "white";

    user_tbl_btn.style.backgroundColor = "#f5f5f5";
    user_tbl_btn.style.color = "black";

    mipyme_tbl_btn.style.backgroundColor = "#f5f5f5";
    mipyme_tbl_btn.style.color = "black";

    offerbtn.style.backgroundColor = "#f5f5f5";
    offerbtn.style.color = "black"

    offertable.style.display = "none";
    UserTable.style.display = "block";
    adminButtons.style.display = "block";

    $("#deactivate-offer-form").hide();
    $("#edit-offer-form").hide();
    $("#edit-form").hide();
}

function MipymeTableSelected() {
    AddAnimation();
    TituloTabla.textContent = "Tabla Mipymes";
    mipyme_tbl_btn.style.backgroundColor = "gray";
    mipyme_tbl_btn.style.color = "white";

    user_tbl_btn.style.backgroundColor = "#f5f5f5";
    user_tbl_btn.style.color = "black";

    dev_tbl_btn.style.backgroundColor = "#f5f5f5";
    dev_tbl_btn.style.color = "black";

    offerbtn.style.backgroundColor = "#f5f5f5";
    offerbtn.style.color = "black"

    offertable.style.display = "none";
    UserTable.style.display = "block";
    adminButtons.style.display = "block";

    $("#deactivate-offer-form").hide();
    $("#edit-offer-form").hide();
    $("#edit-form").hide();
}

//offers

offer_btn_IsShowing = false;
function OfferSubMenu() {
    if (!offer_btn_IsShowing) {
        region_tbl_btn.style.display = "block";
        offerdroplist.style.backgroundColor = "gray";
    }
    else {
        region_tbl_btn.style.display = "none";
        offerdroplist.style.backgroundColor = "#f5f5f5";
    }
    offer_btn_IsShowing = !offer_btn_IsShowing;
}

function OpenOffers() {
    AddAnimation();
    TituloTabla.textContent = "Ofertas";

    offertable.style.display = "flex";
    UserTable.style.display = "none";

    offerbtn.style.backgroundColor = "gray";
    offerbtn.style.color = "white";

    mipyme_tbl_btn.style.backgroundColor = "#f5f5f5";
    mipyme_tbl_btn.style.color = "black";

    user_tbl_btn.style.backgroundColor = "#f5f5f5";
    user_tbl_btn.style.color = "black";

    dev_tbl_btn.style.backgroundColor = "#f5f5f5";
    dev_tbl_btn.style.color = "black";

    $("#deactivate-offer-form").hide();
    $("#edit-offer-form").hide();
    $("#edit-form").hide();
}

function AddAnimation() {
    setInterval(() => {
        TituloTabla.classList.add("fade-in-up-reversed");
    }, 1);
    TituloTabla.classList.remove("fade-in-up-reversed");
}

//logout

user_sub_menu_isShowing = false;
function OpenAdminMenu() {
    if (!user_sub_menu_isShowing) {
        user_sub_menu.style.display = "block";
    }
    else {
        user_sub_menu.style.display = "none";
    }
    user_sub_menu_isShowing = !user_sub_menu_isShowing;
}