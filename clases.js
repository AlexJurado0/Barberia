class Usuario {
  constructor(user, pass,nombre,telefono, email ) {
    this.user = user;
    this.pass = pass;
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
  } 
  MostrarInfo() {
    console.log("Usuario: " + this.user + " - Contraseña: " + this.pass + " - Nombre: " + this.nombre  + " - Teléfono: " + this.telefono + " - Email: " + this.email);
  }
}

class Turno {
  constructor(fecha, hora, nombre, telefono, servicio, estado) {
    this.fecha = fecha;
    this.hora = hora;
    this.nombre = nombre;
    this.telefono = telefono;
    this.servicio = servicio;  
    this.estado = estado;
  }

  MostrarInfo() {
    console.log("fecha: " + this.fecha + " - Hora: " + this.hora + " - Nombre: " + this.nombre + " - Teléfono: " + this.telefono + " - Servicio: " + this.servicio + " - Estado: " + this.estado);
  }
}

module.exports = { Usuario, Turno };