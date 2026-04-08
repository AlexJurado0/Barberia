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
  constructor(nombre, telefono, servicio, fecha) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.servicio = servicio;
    this.fecha = fecha;
  }

  MostrarInfo() {
    console.log("Nombre: " + this.nombre + " - Teléfono: " + this.telefono + " - Servicio: " + this.servicio + " - Fecha: " + this.fecha);
  }
}

module.exports = { Usuario, Turno };