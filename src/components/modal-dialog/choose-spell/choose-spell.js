import template from './choose-spell.template';
import './choose-spell.css';
import openTaskScreen from '../../tasks/task';

function drawSpellsModal() {
  document.body.insertAdjacentHTML('beforeend', template);
}

function removeSpellsModal() {
  document.querySelector('.modal-choose-spell').remove();
}

export default function openSpellsModal() {
  drawSpellsModal();
  document.querySelector('.spell-buttons').addEventListener('click', (e) => {
    if (e.target.className === 'spell-buttons') return;
    removeSpellsModal();
    openTaskScreen(e.target.className);
  });
}
