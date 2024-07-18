document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registro-form');
  const submitButton = document.getElementById('btn-submit');

  form.addEventListener('submit', function (event) {
      if (!validateForm()) {
          event.preventDefault();
      }
  });

  function validateForm() {
    const nombre = document.querySelector('[name="nombre"]').value;
    const apellido = document.querySelector('[name="apellido"]').value;
    const tipoDocumento = document.querySelector('[name="td"]').value;
    const documentoIdentidad = document.querySelector('[name="id_usuario"]').value;
    const fechaNacimiento = document.querySelector('[name="fecha_nac"]').value;
    const rol = document.querySelector('[name="rol"]').value;
    const telefono = document.querySelector('[name="telefono"]').value;
    const correo = document.querySelector('[name="correo"]').value;
    const contrasena = document.querySelector('[name="contrasena"]').value;
    const confirmarContrasena = document.querySelector('[name="confirmarContrasena"]').value;
    const terminosCheckbox = document.querySelector('[name="form-checkbox"]').checked;

    const validacionPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,15}$/;

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
        'terminosCheckbox',
        'contrasena',
        'correo',
        'telefono',
        'rol',
        'edad',
        'fechaNacimiento',
        'documentoIdentidad',
        'tipoDocumento',
        'nombreApellido',
        'confirmarContrasena'
    ];

    for (let validacion of validaciones) {
        switch (validacion) {
            case 'terminosCheckbox':
                if (!terminosCheckbox) {
                    showErrorMessage('Debes aceptar los términos y condiciones.');
                }
                break;
            case 'confirmarContrasena':
                if (!confirmarContrasena.match(contrasena)){
                    showErrorMessage('La contraseña no coincide')
                }
                break;
            case 'contrasena':
                if (!contrasena.match(validacionPassword)) {
                  showErrorMessage('La contraseña debe tener al menos 8 caracteres, una letra mayuscula, una letra minuscula y un numero.');
                }
                break;
            case 'correo':
                if (!/^\S+@\S+\.\S+$/.test(correo)) {
                    showErrorMessage('Por favor, ingresa un correo electrónico válido.');
                }
                break;
            case 'telefono':
                if (isNaN(telefono) || telefono.length != 10){
                  showErrorMessage('Por favor, ingrese un numero de telefono valido');
                }
                break;
            case 'rol':
                if (rol === "0") {
                    showErrorMessage('Por favor, selecciona un rol.');
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
                    showErrorMessage('Tu edad no es valida, intenta nuevamente');
                }
                break;
            case 'fechaNacimiento':
                if (!fechaNacimiento) {
                    showErrorMessage('Por favor, ingresa tu fecha de nacimiento.');
                }
                break;
            case 'documentoIdentidad':
                if (isNaN(documentoIdentidad) || /^\s*$/.test(documentoIdentidad) || documentoIdentidad.length != 10) {
                    showErrorMessage('El documento de identidad debe ser un número válido.');
                }
                break;
            case 'tipoDocumento':
                if (tipoDocumento === "0") {
                    showErrorMessage('Por favor, selecciona un tipo de documento.');
                }
                break;
            case 'nombreApellido':
                if (/^\d+$/.test(nombre) || /^\d+$/.test(apellido)) {
                    showErrorMessage('Los nombres y apellidos no pueden contener números.');
                }
                if (nombre.trim() === "" || apellido.trim() === "") {
                    showErrorMessage('Por favor, completa los campos de nombres y apellidos.');
                }
                break;
            default:
                break;
        }
    }

    return todasLasValidacionesPasaron;
}

});