import './victory-modal.css';
import { ENTER } from '../../../helpers/utils';

const template = `
  <div class="overlay"></div>
  <div class='victory-modal'>
    <p>Ты победил! Пора сразиться со следующим монстром</p>
    <button class="victory-ready">Я готов!</button>
  </div>
`;

function drawVictoryModal() {
  document.body.insertAdjacentHTML('beforeend', template);
}

function removeVictoryModal() {
  document.querySelector('.victory-modal').remove();
}

export default function openVictoryModal() {
  drawVictoryModal();
  const victoryButton = document.querySelector('.victory-ready');
  victoryButton.addEventListener('click', removeVictoryModal);
  document.querySelector('.victory-modal').addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode === ENTER) {
      victoryButton.click();
    }
  });
}
