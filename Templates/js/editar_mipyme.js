const userSubMenu = document.getElementById("user-sub-menu");

function validarFormulario() {
    const nombre = document.querySelector('[name="nombre"]').value;
    const segundoNombre = document.querySelector('[name="segundo_nombre"]').value;
    const apellido = document.querySelector('[name="apellido"]').value;
    const segundoApellido = document.querySelector('[name="segundo_apellido"]').value;
    const documentoIdentidad = document.querySelector('[name="id_usuario"]').value;
    const fechaNacimiento = document.querySelector('[name="fecha_nac"]').value;
    const telefono = document.querySelector('[name="telefono"]').value;
    const correo = document.querySelector('[name="correo"]').value;
    const contrasena = document.querySelector('[name="contrasena"]').value;
    const confirmarContrasena = document.querySelector('[name="confirmarContrasena"]').value;

    const validacionPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,15}$/;

    const validaciones = [
        'nombre',
        'segundo_nombre',
        'apellido',
        'segundo_apellido',
        'documentoIdentidad',
        'fechaNacimiento',
        'edad',
        'telefono',
        'correo',
        'contrasena',
        'confirmarContrasena'
    ];

    for (let validacion of validaciones) {
        switch (validacion) {
            case 'confirmarContrasena':
                if (contrasena !== confirmarContrasena) {
                    alert('La contraseña no coincide');
                    return false;
                }
                break;
            case 'contrasena':
                if (contrasena.trim() === '') {
                    alert("Por favor, completa el campo Contraseña.");
                    return false;
                }
                if (!contrasena.match(validacionPassword)) {
                    alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.');
                    return false;
                }
                break;
            case 'correo':
                if (!/^\S+@\S+\.\S+$/.test(correo)) {
                    alert('Por favor, ingresa un correo electrónico válido.');
                    return false;
                }
                break;
            case 'telefono':
                if (telefono.trim() === '') {
                    alert("Por favor, ingresa tu número de teléfono.");
                    return false;
                }
                if (isNaN(telefono)) {
                    alert('El número de teléfono no puede contener letras.');
                    return false;
                }
                if (telefono.length != 10) {
                    alert("El número de teléfono debe contener 10 números.");
                    return false;
                }
                break;
            case 'fechaNacimiento':
                if (fechaNacimiento.trim() === '') {
                    alert('Por favor, ingresa tu fecha de nacimiento.');
                    return false;
                }
                break;
            case 'edad':
                const fechaNacimientoDate = new Date(fechaNacimiento);
                const hoy = new Date();
                let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
                if (hoy.getMonth() < fechaNacimientoDate.getMonth() || (hoy.getMonth() === fechaNacimientoDate.getMonth() && hoy.getDate() < fechaNacimientoDate.getDate())) {
                    edad--;
                }
                if (edad <= 18 || edad > 80) {
                    alert('Tu edad no es válida, intenta nuevamente');
                    return false;
                }
                break;
            case 'documentoIdentidad':
                if (isNaN(documentoIdentidad) || /^\s*$/.test(documentoIdentidad) || documentoIdentidad.length != 10) {
                    alert('El documento de identidad debe ser un número válido.');
                    return false;
                }
                break;
            case 'segundo_apellido':
                if (/^\d+$/.test(segundoApellido)) {
                    alert("Los apellidos no pueden contener números.");
                    return false;
                }
                break;
            case 'apellido':
                if (apellido.trim() === "") {
                    alert("Por favor, completa el campo Primer Apellido para continuar.");
                    return false;
                }
                if (/^\d+$/.test(apellido)) {
                    alert("Los apellidos no pueden contener números.");
                    return false;
                }
                break;
            case 'segundo_nombre':
                if (/^\d+$/.test(segundoNombre)) {
                    alert("Los nombres no pueden contener números.");
                    return false;
                }
                break;
            case 'nombre':
                if (nombre.trim() === "") {
                    alert("Por favor, completa el campo Primer Nombre para continuar.");
                    return false;
                }
                if (/^\d+$/.test(nombre)) {
                    alert("Los nombres no pueden contener números.");
                    return false;
                }
                break;
            default:
                break;
        }
    }
    return true;
}

//Submenu del perfil del usuario (imagen arriba a la izquierda)

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
