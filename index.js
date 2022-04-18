class Video {
  constructor(id) {
    this.dom = document.querySelector(`.video--${id}`);
    console.log(this.dom);
  }

  play() {
    if (this.dom.paused) {
      this.dom.play();
      document.querySelector(".play").src = "./images/pause-outline.svg";
    } else {
      this.dom.pause();
      document.querySelector(".play").src = "./images/play.svg";
    }
  }
}
let reproductor1 = new Video("1");
let reproductor2 = new Video("2");
let reproductor = new Video("1", "2");
