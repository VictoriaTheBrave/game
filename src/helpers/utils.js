const ENTER = 13;
const ESCAPE = 27;
const SPACE = 32;
const Backspace = 8;
const ArrowDown = 40;
const ArrowUp = 38;
const attackPoints = 25;
const localStorageObj = [];

let answer;
let playerHP;
let monsterHP;
let score;
let round;
let playerName;

export function showMessage(str) {
  document.body.insertAdjacentHTML('beforeend', `<p>${str}</p>`);
  setTimeout(() => document.querySelector('body > p').remove(), 2000);
}

function getRandomNum(ar) {
  return Math.floor(Math.random() * ar.length);
}

function setAnswer(boolean) {
  answer = boolean;
}

function getAnswer() {
  return answer;
}

function setPlayerHP(num) {
  playerHP = num;
}

function getPlayerHP() {
  return playerHP;
}

function setMonsterHP(num) {
  monsterHP = num;
}

function getMonsterHP() {
  return monsterHP;
}

function setScore(num) {
  score = num;
}

function getScore() {
  return score;
}

function setRound(num) {
  round = num;
}

function getRound() {
  return round;
}

function setPlayerName(str) {
  playerName = str;
}

function getPlayerName() {
  return playerName;
}

export {
  ENTER,
  ESCAPE,
  SPACE,
  ArrowDown,
  ArrowUp,
  Backspace,
  attackPoints,
  localStorageObj,
  getRandomNum,
  setAnswer,
  getAnswer,
  setPlayerHP,
  getPlayerHP,
  setMonsterHP,
  getMonsterHP,
  setScore,
  getScore,
  setRound,
  getRound,
  setPlayerName,
  getPlayerName,
};
