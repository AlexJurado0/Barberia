const initSidebar = () => {
  const menuToggle = document.getElementById('menu-toggle');
  const closeSidebar = document.getElementById('close-sidebar');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (menuToggle && closeSidebar && sidebar && overlay) {
    const toggleMenu = () => {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    };

    menuToggle.addEventListener('click', toggleMenu);
    closeSidebar.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
  }
};
initSidebar();

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