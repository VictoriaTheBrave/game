import Menu from './screens/menu/menu';
import './style.css';
import { ENTER, Backspace } from './helpers/utils';

function start() {
  Menu.draw();
  document.querySelector('#new-game').addEventListener('click', () => { Menu.newGame(); });
  document.querySelector('#new-game').addEventListener('keydown', (e) => {
    if (e.keyCode === ENTER) document.querySelector('#new-game').click();
  });

  Menu.showRecords();

  document.querySelector('#about').addEventListener('click', () => { Menu.showAbout(); });
  document.querySelector('#about').addEventListener('keydown', (e) => {
    if (e.keyCode === ENTER) document.querySelector('#about').click();
  });

  document.body.addEventListener('click', (e) => { if (e.target === document.querySelector('.go-to-menu')) Menu.goToMenu(); });
  document.body.addEventListener('keydown', (e) => { if (e.keyCode === Backspace) document.querySelector('.go-to-menu').click(); });
}

window.onload = () => {
  start();
};
