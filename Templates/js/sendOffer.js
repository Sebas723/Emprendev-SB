document.addEventListener('DOMContentLoaded', function() {
    function handleFileSelect(event) {
        const input = event.target;
        const index = input.id.split('-')[2]; // Obtener el índice de la ID del input
        const file = input.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                const imageUrlField = document.getElementById(`image_url_${index}`);
                if (imageUrlField) {
                    imageUrlField.value = data.url; // Guardar la URL de la imagen en el campo oculto
                } else {
                    console.error(`El campo de URL para la imagen ${index} no se encontró.`);
                }
            })
            .catch(error => {
                console.error('Error al subir la imagen:', error);
                alert('Error al subir la imagen');
            });
        }
    }

    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', handleFileSelect);
    });

    document.getElementById('submit_offer').addEventListener('click', function() {
        // Obtener los datos del formulario
        const titleInput = document.getElementById('card_title_input');
        const descriptionInput = document.getElementById('card_desc_input');
        const paymentInput = document.getElementById('card_pago_input');
        const fieldsInput = document.getElementById('offer_fields');

        if (titleInput && descriptionInput && paymentInput && fieldsInput) {
            const title = titleInput.value;
            const description = descriptionInput.value;
            const payment = paymentInput.value;
            const fields = fieldsInput.value;

            // Obtener las URLs de las imágenes
            const imageUrl1 = document.getElementById('image_url_1')?.value || '';
            const imageUrl2 = document.getElementById('image_url_2')?.value || '';
            const imageUrl3 = document.getElementById('image_url_3')?.value || '';
            const imageUrl4 = document.getElementById('image_url_4')?.value || '';

            // Crear un objeto con los datos de la oferta
            const offerData = {
                title: title,
                description: description,
                payment: payment,
                fields: fields,
                imageUrl1: imageUrl1,
                imageUrl2: imageUrl2,
                imageUrl3: imageUrl3,
                imageUrl4: imageUrl4,
                // Aquí podrías agregar más campos si es necesario
            };

            // Enviar los datos al backend
            fetch('http://localhost:8080/api/offers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(offerData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Oferta creada:', data);
                alert('Oferta creada con éxito');
                // Aquí puedes redirigir o actualizar la interfaz si es necesario
            })
            .catch(error => {
                console.error('Error al crear la oferta:', error);
                alert('Hubo un error al crear la oferta');
            });
        } else {
            console.error('Uno o más elementos del formulario no se encontraron.');
        }
    });
});
