
const SolicitarTurno = () => {
  const btnSolicitar = document.querySelector(".btn-solicitar-turno");

  btnSolicitar.addEventListener("click", async () => {
    const date = document.getElementById("date").value;
    const hora = document.getElementById("horarios").value;
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const servicioSelect = document.getElementById("servicio");
    const duracion = parseInt(servicioSelect.value);
    const servicio = servicioSelect.options[servicioSelect.selectedIndex].dataset.id;


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
      duracion,
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

    if (response.ok) {
      alert('Turno guardado exitosamente');
    }
    location.reload();
  });
}


function generarSlots(inicio, fin, duracion) {
  const slots = [];

  let [h, m] = inicio.split(":").map(Number);
  let [hFin, mFin] = fin.split(":").map(Number);

  let actual = h * 60 + m;
  const limite = hFin * 60 + mFin;

  while (actual < limite) {
    const horas = Math.floor(actual / 60);
    const minutos = actual % 60;

    slots.push(
      `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`
    );

    actual += duracion;
  }

  return slots;
}




const mostrarHoraTurnos = async () => {
  const date = document.getElementById("date");
  const servicio = document.getElementById("servicio")

  const horarios = document.getElementById("horarios");
  const duracion = parseInt(servicio.value);

  if (!date || !duracion || isNaN(duracion)) {
    horarios.innerHTML = "";
    return;
  }
  console.log("Fecha seleccionada:", date.value);
  const response = await fetch(`/api/panelCliente/turnos/${date.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  console.log("Datos recibidos para la fecha:", date.value, data);
  const slotsSet = new Set();
  data.forEach(horario => {
    const slots = generarSlots(horario.inicio, horario.fin, parseInt(servicio.value));
    slots.forEach(slot => slotsSet.add(slot));
  });

  const slotsOrdenados = Array.from(slotsSet).sort();

  let html = "";

  slotsOrdenados.forEach(slot => {
    html += `<option value="${slot}">${slot}</option>`;
  });
  horarios.innerHTML = html;
  console.log("Turnos disponibles para la fecha:", date.value, data);
}

// 🔥 eventos
date.addEventListener("change", mostrarHoraTurnos);
servicio.addEventListener("change", mostrarHoraTurnos);

document.addEventListener("DOMContentLoaded", async () => {
  await mostrarServicios();
  await mostrarFechaTurnos();

  mostrarHoraTurnos();
  
});


const mostrarFechaTurnos = async () => {
  const response = await fetch('/api/horarios');
  const data = await response.json();

  const dataSet = new Set();
  data.forEach(turnos => {
    dataSet.add(turnos.date);
  });

  const dataSetOrdenados = Array.from(dataSet).sort();

  const fechaConteiner = document.getElementById("date");
  let html = "";
  dataSetOrdenados.forEach(turnos => {

    html += `<option value="${turnos}">${turnos}</option>`
  });

  fechaConteiner.innerHTML = html;
}

const mostrarServicios = async () => {
  const response = await fetch('/api/servicios/gestionServcios/getServicios')
  const data = await response.json()

  const conteinerservicio = document.getElementById('servicio')
  let html = ""
  data.forEach((servicio) => {
    console.log(servicio)
    html += `<option value="${servicio.duracion}" data-id="${servicio.id}"> ${servicio.servicio} (${servicio.precio}$)
    </option>`;
  })

  conteinerservicio.innerHTML = html

}
mostrarFechaTurnos();
mostrarServicios()

SolicitarTurno();
