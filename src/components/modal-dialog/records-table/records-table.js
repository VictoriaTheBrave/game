import { localStorageObj } from '../../../helpers/utils';
import './records-table.css';

const _ = require('lodash');


export default async function drawRecordsModal() {
  _.sortBy(localStorageObj, o => o.score);

  const template = `
    <section class='modal-records'>
      <div class="overlay"></div>
      <div class='records'>
        <table>
          <thead>
            <tr>
              <td>№</td>
              <td>Имя игрока</td>
              <td>Счёт</td>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <button class="close-records">Закрыть</button>
      </div>
    </section>
  `;

  document.body.insertAdjacentHTML('beforeend', template);

  const tbody = document.querySelector('.records tbody');

  for (let i = 0; i < localStorageObj.length; i++) {
    const tmpl = `
      <tr>
        <td>${i + 1}</td>
        <td>${localStorageObj[i].name}</td>
        <td>${localStorageObj[i].score}</td>
      </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', tmpl);
  }
}
