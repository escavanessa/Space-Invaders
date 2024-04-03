import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

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


    currenDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1;
    defaultYVelocity = 1;

    constructor(canvas) {
        this.canvas = canvas;
        this.createEnemies();
    }

    draw(ctx) {
        this.updateVelocityAndDirection()
        this.drawEnemies(ctx);
    }

    updateVelocityAndDirection() {
        for(const enemyRow of this.enemyRows) {
            if(this.currenDirection == MovingDirection.right) {
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostEnemy = enemyRow[enemyRow.length -1];
                if(rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width){
                    this.currenDirection = MovingDirection.downLeft;
                    break;
                }
            }
        }
    }
    //tells each enemy to draw itself
    drawEnemies(ctx) {
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity)
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