import * as Task from '../task-methods';
import jsonMath from './math.json';

export default async function drawMathTask() {
  await Task.draw(jsonMath);
  Task.addListeners(jsonMath);
}
