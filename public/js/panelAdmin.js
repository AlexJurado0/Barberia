// Turnos
const cargarTurnos = () => {
  fetch('/api/turnos')
    .then(response => response.json())
    .then(data => {
      const turnoConteiner = document.getElementById('container-turnos');
      turnoConteiner.innerHTML = '';
      data.forEach(turnos => {
        mostrarTurnos(turnos);
      });
    })
}

const limpiarTurnos = () => {
  document.getElementById('container-turnos').innerHTML = '';
};

const mostrarTurnos = (turnos) => {
  const turnosElement = document.createElement('div');
  turnosElement.classList.add("turnos");
  const estadoClass = turnos.estado === 'Pendiente' ? 'pendiente' : turnos.estado === 'Confirmado' ? 'confirmado' : 'cancelado';
  turnosElement.innerHTML = `
  <div class="hora">${turnos.fecha} - ${turnos.hora} hs</div>
    <h3>${turnos.nombre}</h3>
    <p>${turnos.servicio.servicio}</p>

    ${turnos.estado === 'Pendiente'
      ? `<div class="estado pendiente" data-id="${turnos.id}">${turnos.estado}</div>`
      : `<div class="estado ${estadoClass}" data-id="${turnos.id}">${turnos.estado}</div>`}
    <div class="accion">
    <button class="confirmar">✔ Confirmar</button>
    <button class="cancelar">❌ Cancelar</button>`;

  document.getElementById('container-turnos').appendChild(turnosElement);


  const btnConfirmar = turnosElement.querySelector('.confirmar');
  const btnCancelar = turnosElement.querySelector('.cancelar');

  btnConfirmar.addEventListener('click', async () => {
    if (turnos.estado === 'Cancelado' || turnos.estado === 'Pendiente') {
      const seguro = confirm("¿Seguro que querés confirmar este turno?");

      if (seguro) {
        const respuesta = await fetch(`/api/turnos/confirmar/${turnos.id}`, {
          method: 'POST'
        });

        if (respuesta.ok) {
          console.log("Turno confirmado en el servidor");
          turnos.estado = 'Confirmado';
          turnosElement.querySelector('.estado').textContent = turnos.estado;
          turnosElement.querySelector('.estado').classList.remove('pendiente');
          turnosElement.querySelector('.estado').classList.remove('cancelado');
          turnosElement.querySelector('.estado').classList.add('confirmado');
        }
      }
    }
  })

  btnCancelar.addEventListener('click', async () => {
    if (turnos.estado === 'Confirmado' || turnos.estado === 'Pendiente') {
      const seguro = confirm("¿Seguro que querés cancelar este turno?");

      if (seguro) {
        const respuesta = await fetch(`/api/turnos/cancelar/${turnos.id}`, {
          method: 'POST'
        });

        if (respuesta.ok) {
          console.log("Turno cancelado en el servidor");
          turnos.estado = 'Cancelado';
          turnosElement.querySelector('.estado').textContent = turnos.estado;
          turnosElement.querySelector('.estado').classList.remove('pendiente');
          turnosElement.querySelector('.estado').classList.remove('confirmado');
          turnosElement.querySelector('.estado').classList.add('cancelado');
        }
      }
    }
  });
}

//filtrar por estado
const filtrarPorEstados = (estado) => {
  // const elementosFiltro = document.querySelector('.filtrar-estados');
  const btnTodos = document.getElementById('todos');
  const btnPendientes = document.getElementById('pendientes');
  const btnConfirmados = document.getElementById('confirmados');
  const btnCancelados = document.getElementById('cancelados');

  btnTodos.addEventListener('click', () => {
    cargarTurnos();
  });

  btnConfirmados.addEventListener('click', async () => {
    const res = await fetch('/api/turnos/filtrar/Confirmado');
    const data = await res.json();
    limpiarTurnos();
    data.forEach(turno => mostrarTurnos(turno));
  });

  btnPendientes.addEventListener('click', async () => {
    const res = await fetch('/api/turnos/filtrar/Pendiente');
    const data = await res.json();
    limpiarTurnos();
    data.forEach(turno => mostrarTurnos(turno));
  });

  btnCancelados.addEventListener('click', async () => {
    const res = await fetch('/api/turnos/filtrar/Cancelado');
    const data = await res.json();
    limpiarTurnos();
    data.forEach(turno => mostrarTurnos(turno));
  });
}

const filtrarFecha = () => {
  const btnFiltrarFecha = document.getElementById('fecha');
  btnFiltrarFecha.addEventListener('click', async () => {
    const fechaInput = document.getElementById('filtrar-fecha').value;
    console.log(fechaInput)
    if (fechaInput) {
      const res = await fetch(`/api/turnos/filtrar/fecha/${fechaInput}`);
      const data = await res.json();
      limpiarTurnos();
      data.forEach(turno => mostrarTurnos(turno));
    } else {
      alert("Por favor, ingresa una fecha para filtrar.");
    }
  });
}

const obtenerFechaHoy = () => {
  return new Date().toISOString().split("T")[0];
};

const cargarTurnosHoy = async () => {
  const hoy = obtenerFechaHoy();

  const res = await fetch(`/api/turnos/filtrar/fecha/${hoy}`);
  const data = await res.json();

  limpiarTurnos();
  data.forEach(turno => mostrarTurnos(turno));
};



filtrarPorEstados();
filtrarFecha();

window.onload = cargarTurnosHoy;

