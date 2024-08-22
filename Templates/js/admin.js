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
                $.each(data, function (i, item) {
                    if (item.accountState == 1) {
                        var row =
                            "<tr>" +
                            "<td>" + item.docNum + "</td>" +
                            "<td>" + item.role + "</td>" +
                            "<td>" + item.firstName + " " + item.secondName + "</td>" +
                            "<td>" + item.lastName + " " + item.lastName2 + "</td>" +
                            "<td>" + item.birthDate + "</td>" +
                            "<td>" + item.phoneNum + "</td>" +
                            "<td>" + item.address + "</td>" +
                            "<td>" + item.email + "</td>" +
                            "<td>" + item.accountState + "</td>" +
                            "<td>" + item.creationDate + "</td>" +
                            "<td> <img id='user_icon' class='user_img' src=" + item.imgProfile + " alt='' width='40' height='40'></td>" +
                            "<td> <button class='btn btn-primary btn-sm editar' data-id='" + item.id + "'>Editar</button></td>" +
                            "<td> <button class='btn btn-danger btn-sm desactivar' data-id='" + item.id + "'>Desactivar</button></td>" +
                            "</tr>";
                        $("#tabla > tbody").append(row);
                    }
                    else {
                        var row =
                            "<tr>" +
                            "<td><p class='deactivated_user'>" + item.docNum + "</p></td>" +
                            "<td><p class='deactivated_user'>" + item.role + "</p></td>" +
                            "<td><p class='deactivated_user'>" + item.firstName + " " + item.secondName + "</p></td>" +
                            "<td><p class='deactivated_user'>" + item.lastName + " " + item.lastName2 + "</p></td>" +
                            "<td><p class='deactivated_user'>" + item.birthDate + "</p></td>" +
                            "<td><p class='deactivated_user'>" + item.phoneNum + "</p></td>" +
                            "<td><p class='deactivated_user'>" + item.address + "</p></td>" +
                            "<td><p class='deactivated_user'>" + item.email + "</p></td>" +
                            "<td><p class='deactivated_user'>" + item.accountState + "</p></td>" +
                            "<td><p class='deactivated_user'>" + item.creationDate + "</p></td>" +
                            "<td> <img id='user_icon' class='user_img' src=" + item.imgProfile + " alt='' width='40' height='40'></td>" +
                            "<td> <button class='btn btn-success btn-sm reactivar' data-id='" + item.id + "'>Reactivar</button></td>" +
                            "</tr>";
                        $("#tabla > tbody").append(row);
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar Usuarios:", error);
            }
        });
    }

    cargarUsuarios();

    $(document).on('click', '.cual', function () {
        alert("data");
        prueba();
    });
    $(document).on('click', '.editar', function () {
        var id = $(this).data('id');
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/emprendev/v1/user/" + id,
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

    $(document).on('click', '#save-edit-btn', function () {
        if (confirm("¿Desea Guardar Los cambios Realizados?") == true) {
            var id = $("#edit-id").val();
            var firstName = $("#edit_first_name").val();
            var secondName = $("#edit_sec_name").val();
            var lastName = $("#edit_last_name").val();
            var userLSecName = $("#edit_last_name2").val();
            var birthDate = $("#edit_birth_date").val();
            var phoneNum = $("#edit_phone_number").val();
            var address = $("#edit_address").val();
            var email = $("#edit_email").val();

            var data = {
                firstName: firstName,
                secondName: secondName,
                lastName: lastName,
                lastName2: userLSecName,
                birthDate: birthDate,
                phoneNum: phoneNum,
                address: address,
                email: email,
            };

            $.ajax({
                type: "PUT",
                url: "http://localhost:8080/emprendev/v1/user/" + id,
                contentType: "application/json",
                data: JSON.stringify(data),
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {
                    $("#edit-form").hide();
                    cargarUsuarios();
                },
                error: function (xhr, status, error) {
                    console.error("Error al actualizar Usuario:", error);
                }
            });
        }
        else {
            $("#edit-form").hide();
        }
    });

    $(document).on('click', '.desactivar', function () {
        var id = $(this).data('id');
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/emprendev/v1/user/" + id,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                $("#edit-id").val(data.id);
                $("#deactivate-form").show();
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar datos de Usuario:", error);
            }
        });
    });

    $(document).on('click', '#deactivate-user-btn', function () {
        if (confirm("¿Desea Guardar Los cambios Realizados?") == true) {
            var id = $("#edit-id").val();
            var accountState = 0;

            var data = {
                accountState: accountState,
            };

            $.ajax({
                type: "PUT",
                url: "http://localhost:8080/emprendev/v1/user/" + id,
                contentType: "application/json",
                data: JSON.stringify(data),
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {
                    $("#deactivate-form").hide();
                    cargarUsuarios();
                },
                error: function (xhr, status, error) {
                    console.error("Error al actualizar Usuario:", error);
                }
            });
        }
        else {
            $("#deactivate-form").hide();
        }
    });

    $(document).on('click', '.reactivar', function () {
        if (confirm("¿Desea reactivar este usuario?") == true) {
            var id = $(this).data('id');
            var accountState = 1;

            var data = {
                accountState: accountState,
            };

            $.ajax({
                type: "PUT",
                url: "http://localhost:8080/emprendev/v1/user/" + id,
                contentType: "application/json",
                data: JSON.stringify(data),
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {
                    cargarUsuarios();
                },
                error: function (xhr, status, error) {
                    console.error("Error al actualizar Usuario:", error);
                }
            });
        }
    });



    //Desde aqui empiezan las pruebas para la llamada de la oferta en la tabla

    function cargarOfertas(offerId) {
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/api/offers/${offerId}`,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                $("#tablaOferta > tbody").empty();
                
                // Convertir la imagen de bytes a una URL para mostrarla
                var imageUrl = data.image ? `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(data.image)))}` : 'default_image.png';
                
                // Limitar la descripción a 50 caracteres
                var limitedDescription = data.description.length > 50 ? data.description.substring(0, 50) + '...' : data.description;
    
                var row =
                    `<tr>
                        <td>${data.imageUrl}</td>
                        <td>${data.title}</td>
                        <td>${limitedDescription}</td>
                        <td>${data.payment}</td>
                        <td>${data.fields}</td>
                        <td>${data.creationDate}</td>
                        <td>${data.offerState}</td>
                        <td> 
                            <button class='btn btn-primary btn-sm editar' data-offer-id='${data.id}'>Editar</button>
                        </td>
                        <td> 
                            <button class='btn btn-danger btn-sm desactivar' data-offer-id='${data.id}'>Desactivar</button>
                        </td>
                    </tr>`;
                
                $("#tablaOferta > tbody").append(row);
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar Ofertas:", error);
            }
        });
    }
    
    // Llama a la función con un ID específico de oferta
    cargarOfertas(1);

// Mostrar el formulario de edición con los datos de la oferta
$(document).on('click', '.editar', function () {
    var id = $(this).data('offer-id'); // Usa 'data-offer-id'
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
            $("#edit_offer_price").val(data.payment);
            $("#edit_offer_fields").val(data.fields);
            $("#edit_offer_creation_date").val(data.creationDate);
            $("#edit_offer_finalization_date").val(data.finalizationDate);
            $("#edit_offer_state").val(data.offerState);
            $("#edit-offer-form").show();
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar datos de la Oferta:", error);
        }
    });
});

// Desactivar la oferta
$(document).on('click', '.desactivar', function () {
    var id = $(this).data('offer-id'); // Usa 'data-offer-id'
    $("#edit-offer-id").val(id);
    $("#deactivate-offer-form").show();
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
function OpenUserSubMenu(){
    if (!user_btn_IsShowing){
        dev_tbl_btn.style.display="block";
        mipyme_tbl_btn.style.display="block";
        userdroplist.style.backgroundColor="gray";
    }
    else{
        dev_tbl_btn.style.display="none";
        mipyme_tbl_btn.style.display="none";
        userdroplist.style.backgroundColor="#f5f5f5";  
    }
    user_btn_IsShowing = !user_btn_IsShowing;
}

function UserTableSelected(){
    AddAnimation();
    TituloTabla.textContent="Tabla Usuarios";
    user_tbl_btn.style.backgroundColor="gray";
    user_tbl_btn.style.color="white";

    dev_tbl_btn.style.backgroundColor="#f5f5f5";
    dev_tbl_btn.style.color="black";

    mipyme_tbl_btn.style.backgroundColor="#f5f5f5";
    mipyme_tbl_btn.style.color="black";

    offerbtn.style.backgroundColor="#f5f5f5";
    offerbtn.style.color="black"

    offertable.style.display="none";
    UserTable.style.display="block";
    adminButtons.style.display="block";
}

function DevTableSelected(){
    AddAnimation();
    TituloTabla.textContent="Tabla Desarrolladores";
    dev_tbl_btn.style.backgroundColor="gray";
    dev_tbl_btn.style.color="white";

    user_tbl_btn.style.backgroundColor="#f5f5f5";
    user_tbl_btn.style.color="black";

    mipyme_tbl_btn.style.backgroundColor="#f5f5f5";
    mipyme_tbl_btn.style.color="black";

    offerbtn.style.backgroundColor="#f5f5f5";
    offerbtn.style.color="black"

    offertable.style.display="none";
    UserTable.style.display="block";
    adminButtons.style.display="block";
}

function MipymeTableSelected(){
    AddAnimation();
    TituloTabla.textContent="Tabla Mipymes";
    mipyme_tbl_btn.style.backgroundColor="gray";
    mipyme_tbl_btn.style.color="white";

    user_tbl_btn.style.backgroundColor="#f5f5f5";
    user_tbl_btn.style.color="black";

    dev_tbl_btn.style.backgroundColor="#f5f5f5";
    dev_tbl_btn.style.color="black";

    offerbtn.style.backgroundColor="#f5f5f5";
    offerbtn.style.color="black"

    offertable.style.display="none";
    UserTable.style.display="block";
    adminButtons.style.display="block";
}

//offers

offer_btn_IsShowing = false;
function OfferSubMenu(){
    if (!offer_btn_IsShowing){
        region_tbl_btn.style.display="block";
        offerdroplist.style.backgroundColor="gray";
    }
    else{
        region_tbl_btn.style.display="none";
        offerdroplist.style.backgroundColor="#f5f5f5";  
    }
    offer_btn_IsShowing = !offer_btn_IsShowing;
}

function OpenOffers(){
    AddAnimation();
    TituloTabla.textContent="Ofertas";

    offertable.style.display="flex";
    UserTable.style.display="none";
    adminButtons.style.display="none";

    offerbtn.style.backgroundColor="gray";
    offerbtn.style.color="white";

    mipyme_tbl_btn.style.backgroundColor="#f5f5f5";
    mipyme_tbl_btn.style.color="black";

    user_tbl_btn.style.backgroundColor="#f5f5f5";
    user_tbl_btn.style.color="black";

    dev_tbl_btn.style.backgroundColor="#f5f5f5";
    dev_tbl_btn.style.color="black";
}

function AddAnimation(){
    setInterval(()=> {
        TituloTabla.classList.add("fade-in-up-reversed"); 
    }, 1);
    TituloTabla.classList.remove("fade-in-up-reversed");
}

//logout

user_sub_menu_isShowing = false;
function OpenAdminMenu(){
    if (!user_sub_menu_isShowing){
        user_sub_menu.style.display="block";
    }
    else{
        user_sub_menu.style.display="none";
    }
    user_sub_menu_isShowing = !user_sub_menu_isShowing;
}