import './defeat-modal.css';

const template = `
  <div class="overlay"></div>
  <div class='defeat-modal'>
    <p>Ты проиграл! Рождество теперь не наступит. Никогда...</p>
    <button class="show-records">Показать рекорды</button>
    <button class="go-to-menu">Вернуться в меню</button>
  </div>
`;

export default function openDefeatModal() {
  document.body.insertAdjacentHTML('beforeend', template);
}
