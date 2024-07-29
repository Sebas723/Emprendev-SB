$(document).ready(function() {
    // Función para obtener los tags desde el backend
    function loadTags() {
        $.ajax({
            url: 'http://localhost:8080/api/tags',
            type: 'GET',
            success: function(tags) {
                // Limpiar el contenedor de tags
                $('#tags-container').empty();

                // Iterar sobre los tags y agregarlos al contenedor
                tags.forEach(function(tag) {
                    var tagHtml = `
                        <li class="tag" draggable="true">
                            <input type="checkbox" name="tags[]" value="${tag.id}" style="display: none;">
                            <img src="${tag.imageUrl}" style="width: 20px; height: 20px;" alt="" draggable="false">
                            ${tag.name}
                        </li>
                    `;
                    $('#tags-container').append(tagHtml);
                });
            },
            error: function(xhr, status, error) {
                console.log('Error al cargar los tags:', error);
            }
        });
    }

    // Llamar a la función para cargar los tags cuando la página esté lista
    loadTags();
});
