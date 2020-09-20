
//*************ESTE ES EL CÓDIGO DEL LADO DEL CLIENTE *************/
const socket = io().connect('http://localhost:3000');//este es el socket del cliente, envía id de conexión.


//ELEMENTOS DEL DOM
const estadoDiv = document.querySelector('.estado');
const borrarDiv= document.querySelector('.borrar');
const celdaDivs= document.querySelectorAll('.celda'); //Essto recibe un array de todas las celdas 
console.log("Las pinches celdas son ");

console.log(celdaDivs);


//Usuario en local Storage
let nombreUser = localStorage.getItem('nombreUsuario');
window.alert("Hola "+nombreUser);



const xSimbolo= '✖';
const oSimbolo= '◯'


//variables del juego
let juegoFuncionando = true;
let turnoX=true;
let ganador= null;

//Primera carga
socket.on("envioCelda", (objetoPosicion)=>{
    const letter = objetoPosicion.letra;
   // classList.add('x');
   const classList =  document.getElementById(objetoPosicion.celdaIdentificador).classList; //Se obtiene lista de clases del div q se dio clic
   classList.add(letter);
    console.log("Celda id: "+objetoPosicion.celdaIdentificador+", letra: "+letter);

    checkEstadoJuego();
    console.log("turnoX contiene="+turnoX);
});



//funciones
const letraSimbolo =(letra) => letra === 'x' ? xSimbolo : oSimbolo;

const handleGanador= (letra) =>{
    juegoFuncionando=false;
    ganador = letra;
    if(ganador === 'x'){
        console.log('El ganador fue X'); 
        estadoDiv.innerHTML = 'El ganador es '+letraSimbolo(ganador); //Aquí se dice si ganó X o O
    } else {
        estadoDiv.innerHTML = '<span> El ganador es '+letraSimbolo(ganador)+'</span>';
    }
};


const checkEstadoJuego = () =>{
    //Celda divs en un array
    //Se asigna valor a const div
    //Se saca el valor de la clase 2 (tercera clase) (letras 'X' o 'Y', ej: celda 1 -x-)
    //Se obtiene la letra de cada celda X o Y
    const div1= celdaDivs[0].classList[1];
    const div2= celdaDivs[1].classList[1];
    const div3= celdaDivs[2].classList[1];
    const div4= celdaDivs[3].classList[1];
    const div5= celdaDivs[4].classList[1];
    const div6= celdaDivs[5].classList[1];
    const div7= celdaDivs[6].classList[1];
    const div8= celdaDivs[7].classList[1];
    const div9= celdaDivs[8].classList[1];

    //Ganador
    if(div1 && div1 === div2 && div1 === div3){
        handleGanador(div1);
        celdaDivs[0].classList.add('ganador');
        celdaDivs[1].classList.add('ganador');
        celdaDivs[2].classList.add('ganador'); 
        console.log(celdaDivs[0]);
        console.log(celdaDivs[1]);
        console.log(celdaDivs[2]);
    } else if (div4 && div4 === div5 && div4 === div6){
        handleGanador(div4);
        celdaDivs[3].classList.add('ganador');
        celdaDivs[4].classList.add('ganador');
        celdaDivs[5].classList.add('ganador');       
    } else if (div7 && div7 === div8 && div7 === div9){
        handleGanador(div7);
        celdaDivs[6].classList.add('ganador');
        celdaDivs[7].classList.add('ganador');
        celdaDivs[8].classList.add('ganador');       
    } else if (div1 && div1 === div4 && div1 === div7){
        handleGanador(div1);
        celdaDivs[0].classList.add('ganador');
        celdaDivs[3].classList.add('ganador');
        celdaDivs[6].classList.add('ganador');       
    } else if (div2 && div2 === div5 && div2 === div8){
        handleGanador(div2);
        celdaDivs[1].classList.add('ganador');
        celdaDivs[4].classList.add('ganador');
        celdaDivs[7].classList.add('ganador');       
    } else if (div3 && div6 === div3 && div6 === div9){
        handleGanador(div3);
        celdaDivs[2].classList.add('ganador');
        celdaDivs[5].classList.add('ganador');
        celdaDivs[8].classList.add('ganador');       
    }  else if (div1 && div1 === div5 && div1 === div9){
        handleGanador(div1);
        celdaDivs[0].classList.add('ganador');
        celdaDivs[4].classList.add('ganador');
        celdaDivs[8].classList.add('ganador');       
    }  else if (div3 && div3 === div5 && div3 === div7){
        handleGanador(div3);
        celdaDivs[2].classList.add('ganador');
        celdaDivs[4].classList.add('ganador');
        celdaDivs[6].classList.add('ganador');       
    }  
    else if(div1 && div2 && div3 && div4 && div5 && div6 && div7 && div8 && div9){
        juegoFuncionando =false;
        estadoDiv.innerHTML = 'Empate!';
    }else {
        
        
       //Esto sirve para que cambie el turno del lado del cliente actual 
       turnoX =  !turnoX; //Se cambia el turno del jugador cada que se comprueba el estado del juego
        if(turnoX){
            estadoDiv.innerHTML= 'Es el turno de '+ xSimbolo;
        } else {
            estadoDiv.innerHTML= '<span>Es el turno de '+ oSimbolo + '</span>';
        }
    }

    
};



//event handlers
const handleBorrar = (e) =>{
    turnoX = true;
    ganador=null;
    estadoDiv.innerHTML= 'Es el turno de '+ xSimbolo;
    for(const celdaDiv of celdaDivs){
        celdaDiv.classList.remove('x');
        celdaDiv.classList.remove('o');
        celdaDiv.classList.remove('ganador');
    }
};

const handleCellClick = (e) => {
    var letraEnviada;

    //Aquí que esté el on que agregue objetos al dom también...
   /* socket.on("envioCelda", (objetoPosicion)=>{
        console.log("celda recibida "+objetoPosicion.celdaIdentificador);
        document.getElementById(objetoPosicion.celdaIdentificador).innerHTML=objetoPosicion.letra;
    })*/

    //e= evento, target= elemento >>> evento.Div.ClassList, se obtiene la lista
    const classList = e.target.classList;//Lista de clases de cada div es 'Clase, num' 
    
    const celdaId= e.target.id;
    console.log(celdaId);


    
    if (classList[2]=='x' || classList[2] == 'o'){
       return;
    }

    if(turnoX){
        //Desde aquí que se emita el movimiento
        
        classList.add('x');//Se agrega X a la lista del div <-- en el lado del cliente actual
        checkEstadoJuego();
        letraEnviada='x'; 
      
    }else{
        classList.add('o');//Se agrega O  a la lista del div   
        checkEstadoJuego();
        letraEnviada='o';      
    }

    //console.log("Lista de clases de div selec: "+classList);
    //Acá se envía el id de la celda que se le va a poner la letra
    socket.emit("envioCelda", objetoPosicion={
      celdaIdentificador: celdaId,
      letra:letraEnviada
    });

};


//event listeners
borrarDiv.addEventListener('click', handleBorrar);

//Se coloca listener a todas las celdas del juego
for(const celdaDiv of celdaDivs){
    celdaDiv.addEventListener('click',handleCellClick)
}
