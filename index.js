// La funcio inicio() es crida immediatament després
// que el navegador carregui l'objecte.
window.onload = inicio;

function inicio() {
  var vid = document.querySelectorAll("video");
  // actualitzacion continua del tiempo - funcio actualitzarTemps
  // actualitzacio del temps quan carreguem el video- actualitza
  // el temps de ala durada del video i evitara el NaN
  vid.onloadeddata = actualitzarTemps;
  vid.ontimeupdate = actualitzarTemps;
  actualitzarTemps(vid);

  document.getElementById("reproductor1").style.transform = "scale(1.0)";
  document.getElementById("reproductor2").style.transform = "scale(1.0)";
}

class Video {
  constructor(id) {
    this.dom = document.querySelectorAll(`.video--${id}`);
    this.domAll = document.querySelectorAll("video");

    console.log(this.dom);
    console.log(this.domAll);
  }
  // Play/Pause reproductor "simple"
  play() {
    for (let i = 0; i < this.dom.length; i++) {
      if (this.dom[i].paused) {
        this.dom[i].play();
        document.querySelector(".play").src = "./images/pause-outline.svg";
      } else {
        this.dom[i].pause();
        document.querySelector(".play").src = "./images/play.svg";
      }
    }
  }

  // Play/Pause ambdos reproductos
  playAll() {
    for (let i = 0; i < this.domAll.length; i++) {
      if (this.domAll[i].paused) {
        this.domAll[i].play();
        document.querySelector(".play").src = "./images/pause-outline.svg";
      } else {
        this.domAll[i].pause();
        document.querySelector(".play").src = "./images/play.svg";
      }
    }
  }
}

let reproductor1 = new Video("1");
let reproductor2 = new Video("2");
let reproductor = new Video("video");

// funciones que afectan a la BARRA DE PROGRESO
let actualitzarTemps = (vid) => {
  for (i = 0; i < vid.length; i++) {
    // mostramos tiempo y durada del video
    document.getElementById("estado1").innerHTML = `${conversion(
      vid[i].currentTime
    )}     /    ${conversion(vid[i].duration)}`;
  }
};
// amb aquesta funció transformo els milisegons que rebo per
// parametres i retorno minuts i segons en format 00 : 00
// per parametres rebem els milisegons de la data actual i la duració del video

function conversion(segundos) {
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
}

// funcion expandir / contraer video
expandir1 = () => {
  let seccio1 = document.getElementById("reproductor1");
  let seccio2 = document.getElementById("reproductor2");
  // Accedim a transform (propietat CSS)
  if (seccio1.style.transform == "scale(1)") {
    // si esta en 0.6 la canviem a 1 i modifiquem icona
    seccio1.style.transform = "scale(1.2)";
    seccio2.style.transform = "scale(0.5)";
    document.querySelector(".expandir").src = "./images/reducir.svg";
  } else {
    seccio1.style.transform = "scale(1)";
    seccio2.style.transform = "scale(1)";

    document.querySelector(".expandir").src =
      "./materials/botoPrioritzarPantalla.png";
  }
};
expandir2 = () => {
  let seccio1 = document.getElementById("reproductor1");
  let seccio2 = document.getElementById("reproductor2");
  // Accedim a transform (propietat CSS)
  if (seccio2.style.transform == "scale(1)") {
    // si esta en 0.6 la canviem a 1 i modifiquem icona
    seccio2.style.transform = "scale(1.2)";
    seccio1.style.transform = "scale(0.5)";

    document.querySelector(".expandir").src = "./images/reducir.svg";
  } else {
    seccio2.style.transform = "scale(1)";
    seccio1.style.transform = "scale(1)";

    document.querySelector(".expandir").src =
      "./materials/botoPrioritzarPantalla.png";
  }
};
