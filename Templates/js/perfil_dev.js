const userSubMenu = document.getElementById("user-sub-menu");

const PersonalInformationBtn = document.getElementById("datos-personales-btn");
const DescriptionBtn = document.getElementById("descripcion-btn");
const TituloInfo = document.getElementById("tituloinfo");

const DescriptionInformation = document.getElementById("descripcion-informacion");
const DatosPeronales = document.getElementById("datos-personales");
const guardarFotosBtn = document.getElementById("guardar-fotos-btn");

var fileInput = document.getElementById("foto");
const DefaultFile = "img/Gato1.jpg";
const UserImgPerfil = document.getElementById("user-img-perfil");


function ButtonDataSelected() {
    PersonalInformationBtn.style.display = "";
    PersonalInformationBtn.style.backgroundColor = "gray";
    PersonalInformationBtn.style.transitionDuration = "0.5s";
    PersonalInformationBtn.style.color = "white";
    TituloInfo.textContent = "Informacion General";

    DescriptionBtn.style.display = "";
    DescriptionBtn.style.backgroundColor = "white";
    DescriptionBtn.style.color = "black";

    DescriptionInformation.style.display = "none";
    DatosPeronales.style.display = "block";
}

//Submenu del perfil del usuario (imagen arriba a la izquierda)

userSubMenu.style.display = "none";

SubmenuPerfilBtn_isShowing = false;
function OpenPerfilSubMenu() {
    if (!SubmenuPerfilBtn_isShowing) {
        userSubMenu.style.display = "block";
    }
    else {
        userSubMenu.style.display = "none";
    }
    SubmenuPerfilBtn_isShowing = !SubmenuPerfilBtn_isShowing;
};



//Desde aqui incia el script del cambio de foto de perfil del usuario
fileInput.addEventListener('change', function(event) {
    const img = event.target.files[0];
    if (img) {
        const reader = new FileReader();

        reader.onload = function (e) {
            UserImgPerfil.src = e.target.result;
        };
        reader.readAsDataURL(img);
        guardarFotosBtn.removeAttribute('hidden');
    } else {
        UserImgPerfil = DefaultFile;
        guardarFotosBtn.setAttribute('hidden', true);
    }
});

async function checkSessionStatus() {
    try {
        const data = await $.ajax({
            url: "http://localhost:8080/emprendev/v1/user/sessionStatus",
            type: "GET",
            xhrFields: {
                withCredentials: true,
            },
        });

        if (data.sessionActive) {
            const id = data.userId;

            // Solicitar datos adicionales de Dev
            const devData = await $.ajax({
                url: `http://localhost:8080/api/devs/${id}`,
                type: "GET",
                xhrFields: {
                    withCredentials: true,
                },
            });

            // Verifica los datos que recibes
            console.log("Datos de Dev:", devData);

                  // Format date
                  function formatDate(dateMillis) {
                    if (!dateMillis) return null; // Retorna null si no hay fecha
                    const date = new Date(dateMillis);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses comienzan en 0
                    const year = date.getFullYear();
                    return `${day}/${month}/${year}`;
                }

                const formattedCareerStartDate = formatDate(devData.careerStartDate);
                const formattedChargeStartDate = formatDate(devData.chargeStartDate);
                const formattedChargeEndDate = formatDate(devData.chargeEndDate);
                const formattedCareerEndDate = formatDate(devData.careerEndDate);
                

            // Actualiza el DOM con los datos de Dev
            $(".profileDescription").text(devData.profileDescription || "Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion");
            $(".university").text(devData.university || "Puedes agregar la universidad de tu estudio desde Perfil/Editar/Universidad");
            $(".career").text(devData.career || "Puedes agregar el nombre de la carrera desde Perfil/Editar/Carrera");
            $(".careerStartDate").text(formattedCareerStartDate || "Puedes agregar la fecha de inicio de la carrera desde Perfil/Editar/Fecha de inicio");
            $(".careerEndDate").text(formattedCareerEndDate || "Puedes agregar la fecha de finalizacion de la carrera desde Perfil/Editar/Fecha de finalizacion");
            $(".charge").text(devData.charge || "Si cuentas con experiencia ya sea de un proyecto formativo o trabajando en alguna empresa puedes agregarlo desde Perfil/Editar/Nombre del cargo");
            $(".company").text(devData.company || "Si cuentas con experiencia trabajando en alguna empresa puedes agregarla desde Perfil/Editar/Nombre de la empresa");
            $(".chargeStartDate").text(formattedChargeStartDate || "Si cuentas con experiencia trabajando en alguna empresa puedes agregarla desde Perfil/Editar/Fecha de inicio");
            $(".chargeEndDate").text(formattedChargeEndDate || "Si cuentas con experiencia trabajando en alguna empresa puedes agregarla desde Perfil/Editar/Fecha de finalizacion");
            $(".chargeDescription").text(devData.chargeDescription || "Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del cargo'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del cargo'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del cargo'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del cargo");

        } else {
            console.log("No active session:", data.message);
        }
    } catch (error) {
        console.error("Error checking session status:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo verificar el estado de la sesión o cargar los datos del desarrollador.",
        });
    }
}

async function putImg() {
    try {
        // Obtener datos del usuario
        const data = await $.ajax({
            url: "http://localhost:8080/emprendev/v1/user/sessionStatus",
            type: "GET",
            xhrFields: {
                withCredentials: true,
            },
        });

        const fileInput = document.getElementById('foto');
        if (fileInput.files.length === 0) {
            alert('Por favor, selecciona una imagen.');
            return;
        }

        const formData = new FormData();
        formData.append('imgProfile', fileInput.files[0]);

        // Enviar la solicitud AJAX para actualizar la imagen
        const response = await $.ajax({
            url: 'http://localhost:8080/emprendev/v1/user/' + data.userId + '/imgProfile',
            type: 'PUT',
            data: formData,
            contentType: false,
            processData: false,
        });

        alert('Imagen actualizada con éxito.');
        // Aquí puedes actualizar la vista para reflejar el nuevo perfil
        // Por ejemplo, actualizar la imagen en el DOM o redirigir a la página del perfil
        window.location.href ="perfil_dev.html"

    } catch (error) {
        alert('Error al actualizar la imagen.');
        console.error('Error:', error);
    }
}

// Llama a la función para verificar el estado de la sesión
checkSessionStatus();