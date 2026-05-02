const btnGestionarTurnos = document.getElementById('gestion-de-turnos');

btnGestionarTurnos.addEventListener('click', () => {
  window.location.href = '/panelAdmin/gestionTurnos';
});

const btnGestionarServicios = document.getElementById('gestion-de-servicios');
btnGestionarServicios.addEventListener('click', () => {
  window.location.href = '/panelAdmin/gestionServicios';
});


const salir = () => {
  const btnSalir = document.getElementById('salir');
  btnSalir.addEventListener('click', async () => {
    const seguro = confirm("¿Seguro que querés salir?");
    if (seguro) {
      window.location.href = '/panelAdmin';
    }
  });
}


salir();