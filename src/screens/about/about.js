import template from './about.template';
import './about.css';
import { ESCAPE } from '../../helpers/utils';
// eslint-disable-next-line import/no-unresolved
import * as Screenshots from './img';

function loadScreenshots(obj) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const img = document.createElement('img');
    img.src = obj[keys[i]];
    img.onload = () => {
      document.querySelector('.about-screenshots').appendChild(img);
    };
  }
}

export default function drawAbout() {
  document.body.insertAdjacentHTML('beforeend', template);
  loadScreenshots(Screenshots);
  document.body.addEventListener('keydown', (e) => {
    if (e.keyCode === ESCAPE && document.querySelector('.about')) {
      document.querySelector('.about').remove();
    }
  });
}
