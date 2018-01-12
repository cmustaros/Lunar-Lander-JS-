var y = 5;
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;
var piloto = true;

window.onload = function(){
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	start();
}

function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
    piloto = true;
}

function stop(){
	clearInterval(timer);
    piloto = false;
}

function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v.toFixed(2);
	y +=v*dt;
	document.getElementById("altura").innerHTML=y.toFixed(2);
	
	if (y<65){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else {
        if(v<5){
            document.getElementById("parar").style.display="none";
            document.getElementById("endgame").innerHTML="You Win";
            document.getElementById("mensaje").innerHTML="Excelente aterrizaje, amigo!";
        } else{
            document.getElementById("parar").style.display="none";
        }
		stop();
        end();
	}
}

function motorOn(){
    if (piloto){    
        a=-g;
        if (timerFuel==null)
        timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
        document.getElementById("cohete").src="img/nave.png";
    }
}

function motorOff(){
	if(piloto){
    a=g;
	clearInterval(timerFuel);
	timerFuel=null;
    document.getElementById("cohete").src="img/nave.png";
    }
}

function reset(){
    stop();
    y = 5;
    v = 0;
    g = 1.622;
    a = g;
    dt = 0.016683;
    timer=null;
    timerFuel=null;
    fuel=100;
    piloto = true;
    motorOff();
    document.getElementById("end").style.display="none";
    document.getElementById("endgame").innerHTML="GAME OVER";
    document.getElementById("mensaje").innerHTML="Has perdido... Inténtalo de nuevo.";
    document.getElementById("parar").style.display="block";
    start();	
    document.getElementById("fuel").innerHTML=fuel.toFixed(2);
}

function actualizarFuel(){
    if (piloto) {    
        if(y<=70){
            fuel -= 0.1;
            if (fuel<=0){
                fuel = 0;
                motorOff();
            }
        }
    }
	document.getElementById("fuel").innerHTML=fuel.toFixed(3);	
}

function pausar(){
    stop();
    document.getElementById("c").style.display="inline-block";
}

function reanudar(){
    document.getElementById("c").style.display="none";
    start();
}

function end(){
    document.getElementById("end").style.display="block";
    piloto = false;
}