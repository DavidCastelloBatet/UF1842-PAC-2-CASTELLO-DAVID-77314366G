// La funcio inicio() es crida immediatament després
// que el navegador carregui l'objecte.
window.onload = inicio;

// Array inicial de los videos
let videos = [
  "choke.mp4",
  "evolve.mp4",
  "martirio.mp4",
  "narcicista-live.mp4",
  "z-live.mp4",
];
console.log(videos);

// Array vacio que se llenara al ejecutar reordenar()
let ordenDeLosVideos = [];

// Variable  posicio inicial de l'array que controla velocitat de reproduccio
var speed = 2; // 2 = normal

// tot el quaryselector de l'etiqueta video el transformem en variable per escurçar
var vid = document.querySelector("video");

// funcion  para llamar funciones y disparar eventos
function inicio() {
  // LLamada a la funcion para reordenar videos
  reordenar();
  console.log(ordenDeLosVideos);

  // Setejo l'escala del reproductor a 0.6
  document.querySelector("section").style.transform = "scale(0.6)";

  // mandamos el video seleccionado al src del html
  let indice = Math.floor(Math.random() * videos.length);
  vid.src = `videos/${videos[ordenDeLosVideos[indice]]}`;

  // set volumen inicial a 0.5
  vid.volume = 0.5;

  // evento para el play / pause
  document.querySelector(".play").onclick = play;

  // evento para el mute
  document.querySelector(".mute").onclick = mute;

  // evento para saltar cancion
  document.querySelector(".siguiente").onclick = siguiente(indice);

  // evento reiniciar cancion
  document.querySelector(".reiniciar").onclick = reiniciar;

  // evento expandir / contraer video
  document.querySelector(".expandir").onclick = expandir;

  // actualitzacion continua del tiempo - funcio actualitzarTemps
  vid.ontimeupdate = actualizarTemps;
  // actualitzacio del temps quan carreguem el video- actualitza
  // el temps de ala durada del video i evitara el NaN
  vid.onloadeddata = actualizarTemps;

  // acceso directo al hacer click en la barra de tiempo
  document.querySelector(".barra1").onclick = buscar;

  // play / pause haciendo click sobre la imagen.
  vid.onclick = play;

  // modificar velocidad de reproduccion
  document.querySelector(".velocidad").onclick = velocidad;
}

// Funciones control de la REPRODUCCION *******************
// funcion para reordenar los videos del array de forma aleatoria
function reordenar() {
  for (video of videos) {
    do {
      var azar = Math.floor(Math.random() * videos.length);
    } while (ordenDeLosVideos.indexOf(azar) >= 0);
    ordenDeLosVideos.push(azar);
  }
  return ordenDeLosVideos;
}

// funcion para el play / pause
let play = () => {
  if (vid.paused) {
    vid.play();
    document.querySelector(".play").src = "./images/pause-outline.svg";
  } else {
    vid.pause();
    document.querySelector(".play").src = "./images/play.svg";
  }
};

//funcion para siguiente cancion ** FALTA !!
function siguiente(indice) {
  console.log(indice);
  console.log(ordenDeLosVideos.length);
}

// funcion reiniciar cancion
let reiniciar = () => (vid.currentTime = 0);
// ************************** fin REPRODUCCION ***********
//
//
// Funciones relacionadas con el SONIDO (mute y control volumen)
// funcion mute
let mute = () => {
  if (vid.paused) {
    // si no hay nada sonando, el boton no hace nada
    console.log("no esta sonant res");
  } else {
    // si hay video en reproduccion hago el mute
    if (vid.volume > 0) {
      // guardo valor volumen actual avans mute
      setVolumActual = vid.volume;
      console.log(setVolumActual);
      // setejo vol a 0
      vid.volume = 0;
      document.querySelector(".mute").src = "./images/volumen2.svg";
      console.log("esta en mute");
    } else {
      // agafo vol guardat i actualitzo al treure
      // el mute
      vid.volume = setVolumActual;
      document.querySelector(".mute").src = "./images/volumen1.svg";
      console.log("ara sona");
      console.log("Nivell so: " + vid.volume);
    }
  }
};

