const fs = require('fs');
const path = require('path');
const { Usuario } = require('./clases');
const { get } = require('http');

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


// Usuario
const getUsuarios = async () => {
  const file = await prisma.usuario.findMany()

  console.log(file)
  // const file = path.join(__dirname, 'db', 'usuarios.json');
  // const data = fs.readFileSync(file, 'utf8');
  // const usuariosData = JSON.parse(file);
  return file;
};

//Turnos
const getTurnos = async() => {
  const file = await prisma.turno.findMany({
    include: {
      servicio: true
    }
  })
  return file;
}

const setTurnos = async (turno) => {
  console.log(turno)
  await prisma.turno.create({
    data: {
      "fecha": turno.date,
      "hora": turno.hora,
      "nombre": turno.nombre,
      "telefono": turno.telefono,
      "estado": turno.estado,
      "usuarioId": 1,
      "servicioId": Number(turno.servicio)
    }
  })
}

const solicitarTurno = (turno) => {
  setTurnos(turno);
}


const confirmarTurno = async (cliente) => {
  await prisma.turno.updateMany({
    where: {
      id: Number(cliente)
    },
    data: {
      estado: "Confirmado"
    }
  });
};


const cancelarTurno = async (cliente) => {
  await prisma.turno.updateMany({
    where: {
      id: Number(cliente)
    },
    data: {
      estado: "Cancelado"
    }
  });
};

const filtrarTurnos = async(estado) => {
  const turnos = await getTurnos();
  const turnosfiltrados = turnos.filter(turno => turno.estado === estado);
  return turnosfiltrados;
};

const filtrarTurnosFecha = async(fecha) => {

  const turnos = await getTurnos();
  const turnosfiltrados = turnos.filter(turno => turno.date === fecha);
  return turnosfiltrados;
}


// Horarios
const getHorariosDisponibles = async () => {
  const file = await prisma.horario.findMany()
  console.log(file)
  return file
};

const horarioFechaDate = async (date) => {
  const horariosFiltrados = await prisma.horario.findMany({
    where: {
      date: date
    }
  });
  return horariosFiltrados;
};

const guardarHorariosDisponibles = async (date, inicio, fin) => {

  console.log(date, inicio, fin)
  const file = await prisma.horario.create({
    data: {
      date: date,
      inicio: inicio,
      fin: fin,
      usuarioId: 1
    }
  })
};

const eliminarHorario = async (horario) => {
  const file = await prisma.horario.delete({
    where: {
      id: Number(horario)
    }
  })
}

// panelCliente


const getTurnosDisponibles = (date) => {
  const turnos = getTurnos();
  return turnos.filter(turno => turno.date === date);
};




//Servicios
const guardarServicio = async (servicio, precio, duracion) => {

  precio = parseFloat(precio)
  duracion = parseInt(duracion)
  const data = await prisma.servicio.create({
    data: {
      "servicio": servicio,
      "precio": precio,
      "duracion": duracion,
      "usuarioId": 1
    }
  })

}

const getServicios = async () => {
  const file = await prisma.servicio.findMany()
  console.log(file)
  return file;
}

const eliminarServicio = async (servicio) => {

  const file = await prisma.servicio.delete({
    where: {
      id: Number(servicio)
    }
  })
}


module.exports = { getUsuarios, getTurnos, setTurnos, confirmarTurno, cancelarTurno, filtrarTurnos, filtrarTurnosFecha, solicitarTurno, guardarHorariosDisponibles, getHorariosDisponibles, horarioFechaDate, getTurnosDisponibles, guardarServicio, getServicios, eliminarServicio, eliminarHorario };