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
  <div class="hora">${turnos.hora}</div>
    <h3>${turnos.nombre}</h3>
    <p>${turnos.servicio}</p>

    ${turnos.estado === 'Pendiente' 
    ? `<div class="estado pendiente">${turnos.estado}</div>` 
    : `<div class="estado ${estadoClass}">${turnos.estado}</div>`}
    <div class="accion">
    <button class="confirmar">✔ Confirmar</button>
    <button class="cancelar">❌ Cancelar</button>`;

    document.getElementById('container-turnos').appendChild(turnosElement);


    const btnConfirmar = turnosElement.querySelector('.confirmar');
    const btnCancelar = turnosElement.querySelector('.cancelar');

    btnConfirmar.addEventListener('click', async () => {
      if (turnos.estado === 'Cancelado' || turnos.estado === 'Pendiente') {
        const seguro = confirm("¿Seguro que querés cancelar este turno?");

        if (seguro) {
          const respuesta = await fetch(`/api/turnos/confirmar/${turnos.cliente}`,{
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
          const respuesta = await fetch(`/api/turnos/cancelar/${turnos.cliente}`,{
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
  const filtrarPorEstados = (estado) =>{
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
  
  

const salir =  () =>{
  const btnSalir = document.getElementById('salir');
  btnSalir.addEventListener('click', async() => {
    const seguro = confirm("¿Seguro que querés salir?");
    if (seguro) {
      window.location.href = '/api/logout/salir';
      // if (respuesta.ok) {
      //   console.log("Sesión cerrada en el servidor");
      //   window.location.href = '/login.html';
      // }
    }
  });
}

filtrarPorEstados();
salir();
window.onload = cargarTurnos;

