import template from './hp-bars.template';
import './hp-bars.css';
import openSpellsModal from '../../components/modal-dialog/choose-spell/choose-spell';
import { mute, unmute } from '../../helpers/sound';
import { SPACE, ArrowDown } from '../../helpers/utils';

export default function drawHPbars() {
  document.body.insertAdjacentHTML('beforeend', template);

  const magicButton = document.querySelector('.do-magic');

  magicButton.addEventListener('click', openSpellsModal);
  document.body.addEventListener('keydown', (e) => {
    if (e.keyCode === SPACE && document.querySelector('canvas')) {
      magicButton.click();
    }
  });

  const soundButton = document.querySelector('.sound');
  soundButton.addEventListener('click', () => {
    const elems = document.getElementsByTagName('audio');
    soundButton.classList.toggle('muted');
    if (!!elems[0].muted === true) {
      [].slice.call(elems).forEach(audio => unmute(audio));
    } else {
      [].slice.call(elems).forEach(audio => mute(audio));
    }
  });
  window.addEventListener('keydown', (e) => {
    if (e.keyCode === ArrowDown && document.querySelector('canvas')) {
      soundButton.click();
    }
  });
}
