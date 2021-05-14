import { Enemy } from "./enemy";
import { Player } from "./player";
import { EnemyHandler } from "./enemyHandler";
import { Shot } from "./shot";
import { GameSettings } from "./game-settings";
import { BehaviorSubject } from "rxjs";
const subject = new BehaviorSubject(23);
const canvas = (document.getElementById("jkonsInvader"));
const context = canvas.getContext("2d");
const enemyHandler = new EnemyHandler();
const settings = new GameSettings(canvas);
context.imageSmoothingEnabled = false;
subject.subscribe(console.log);
let shots = new Array();
let players = new Array();
let gameStarted = false;
let actualScore = 0;
let scoreElement = (document.getElementById("score"));
let animation;
let animationActive = true;
let animationSpeed = 1 / 60;
// ! Should not be, but dummy enemy for zoom and tile size, till game settings and tile config is created.
const player = newPlayer("a", "d", " ");
const enemy = new Enemy(context, shots, enemyHandler, 1, 0, 0);
const spaceBetween = settings.zoom * enemy.tileWidth;
export function init() {
    document.addEventListener("keyup", (keyboard) => {
        switch (keyboard.key) {
            case "r":
                if (gameStarted === false) {
                    gameStarted = true;
                    animate();
                }
                else {
                    init();
                }
                break;
            default:
                gameStarted = false;
                break;
        }
    });
}
for (let i = 0; i < 20; i++) {
    enemyHandler.addEnemy(new Enemy(context, shots, enemyHandler, settings.zoom, i * spaceBetween, 0));
}
export function gameOver() { }
function animate() {
    setTimeout(() => {
        player.handleInput();
        enemyHandler.moveEnemies();
        for (let j = 0; j < shots.length; j++) {
            shots[j].shootAnimation();
        }
        if (animationActive) {
            animation = requestAnimationFrame(animate);
        }
    }, animationSpeed);
}
export function score() {
    actualScore++;
    // scoreElement.value = actualScore.toString();
}
function newPlayer(left, right, fire) {
    const shot = new Shot(context);
    const player = new Player(context, shot, left, right, fire, settings.zoom);
    shots.push(shot);
    players.push(player);
    return player;
}
export function stop() {
    console.log("stop");
    animationActive = false;
    cancelAnimationFrame(animation);
    let fontsize = 160;
    let x = (canvas.width - fontsize * 5) / 2;
    let y = canvas.height / 2;
    context.font = `${fontsize}px Arial`;
    context.fillText("Game Over", x, y);
}
init();
//# sourceMappingURL=main.js.map