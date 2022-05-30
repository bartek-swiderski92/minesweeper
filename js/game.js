import { Cell } from './Cell.js'
import { UI } from './UI.js'

class Game extends UI {

    #config = {
        easy: {
            rows: 8,
            cols: 8,
            mines: 10
        },
        medium: {
            rows: 16,
            cols: 16,
            mines: 40
        },
        expert: {
            rows: 30,
            cols: 16,
            mines: 99
        }
    }

    #numberOfRows = null;
    #numberOfCols = null;
    #numberOfMines = null;

    #cells = [];

    #board = null;

    initializeGame() {
        this.#handleElements();
        this.#newGame();
    };


    #newGame(rows = this.#config.easy.rows, cols = this.#config.easy.cols, mines = this.#config.easy.mines) {
        this.#numberOfCols = rows;
        this.#numberOfRows = cols;
        this.#numberOfMines = mines;

        this.#setStyles();

        this.#generateCells();
        this.#renderBoard();
    }

    #handleElements() {
        this.#board = this.getElement(this.UiSelectors.board);
    }

    #generateCells() {
        for (let row = 0; row < this.#numberOfRows; row++) {
            this.#cells[row] = []
            for (let col = 0; col < this.#numberOfCols; col++) {
                this.#cells[row].push(new Cell(col, row))
            }
        }
    }

    #renderBoard() {
        this.#cells.flat().forEach((cell) => {
            this.#board.insertAdjacentHTML('beforeend', cell.createElement());
            cell.element = cell.getElement(cell.selector);
        });
    }
    #setStyles() {
        document.documentElement.style.setProperty('--cells-in-row', this.#numberOfCols)
    }
}


window.onload = function () {
    const game = new Game();
    game.initializeGame();
}