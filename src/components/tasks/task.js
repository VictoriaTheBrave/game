import './task.css';
import drawMathTask from './math/math';

export default function openTaskScreen(className) {
  if (className === 'math') drawMathTask();
}
