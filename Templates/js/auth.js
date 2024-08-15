// // auth.js

// document.addEventListener('DOMContentLoaded', function() {
//     // Obtener el rol del usuario desde localStorage
//     const userRole = localStorage.getItem('userRole');

//     // Redirigir según el rol del usuario
//     if (userRole === 'MIPYME') {
//         window.location.href = '/perfil_mipyme.html';
//     } else if (userRole === 'DEV') {
//         window.location.href = '/perfil_dev.html'; // Asumiendo que tienes un perfil para DEV
//     } else {
//         window.location.href = '/login.html'; // Redirige a la página de login si no tiene rol o no está autenticado
//     }
// });

// // auth.js

// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/api/getUserRole') // Asegúrate de que esta ruta sea la correcta para tu API
//         .then(response => response.json())
//         .then(data => {
//             const userRole = data.role; // Ajusta según cómo se devuelve el rol en la respuesta de la API

//             // Redirigir según el rol del usuario
//             if (userRole === 'MIPYME') {
//                 window.location.href = '/catalogo_devs.html';
//             } else if (userRole === 'DEV') {
//                 window.location.href = '/perfil_dev.html'; // Asumiendo que tienes un perfil para DEV
//             } else {
//                 window.location.href = '/catalogo.html'; // Redirige a la página de login si no tiene rol o no está autenticado
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching user role:', error);
//             window.location.href = '/login.html'; // Redirige a la página de login en caso de error
//         });
// });
