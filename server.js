'use strict'

console.log("Estoy en el servidor");

const express = require('express');
const socket= require('socket.io');
const http = require('http');
const path= require('path');
const app= express();

var usuario;

app.set('port', process.env.port || 3000);

//Archivos estáticos  //--Path.join() no funciona... 
app.use(express.static(__dirname + '/public'));


//********************iniciar el servidor ****************** */
const server = app.listen(app.get('port'), () => {
    console.log('server en puerto ', app.get('port'));
})

//io mantiene conexión de sockets
const io = socket(server)//z<--- olbtiene todo el modulo del servidor;

var contadorConexiones=0;

//Web Sockets.
//Esta función se activa cuando alguien se conecta en el navegador
io.on('connection', function (socket){
    
    contadorConexiones++;
    console.log("---------------------------------");
    console.log("NUMERO DE CONEXIONES: "+contadorConexiones);
   
   
    console.log('MENSAJE CONEXIÓN HECHA');   
    console.log('Nueva conexión', socket.id); //Id del socket del cliente 
    
   var cliente1;
    var cliente2;
    if(contadorConexiones==1){
        cliente1=socket.id;
        console.log("Cliente 1 es: "+ cliente1);
    }
    else{
        cliente2=socket.id;
        console.log("Cliente 2 es: "+ cliente2);
    }

    console.log("CANTIDAD DE CONEXIONES--->"+io.sockets.clients().length);
    
    
    //Esto recibe el nombre de usuario al darle clic al botón desde el inicio de sesión
    //Se está enviando el nombre del usuario a todos los usuarios conectados
    socket.on('inicioSesion', (dato) =>{
    
        usuario= dato;
        console.log('Dentro del servidor. Usuario: ' + dato);
        console.log('PLGP'+ usuario);
        io.sockets.emit('inicioSesion', dato); //<---- Reenvía a todos los navegadores 
       
      
    });   
    

    socket.on('envioDatos',(celdaDivs) =>{
        console.log("Dentro de servidor recibiendo datos"); //Solo imprime la posicion de las celdas en el array
        
        
     // io.sockets.emit('envioDatos',celdaDivs);//Se està enviando a todos los navegadores el array de las celdas
    });

    socket.on("envioCelda",(objetoPosicion) =>{
        console.log("Celda recibida y enviada "+ objetoPosicion.celdaIdentificador);
        console.log("Letra recibida y enviada "+ objetoPosicion.letra);
        socket.broadcast.emit("envioCelda",objetoPosicion);
    })

});


   


    








