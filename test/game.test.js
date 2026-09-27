/**
 * @jest-environment jsdom
 */
import {
  createBoard,
  createCharacter,
  getRandomDifferentIndex,
  moveCharacter,
} from '../src/js/game';

describe('Goblin game DOM logic', () => {
  let board;

  beforeEach(() => {
    board = document.createElement('div');
    document.body.appendChild(board);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('createBoard создаёт 16 клеток', () => {
    const cells = createBoard(board);
    expect(cells).toHaveLength(16);
    expect(board.children).toHaveLength(16);
  });

  test('createCharacter создаёт img-элемент', () => {
    const character = createCharacter('goblin.png');
    expect(character.tagName).toBe('IMG');
    expect(character.src).toContain('goblin.png');
  });

  test('getRandomDifferentIndex не возвращает текущий индекс', () => {
    for (let i = 0; i < 100; i += 1) {
      const idx = getRandomDifferentIndex(5, 16);
      expect(idx).not.toBe(5);
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(16);
    }
  });

  test('moveCharacter перемещает персонажа в другую клетку без removeChild', () => {
    const cells = createBoard(board);
    const character = createCharacter('goblin.png');
    cells[0].appendChild(character);
    expect(character.parentElement).toBe(cells[0]);

    const newIndex = moveCharacter(character, cells);
    expect(newIndex).not.toBe(0);
    expect(character.parentElement).toBe(cells[newIndex]);
    // персонаж по-прежнему один в DOM
    expect(document.querySelectorAll('.character')).toHaveLength(1);
  });
});