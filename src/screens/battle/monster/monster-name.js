import { getRandomNum } from '../../../helpers/utils';

const adjectives = ['Огромный', 'Кровожадный', 'Жуткий', 'Ужасный', 'Страшный', 'Чудовищный', 'Проклятый', 'Злобный', 'Макаронный', 'Чешуйчатый', 'Волосатый', 'Доисторический', 'Уродливый', 'Болотный', 'Безумный', 'Мерзкий', 'Пухлый', 'Прошлогодний', 'Неуклюжий', 'Противный'];
const nouns = ['снеговик', 'негодяй', 'подлец', 'мутант', 'уродец', 'зверь', 'выродок'];
const names = ['Алексий', 'Алфей', 'Еремей', 'Натан', 'Агний', 'Люборад', 'Святобой', 'Борщ', 'Доброжир', 'Гостомысл', 'Боян'];

export default function generateMonsterName() {
  const adjective = adjectives[getRandomNum(adjectives)];
  const noun = nouns[getRandomNum(nouns)];
  const name = names[getRandomNum(names)];
  return `${adjective} ${noun} ${name}`;
}
