import goblinImg from '../pic/goblin.png';

const BOARD_SIZE = 4;

/**
 * Создаёт игровое поле 4x4 и возвращает массив DOM-узлов клеток.
 */
export function createBoard(boardEl, size = BOARD_SIZE) {
  boardEl.innerHTML = '';
  const cells = [];
  for (let i = 0; i < size * size; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = String(i);
    boardEl.appendChild(cell);
    cells.push(cell);
  }
  return cells;
}

/**
 * Создаёт персонажа (img) и возвращает DOM-узел.
 */
export function createCharacter(src = goblinImg) {
  const img = document.createElement('img');
  img.src = src;
  img.className = 'character';
  img.alt = 'Гном';
  return img;
}

/**
 * Кладёт персонажа в случайную клетку.
 */
export function placeCharacter(character, cells) {
  const randomIndex = Math.floor(Math.random() * cells.length);
  cells[randomIndex].appendChild(character);
  return randomIndex;
}

/**
 * Возвращает случайный индекс клетки, отличный от текущего.
 */
export function getRandomDifferentIndex(currentIndex, cellsLength) {
  if (cellsLength <= 1) return currentIndex;
  let index;
  do {
    index = Math.floor(Math.random() * cellsLength);
  } while (index === currentIndex);
  return index;
}

/**
 * Перемещает персонажа в другую (не ту же самую) клетку.
 * Используем appendChild — узел сам сменит родителя, removeChild не нужен.
 */
export function moveCharacter(character, cells) {
  const currentParent = character.parentElement;
  const currentIndex = currentParent ? Number(currentParent.dataset.index) : -1;
  const nextIndex = getRandomDifferentIndex(currentIndex, cells.length);
  cells[nextIndex].appendChild(character);
  return nextIndex;
}

/**
 * Запускает игру: создаёт поле, персонажа и интервал перемещения.
 */
export function startGame() {
  const boardEl = document.getElementById('game-board');
  if (!boardEl) return null;

  const cells = createBoard(boardEl);
  const character = createCharacter();
  placeCharacter(character, cells);

  const intervalId = setInterval(() => {
    moveCharacter(character, cells);
  }, 1000);

  return { cells, character, intervalId };
}