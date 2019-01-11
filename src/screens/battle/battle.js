import {
  attackPoints,
  setPlayerHP,
  getPlayerHP,
  setMonsterHP,
  getMonsterHP,
  setScore,
  getScore,
  getPlayerName,
  localStorageObj,
} from '../../helpers/utils';
import Sound from '../../helpers/sound';
import backgroundSound from './img/background.mp3';
import santaLaughSound from './img/santa.mp3';
import monsterLaughSound from './img/monster.mp3';
import './battle.css';
import drawPlayerIdle from './player/draw-player-idle';
import { drawMonsterIdle, createNewMonster } from './monster/draw-monster-idle';
import drawHPbars from './hp-bars';
import openVictoryModal from '../../components/modal-dialog/victory/victory-modal';
import openDefeatModal from '../../components/modal-dialog/defeat/defeat-modal';

function reset() {
  setPlayerHP(100);
  setMonsterHP(100);
  setScore(0);
}

function drawScore(canvas) {
  const context = canvas.getContext('2d');
  const scoreText = `Счёт: ${getScore()}`;
  context.clearRect(0, 0, window.innerWidth, 150);

  context.fillStyle = '#f42323';
  context.font = '5rem Lobster, cursive';
  context.shadowColor = '#4c0300';
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;

  context.fillText(
    scoreText, (window.innerWidth - context.measureText(scoreText).width) / 2, 100,
  );
}

function draw(canvas) {
  drawPlayerIdle(canvas);
  createNewMonster(canvas);
  drawMonsterIdle(canvas);
  drawScore(canvas);
  drawHPbars();
}

function loadSounds() {
  // eslint-disable-next-line no-unused-vars
  const santaLaugh = new Sound(santaLaughSound);
  document.querySelector('audio:last-child').classList.add('santa-laugh');
  // eslint-disable-next-line no-unused-vars
  const monsterLaugh = new Sound(monsterLaughSound);
  document.querySelector('audio:last-child').classList.add('monster-laugh');
}

async function handleMonsterDeath(canvas) {
  await setMonsterHP(100);
  await openVictoryModal();
  document.querySelector('.victory-ready').addEventListener('click', () => {
    createNewMonster(canvas);
    document.querySelector('.monster-hp div').style.width = '100%';
  });
}

async function handlePlayerDeath() {
  const currentPlayerResult = {
    name: getPlayerName(),
    score: getScore(),
  };
  localStorageObj.push(currentPlayerResult);
  await openDefeatModal();
}

async function handleRightAnswer(canvas) {
  setMonsterHP(getMonsterHP() - attackPoints);
  await setScore(getScore() + attackPoints);
  document.querySelector('.monster-hp div').style.width = await `
    ${+document.querySelector('.monster-hp div').style.width.replace(/\D/g, '') - attackPoints}%
  `;
  await drawScore(canvas);
  if (getMonsterHP() === 0) {
    handleMonsterDeath(canvas);
  }
}

async function handleWrongAnswer() {
  setPlayerHP(getPlayerHP() - attackPoints);
  document.querySelector('.player-hp div').style.width = `
    ${+document.querySelector('.player-hp div').style.width.replace(/\D/g, '') - attackPoints}%
  `;
  if (getPlayerHP() === 0) {
    handlePlayerDeath();
  }
}

function handleAnswer(canvas) {
  document.querySelector('.santa-laugh').addEventListener('ended', () => {
    handleRightAnswer(canvas);
  });
  document.querySelector('.monster-laugh').addEventListener('ended', () => {
    handleWrongAnswer();
  });
}

function gameLoop(canvas) {
  draw(canvas);
  handleAnswer(canvas);
}

export default function startBattle() {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const backgroundMusic = new Sound(backgroundSound, true);
  backgroundMusic.play();
  loadSounds();
  reset();
  gameLoop(canvas);
}
