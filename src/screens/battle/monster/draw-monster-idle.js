/* eslint-disable import/no-unresolved */
import * as Feet from './img/feet';
import * as Bodies from './img/bodies';
import * as Heads from './img/heads';
import * as Eyes from './img/eyes';
import * as BigBrows from './img/big-brows';
import * as SmallBrows from './img/small-brows';
import * as LeftHands from './img/left-hands';
import * as RightHands from './img/right-hands';

import generateMonsterName from './monster-name';

let monsterIdle;

export function drawMonsterIdle() {
  window.requestAnimationFrame(drawMonsterIdle);
  monsterIdle.update();
  monsterIdle.render();
}

function monsterFromParts(options) {
  const that = {};
  const numberOfFrames = options.numberOfFrames || 1;
  const ticksPerFrame = options.ticksPerFrame || 0;
  let frameIndex = 0;
  let tickCount = 0;

  that.context = options.context;
  that.name = options.name;
  that.width = options.width;
  that.height = options.height;
  that.generatedMonsterParts = options.generatedMonsterParts;
  that.x = options.x;
  that.y = options.y;

  that.defineEyesFrame = () => {
    const keys = Object.keys(that.generatedMonsterParts.eyes).sort();
    if (frameIndex < keys.length) {
      return that.generatedMonsterParts.eyes[keys[frameIndex]];
    }
    return that.generatedMonsterParts.eyes[keys[-frameIndex + 8]];
  };

  that.render = () => {
    that.context.clearRect(
      that.x - 270, 0, window.innerWidth - (that.x - 270), window.innerHeight,
    );

    that.context.fillStyle = '#f42323';
    that.context.font = '3.5rem Lobster, cursive';
    that.context.shadowColor = '#4c0300';
    that.context.shadowOffsetX = 2;
    that.context.shadowOffsetY = 2;
    that.context.shadowBlur = 2;

    that.context.fillText(
      that.name, window.innerWidth - that.context.measureText(that.name).width - 30, 170,
    );

    that.context.drawImage(that.generatedMonsterParts.rightHands, that.x, that.y + 390);
    that.context.drawImage(that.generatedMonsterParts.feet, that.x + 120, that.y + 575);
    that.context.drawImage(that.generatedMonsterParts.bodies, that.x + 95, that.y + 345);
    that.context.drawImage(that.generatedMonsterParts.feet, that.x + 220, that.y + 575);
    that.context.drawImage(that.generatedMonsterParts.heads, that.x + 35, that.y);
    that.context.drawImage(that.generatedMonsterParts.leftHands, that.x + 220, that.y + 415);
    const eyesFrame = that.defineEyesFrame();
    that.context.drawImage(
      eyesFrame, that.x + 90, that.y + 275,
      eyesFrame.width * 0.75,
      eyesFrame.height * 0.75,
    );
    that.context.drawImage(that.generatedMonsterParts.bigBrows, that.x + 165, that.y + 235);
    that.context.drawImage(that.generatedMonsterParts.smallBrows, that.x + 85, that.y + 277);
  };

  that.update = () => {
    tickCount += 1;
    if (tickCount > ticksPerFrame) {
      tickCount = 0;
      if (frameIndex < numberOfFrames - 1) {
        frameIndex += 1;
      } else {
        frameIndex = 0;
      }
    }
  };

  return that;
}

let totalResources = 25;

function resourceLoaded() {
  totalResources -= 1;
}

function loadMonsterParts(obj) {
  const loadedImgs = {};
  const keys = Object.keys(obj);
  keys.sort();
  for (let i = 0; i < keys.length; i++) {
    const img = new Image();
    img.src = obj[keys[i]];
    loadedImgs[keys[i]] = img;
    img.onload = () => {
      resourceLoaded();
    };
  }
  return loadedImgs;
}

function getAllMonsterParts() {
  const allMonsterParts = {};
  allMonsterParts.feet = loadMonsterParts(Feet);
  allMonsterParts.bodies = loadMonsterParts(Bodies);
  allMonsterParts.heads = loadMonsterParts(Heads);
  allMonsterParts.eyes = loadMonsterParts(Eyes);
  allMonsterParts.bigBrows = loadMonsterParts(BigBrows);
  allMonsterParts.smallBrows = loadMonsterParts(SmallBrows);
  allMonsterParts.leftHands = loadMonsterParts(LeftHands);
  allMonsterParts.rightHands = loadMonsterParts(RightHands);
  return allMonsterParts;
}

function generateMonsterParts() {
  const allMonsterParts = getAllMonsterParts();
  const monsterParts = {};
  const keys = Object.keys(allMonsterParts);
  for (let i = 0; i < keys.length; i++) {
    const onePartKeys = Object.keys(allMonsterParts[keys[i]]);
    if (keys[i] === 'eyes') {
      monsterParts.eyes = allMonsterParts.eyes;
    } else {
      monsterParts[keys[i]] = allMonsterParts[keys[i]][onePartKeys[Math.floor(Math.random()
          * onePartKeys.length)]];
    }
  }
  return monsterParts;
}


function awaitToLoadImages(canvas) {
  setTimeout(() => {
    if (totalResources === 0) {
      drawMonsterIdle(canvas);
    } else {
      awaitToLoadImages();
    }
  }, 10);
}

export function createNewMonster(canvas) {
  awaitToLoadImages(canvas);
  const monsterWidth = 320;
  const monsterHeight = 400;

  monsterIdle = monsterFromParts({
    context: canvas.getContext('2d'),
    name: generateMonsterName(),
    generatedMonsterParts: generateMonsterParts(),
    width: monsterWidth,
    height: monsterHeight,
    x: window.innerWidth - 70 * 3 - monsterWidth,
    y: 230,
    numberOfFrames: 9,
    ticksPerFrame: 15,
  });
  return monsterIdle;
}
