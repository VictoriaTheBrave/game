import { ENTER, ESCAPE, setPlayerName } from '../../../helpers/utils';
import template from './choose-player-name.template';
import './choose-player-name.css';
import startBattle from '../../../screens/battle/battle';

function removeModalPlayerName() {
  document.querySelector('.modal-player-name').remove();
}

function removeMenu() {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
}

export default function openModalPlayerName() {
  document.body.insertAdjacentHTML('beforeend', template);
  const verifyPlayer = document.querySelector('.verify-player-name');
  const closeModalPlayerName = document.querySelector('.close-player-name');
  const inputName = document.querySelector('.choose-player-name input');
  window.onkeypress = () => inputName.focus();

  verifyPlayer.addEventListener('click', () => {
    if (inputName.value.length > 0 && inputName.value.length < 16) {
      setPlayerName(`Санта ${inputName.value}`);
      removeMenu();
      startBattle();
    }
  });
  document.querySelector('.player-name').addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode === ENTER) {
      verifyPlayer.click();
    }
  });

  closeModalPlayerName.addEventListener('click', () => removeModalPlayerName());
  document.querySelector('.player-name').addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode === ESCAPE) {
      closeModalPlayerName.click();
    }
  });
}
