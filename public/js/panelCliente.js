const SolicitarTurno = () => {
  const btnSolicitar = document.querySelector(".btn-solicitar-turno");

  btnSolicitar.addEventListener("click", async () => {
    const date = document.getElementById("date").value;
    const hora = document.getElementById("hora").value;
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const servicio = document.getElementById("servicio").value;

    if (!date || !hora || !nombre || !telefono || !servicio) {
      alert("Por favor completá todos los campos");
      return; // ❌ corta la ejecución
    }

    const data = {
      date,
      hora,
      nombre,
      telefono,
      servicio,
      estado: 'Pendiente'
    };
    console.log("Turno solicitado:", data);
    const response = await fetch('/api/turnos/solicitar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    location.reload();
  });
}

SolicitarTurno();