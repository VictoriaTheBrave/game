import {
  ENTER,
  getRandomNum,
  setAnswer,
  showMessage,
} from '../../helpers/utils';

let currentTask;

export function draw(jsonObj) {
  currentTask = getRandomNum(jsonObj.tasks);
  const template = `
    <section class='task-window'>
      <div class='task'>
        <p class='task-description'>${jsonObj.description}</p>
        <div class='task-body'>
          <p>${jsonObj.tasks[currentTask].body}</p>
          <input type='text' minlength='1' autofocus tabindex="1">
          <button>Готово!</button>
        </div>
      </div>
    </section>
  `;
  document.body.insertAdjacentHTML('beforeend', template);
}

function remove() {
  document.querySelector('.task-window').remove();
}

export function addListeners(jsonObj) {
  const playerAnswer = document.querySelector('.task-body input');
  const answerVerification = document.querySelector('.task-body button');
  playerAnswer.addEventListener('keypress', playerAnswer.focus());
  answerVerification.addEventListener('click', () => {
    let message;
    if (playerAnswer.value === jsonObj.tasks[currentTask].solution) {
      setAnswer(true);
      message = 'Правильно!';
      document.querySelector('.santa-laugh').play();
    } else {
      setAnswer(false);
      message = 'Ты не прав:(';
      document.querySelector('.monster-laugh').play();
    }
    remove();
    showMessage(message);
  });
  document.querySelector('.task-body input').addEventListener('keydown', (e) => {
    if (e.keyCode === ENTER) {
      answerVerification.click();
    }
  });
}
