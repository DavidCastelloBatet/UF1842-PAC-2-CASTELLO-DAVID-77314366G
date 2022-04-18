// La funcio inicio() es crida immediatament després
// que el navegador carregui l'objecte.
window.onload = inicio;

function inicio() {
  // actualitzacion continua del tiempo - funcio actualitzarTemps
  actualitzarTemps("1");
  actualitzarTemps("2");

  // actualitzacio del temps quan carreguem el video- actualitza
  // el temps de ala durada del video i evitara el NaN
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
function actualitzarTemps(numVideo) {
  var vid1 = document.querySelector("#video1 video");
  var vid2 = document.querySelector("#video2 video");

  console.log(vid1);
  console.log(numVideo); // el numero de video entra correcte
  // mostramos tiempo y durada del video
  let videoObtingut = `vid${numVideo}`;
  console.log(videoObtingut);
  document.querySelector(`.estado${numVideo}`).innerHTML = `${conversion(
    videoObtingut.currentTime
  )} / ${conversion(videoObtingut.duration)}`;
}
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
