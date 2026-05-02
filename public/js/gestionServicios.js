const guardarServicio = () => {


  const btnGuardar = document.getElementById('guardar-servicio');

  btnGuardar.addEventListener('click', async () => {
    const servicio = document.getElementById('servicio').value;
    const precio = document.getElementById('precio').value;

    if (servicio === '' || precio === '') {
      alert('Por favor, complete todos los campos');
      return;
    }
    const nuevoServicio = {
      servicio: servicio,
      precio: precio
    };
    const response = await fetch('/api/servicios/gestionServcios/guardarServicio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoServicio)
    })

    const data = await response.json();
    if (response.ok) {
      alert('Servicio guardado exitosamente');
      window.location.reload();
    } else {
      alert('Error al guardar el servicio: ' + data.error);
    }
  })
}


const mostrarServicios = async () => {
  const conteinerSevicios = document.getElementById('tabla-servicios');
  const respuesta = await fetch('/api/servicios/gestionServcios/getServicios');
  const servicios = await respuesta.json();
  let html = ` 
    <div class="tabla-rows">
      <h3 class="tabla-header">Servicio</h3>
      <h3 class="tabla-header">Precio</h3>
      <h3 class="tabla-header">Acción</h3>
    </div>
      `
      
      ;
  servicios.forEach(servicio => {
    html += `
      <div class="tabla-rows">
      <p class="tabla-item" value="${servicio.servicio}">${servicio.servicio}</p>
      <p class="tabla-item precio" value="${servicio.precio}">${servicio.precio}$</p>
      <button class="btn-eliminar" value="${servicio.servicio}">Eliminar</button>
      </div>
    `
  });

  conteinerSevicios.innerHTML = html;
};
mostrarServicios();
guardarServicio();