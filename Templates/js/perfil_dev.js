const userSubMenu = document.getElementById("user-sub-menu");

const PersonalInformationBtn = document.getElementById("datos-personales-btn");
const DescriptionBtn = document.getElementById("descripcion-btn");
const TituloInfo = document.getElementById("tituloinfo");

const DescriptionInformation = document.getElementById("descripcion-informacion");
const DatosPeronales = document.getElementById("datos-personales");

const File = document.getElementById("foto");
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
File.addEventListener('change', e => {
    if (e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            UserImgPerfil.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    } else {
        UserImgPerfil = DefaultFile;
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

            // Actualiza el DOM con los datos de Dev
            $(".profileDescription").text(devData.profileDescription || "Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion");
            $(".university").text(devData.university || "Puedes agregar la universidad de tu estudio desde Perfil/Editar/Universidad");
            $(".career").text(devData.career || "Puedes agregar el nombre de la carrera desde Perfil/Editar/Carrera");
            $(".careerStartDate").text(devData.careerStartDate || "Puedes agregar la fecha de inicio de la carrera desde Perfil/Editar/Fecha de inicio");
            $(".careerEndDate").text(devData.careerEndDate || "Puedes agregar la fecha de finalizacion de la carrera desde Perfil/Editar/Fecha de finalizacion");
            $(".charge").text(devData.charge || "Si cuentas con experiencia ya sea de un proyecto formativo o trabajando en alguna empresa puedes agregarlo desde Perfil/Editar/Nombre del cargo");
            $(".company").text(devData.company || "Si cuentas con experiencia trabajando en alguna empresa puedes agregarla desde Perfil/Editar/Nombre de la empresa");
            $(".chargeStartDate").text(devData.chargeStartDate || "Si cuentas con experiencia trabajando en alguna empresa puedes agregarla desde Perfil/Editar/Fecha de inicio");
            $(".chargeEndDate").text(devData.chargeEndDate || "Si cuentas con experiencia trabajando en alguna empresa puedes agregarla desde Perfil/Editar/Fecha de finalizacion");
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

// Llama a la función para verificar el estado de la sesión
checkSessionStatus();