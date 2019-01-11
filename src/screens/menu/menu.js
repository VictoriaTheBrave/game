import template from './menu.template';
import { ENTER, ArrowUp } from '../../helpers/utils';
import './menu.css';
import openModalPlayerName from '../../components/modal-dialog/choose-player-name/choose-player-name';
import drawRecordsModal from '../../components/modal-dialog/records-table/records-table';
import drawAbout from '../about/about';

export default class Menu {
  static draw() {
    document.body.insertAdjacentHTML('beforeend', template);
  }

  static newGame() {
    openModalPlayerName();
  }

  static showRecords() {
    document.body.addEventListener('click', (e) => {
      if (e.target === document.querySelector('.show-records')) {
        drawRecordsModal();
      }
    });

    document.querySelector('.show-records').addEventListener('keydown', (e) => {
      if (e.keyCode === ENTER) document.querySelector('.show-records').click();
    });

    document.body.addEventListener('keydown', (e) => {
      if (e.keyCode === ArrowUp && document.querySelector('canvas')) {
        document.querySelector('.show-records').click();
      }
    });


    document.body.addEventListener('click', (e) => {
      if (e.target === document.querySelector('.close-records')) {
        document.querySelector('.modal-records').remove();
      }
    });

    document.body.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && document.querySelector('.modal-records')) {
        document.querySelector('.modal-records').remove();
      }
    });
  }

  static showAbout() {
    drawAbout();
  }

  static resetBody() {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  }

  static goToMenu() {
    Menu.resetBody();
    Menu.draw();
  }
}
