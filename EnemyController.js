import Enemy from "./Enemy.js";

export default class EnemyController {
    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ];

      enemyRows = [];

    constructor(canvas) {
        this.canvas = canvas;
        this.createEnemies();
    }

    draw(ctx) {
        this.drawEnemies(ctx);
    }
    //tells each enemy to draw itself
    drawEnemies(ctx) {
        this.enemyRows.flat().forEach((enemy) => {
            enemy.draw(ctx)
        })
    }

    createEnemies() {
        //added the same number of rows in enemy map to the enemy row array.
        //this sort of just recreates the tilemap with the enemy object injected into it and 
        //injects it inside the enemy rows array and then adds some spacing - I THINK
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if(enemyNumber > 0) {
                    this.enemyRows[rowIndex].push(new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber))
                }
            })
        })
    }
}