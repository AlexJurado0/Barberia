const mostrarTurnos = () => {
  const bodyTabla = document.getElementById("body-tabla");
  fetch("/api/turnos")
    .then((response) => response.json())
    .then((turnos) => { 
      bodyTabla.innerHTML = "";
      turnos.forEach(turno => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <th class="color-text">${turno.hora}</th>
          <th class="color-text">${turno.cliente}</th>
          <th class="color-text">${turno.servicio}</th>
          <td class="color-text">
          ${turno.estado === "Pendiente"
            ? `<span class="badge bg-warning text-dark">Pendiente</span>`
            : `<span class="badge bg-success">Finalizado</span>`
          }
          </td>
          <td>
            <button class="btn btn-success btn-sm">Atender</button>
            <button class="btn btn-danger btn-sm">Eliminar</button>
          </td>
          `;
          bodyTabla.appendChild(row);
      });
    })
    .catch((error) => console.error("Error al cargar los turnos:", error));
}

document.addEventListener("DOMContentLoaded", mostrarTurnos);