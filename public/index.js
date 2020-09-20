

//const socket = io().connect('http://localhost:3000');//este es el socket del cliente

//Elementos del DOM
let nombreUsuario = document.getElementById('nombres'); //Se obtiene nombre de usuario
let boton = document.getElementById('boton');





//De aquí se envía el dato del nombre del usuario
//Se dispara al presionar click en el botón
boton.addEventListener('click', function(){
    console.log('Estoy dentro de boton entrar');
    console.log(nombreUsuario.value);
    localStorage.setItem("nombreUsuario", nombreUsuario.value);
    //Envía datos al servidor 
   // socket.emit('inicioSesion', nombreUsuario.value); 

    //Hace falta una funciòn para validar el nombre de usuario
    window.alert('Hola '+ nombreUsuario.value);
    window.location.href = 'juego.html';
});




