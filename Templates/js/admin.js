$(document).ready(function () {
    function cargarUsuarios() {
        //order by por estado de cuenta
        //reload

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/emprendev/v1/user/listOrderAccount",
            dataType: "json",
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

    function prueba() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/emprendev/v1/user/listOrderAccount",
            dataType: "json",
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
                success: function (response) {
                    cargarUsuarios();
                },
                error: function (xhr, status, error) {
                    console.error("Error al actualizar Usuario:", error);
                }
            });
        }
    });
});

const user_tbl_btn = document.getElementById("user-table-btn");
const dev_tbl_btn = document.getElementById("dev-table-btn");
const mipyme_tbl_btn = document.getElementById("mipyme-table-btn");
const UserTable = document.getElementById("UserTable");
const devTable = document.getElementById("DevTable");
const userdroplist = document.getElementById("userdroplist");

const logout_btn = document.getElementById("logout-btn");
const adminButtons = document.getElementById("adminbuttons");

const region_tbl_btn = document.getElementById("region-tbl-btn");
const offertable = document.getElementById("offerTable");
const offerbtn = document.getElementById("offerbtn");
const offerdroplist = document.getElementById("offer-drop-list");

var TituloTabla = document.getElementById("TituloTabla");

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

logout_btn_isShowing = false;
function OpenAdminMenu(){
    if (!logout_btn_isShowing){
        logout_btn.style.display="block";
    }
    else{
        logout_btn.style.display="none";
    }
    logout_btn_isShowing = !logout_btn_isShowing;
}