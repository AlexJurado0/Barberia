// guardar servicio
document.getElementById('guardar-servicio').addEventListener('click', async () => {
  const servicio = document.getElementById('servicio').value;
  const precio = document.getElementById('precio').value;
  const duracion = document.getElementById('duracion').value

  if (servicio === '' || precio === '' || duracion === '') {
    alert('Por favor, complete todos los campos');
    return;
  }
  const nuevoServicio = {
    servicio: servicio,
    precio: precio,
    duracion: duracion
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

// eliminar servicio
document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("btn-eliminar")) return;

  const servicio = e.target.dataset.id;
  console.log(servicio)

  const response = await fetch('/api/servicios/gestionServcios/eliminarServicio', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      servicio
    })
  });


  const data = await response.json();

  if (response.ok) {
    alert('Servicio eliminado exitosamente');
    location.reload();
  } else {
    alert('Error: ' + data.error);
  }
});

// mostrar servicios
const mostrarServicios = async () => {
  const conteinerSevicios = document.getElementById('tabla-servicios');
  const respuesta = await fetch('/api/servicios/gestionServcios/getServicios');
  console.log(respuesta)
  const servicios = await respuesta.json();
  console.log(servicios)
  let html = ` 
    <div class="tabla-rows">
      <h3 class="tabla-header tamaño-text">Servicio</h3>
      <h3 class="tabla-header tamaño-text">Precio</h3>
      <h3 class="tabla-header tamaño-text">Duracion</h3>
      <h3 class="tabla-header tamaño-text">Acción</h3>
    </div>
      `

    ;
  servicios.forEach(servicio => {
    html += `
      <div class="tabla-rows">
      <p class="tabla-item" value="${servicio.servicio}">${servicio.servicio}</p>
      <p class="tabla-item precio" value="${servicio.precio}">${servicio.precio}$</p>
      <p class="tabla-item " value="${servicio.duracion}">${servicio.duracion} min</p>
      <button class="btn-eliminar" data-id="${servicio.id}"">Eliminar</button>
      </div>
    `
  });

  conteinerSevicios.innerHTML = html;
};

mostrarServicios();