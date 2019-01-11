import idle from './img/idle.png';
import { getPlayerName } from '../../../helpers/utils';

export default function drawPlayerIdle(canvas) {
  let santaIdle;
  const santaIdleImg = new Image();
  santaIdleImg.src = idle;

  function santaIdleAnimate() {
    window.requestAnimationFrame(santaIdleAnimate);
    santaIdle.update();
    santaIdle.render();
  }

  function playerFromSprite(options) {
    const that = {};
    const numberOfFrames = options.numberOfFrames || 1;
    const ticksPerFrame = options.ticksPerFrame || 0;
    let frameIndex = 0;
    let tickCount = 0;

    that.context = options.context;
    that.name = options.name;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.render = () => {
      that.context.clearRect(0, 0, window.innerWidth / 2 - 200, window.innerHeight);
      // that.context.clearRect(140, 170, 300, 70);

      that.context.fillStyle = '#f42323';
      that.context.font = '3.5rem Lobster, cursive';
      that.context.shadowColor = '#4c0300';
      that.context.shadowOffsetX = 2;
      that.context.shadowOffsetY = 2;
      that.context.shadowBlur = 2;
      that.context.fillText(that.name, 140, 170);

      that.context.drawImage(
        that.image,
        frameIndex * that.width / numberOfFrames,
        0,
        that.width / numberOfFrames,
        that.height,
        70,
        450,
        that.width / numberOfFrames * 2 / 3,
        that.height * 2 / 3,
      );
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

  santaIdle = playerFromSprite({
    context: canvas.getContext('2d'),
    name: getPlayerName(),
    width: 14944,
    height: 641,
    image: santaIdleImg,
    numberOfFrames: 16,
    ticksPerFrame: 6,
  });

  santaIdleImg.addEventListener('load', santaIdleAnimate);
}
