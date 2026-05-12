function esHoraValida(hora) {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return regex.test(hora);
}

const gardarHorariosDisponibles = () => {

  const btnGuardarHorarios = document.getElementById('guardar-horarios');

  btnGuardarHorarios.addEventListener('click', async () => {

    const date = document.getElementById('date').value;
    const inicio = document.getElementById('hora-inicio').value;
    const fin = document.getElementById('hora-fin').value;

    if (!date || !inicio || !fin) {
      alert("Por favor, completa todos los campos antes de guardar los horarios.");
      return;
    }

    if (!esHoraValida(inicio) || !esHoraValida(fin)) {
      alert("Formato de hora inválido. Usa HH:MM (ej: 09:00 o 15:30)");
      return;
    }

    console.log("Horarios seleccionados:", date, inicio, fin);

    const horarios = {
      date: date,
      inicio: inicio,
      fin: fin
    }

    const res = await fetch('/api/panelAdmin/gestionTurnos/horarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(horarios)
    });

    if (res.ok) {
      alert("Horarios guardados exitosamente.");
      window.location.reload();
    }
  });
}

const mostrarHorarios = async () => {
  const conteinerTurnos = document.getElementById('tabla-turnos');
  const respuesta = await fetch(('/api/horarios'))
  const horarios = await respuesta.json();
  console.log(horarios);
  let html = `
    <div class="tabla-rows">
      <h3 class="cell tamaño-text">Fecha</h3>
      <h3 class="cell tamaño-text">Hora inicio</h3>
      <h3 class="cell tamaño-text">Hora fin</h3> 
      <h3 class="cell tamaño-text">Acción</h3> 
    </div>`;
  horarios.forEach(horario => {
      html += `<div class="tabla-rows">
        <p class="cell">${horario.date}</p>
        <p class="cell">${horario.inicio}</p>
        <p class="cell">${horario.fin}</p>
        <button class="btn-eliminar" data-id="${horario.id}">Eliminar</button>
      </div>`;
  });

  conteinerTurnos.innerHTML = html;
}

document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("btn-eliminar")) return;

  const horario = e.target.dataset.id;

  const response = await fetch('/api/servicios/gestionTurnos/eliminarHorario', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ horario })
  });

  const data = await response.json();

  if (response.ok) {
    alert('Horario eliminado exitosamente');
    location.reload();
  } else {
    alert('Error: ' + data.error);
  }
});

mostrarHorarios();
gardarHorariosDisponibles();