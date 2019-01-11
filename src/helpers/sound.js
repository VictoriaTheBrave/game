export default class Sound {
  constructor(src, loop = false) {
    this.Sound = document.createElement('audio');
    this.Sound.src = src;
    this.Sound.volume = 0.15;
    this.Sound.setAttribute('preload', 'auto');
    if (loop) this.Sound.setAttribute('loop', 'loop');
    this.Sound.setAttribute('controls', 'none');
    this.Sound.setAttribute('muted', 'false');
    this.Sound.style.display = 'none';
    document.body.appendChild(this.Sound);

    this.play = () => {
      this.Sound.play();
    };
  }
}

export function mute(audio) {
  const muted = audio;
  muted.muted = true;
}

export function unmute(audio) {
  const unmuted = audio;
  unmuted.muted = false;
}