//funcion subir / bajar volumen
window.setVolume = function (val) {
  vid.volume = val / 100;
  console.log("Nivell so: " + vid.volume);
};
//*******************************fin SONIDO *************
//
//

// funcion expandir / contraer video
let expandir = () => {
  let sect = document.querySelector("section");
  // Accedim a transform (propietat CSS)
  if (sect.style.transform == "scale(0.6)") {
    // si esta en 0.6 la canviem a 1 i modifiquem icona
    sect.style.transform = "scale(1)";
    document.querySelector(".expandir").src = "./images/reducir.svg";
  } else {
    sect.style.transform = "scale(0.6)";
    document.querySelector(".expandir").src = "./images/expandir.svg";
  }
};
//
//

// funciones que afectan a la BARRA DE PROGRESO
let actualizarTemps = () => {
  // mostramos tiempo y durada del video
  document.querySelector(".estado").innerHTML = `${conversion(
    vid.currentTime
  )}     /    ${conversion(vid.duration)}`;
  // actualizamos barra de progreso
  // regla de tres:
  // si 100% - vid.duration
  //  x %    - vid.currentTime
  // entonces :
  let porcentaje = (100 * vid.currentTime) / vid.duration;
  // Ahora, con el valor del porcentaje, modificamos el ancho de la
  // barra roja dinamicamente.
  document.querySelector(".barra2").style.width = `${porcentaje}%`;
  //Compruebe si el video esta acabado y pongo la barra de progreso
  // a 0 y cambio el icono para empezar a reproducir.
  if (vid.currentTime == vid.duration) {
    console.log("fin del video");
    porcentaje = 0;
    document.querySelector(".barra2").style.width = `${porcentaje}%`;
    document.querySelector(".play").src = "./images/play.svg";
  }
};
// amb aquesta funció transformo els milisegons que rebo per
// parametres i retorno minuts i segons en format 00 : 00
// per parametres rebem els milisegons de la data actual i la duració del video
let conversion = (segundos) => {
  let progresoVideo = new Date(segundos * 1000);
  // si el numero de segons es menor que nou, concatenem un 0 per simular 2 digits
  let segundo =
    progresoVideo.getSeconds() <= 9
      ? "0" + progresoVideo.getSeconds()
      : progresoVideo.getSeconds();
  // si el numero de minuts es menor que nou, concatenem un 0 per simular 2 digits
  let minuto =
    progresoVideo.getMinutes() <= 9
      ? "0" + progresoVideo.getMinutes()
      : progresoVideo.getMinutes();
  // retornem la conversio milisegons en minuts i segons
  return `${minuto}:${segundo}`;
};

// interactuar amb algun punt de la barra de progres
let buscar = (e) => {
  let dondeHeHechoClick = e.offsetX;
  console.log(dondeHeHechoClick);
  //necesito saber el ancho de la barra enel navegador
  let anchoNavegador = document.querySelector(".barra1").offsetWidth;
  console.log(anchoNavegador);
  //Ahora volveromos a calcular el porcentaje en referencia a la barra
  let porcentaje = (100 * dondeHeHechoClick) / anchoNavegador;
  console.log(porcentaje);
  // Este porcentaje lo convertiremos en segundos. Con flor, quitaremos
  // los decimales
  let posicion = Math.floor(vid.duration * (porcentaje / 100));
  // Finalmente le diremos al video que vaya a la posicion(en milisegundos) resultante
  vid.currentTime = posicion;
};

// velocidad de reproduccio del video
let velocidad = () => {
  let velocidades = [0.2, 0.5, 1, 2, 4];
  speed++;
  if (speed >= velocidades.length) {
    speed = 0;
  }
  vid.playbackRate = velocidades[speed];
};
