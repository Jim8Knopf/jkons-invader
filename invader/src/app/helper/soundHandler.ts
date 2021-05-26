let audioType: string;
let audio = new Audio();

if (audio.canPlayType('audio/mp3')) {
  audioType = '.mp3';
} else {
  audioType = '.wav';
}

const _titleTheme = new Audio('assets/sounds/title_theme' + audioType);
_titleTheme.loop = true;
_titleTheme.volume = 0.05;

export function playTitleTheme() {
  _titleTheme.play();
}

export function stopTitleTheme() {
  _titleTheme.pause();
  _titleTheme.currentTime = 0;
}

const _gameOverMusic = new Audio('assets/sounds/game_over' + audioType);
_gameOverMusic.volume = 0.05;

export function playGameOverMusic() {
  _gameOverMusic.play();
}

export function stopGameOverMusic() {
  _gameOverMusic.pause();
  _gameOverMusic.currentTime = 0;
}

const _shotSFX: HTMLAudioElement = new Audio(
  'assets/sounds/laser' + audioType
) as HTMLAudioElement;
_shotSFX.volume = 0.015;

export function playShotSound() {
  _shotSFX.play();
}

export function playEnemyDeadSound() {
  let enemyDeadSFX: HTMLAudioElement = new Audio(
    'assets/sounds/enemy_dead' + audioType
  ) as HTMLAudioElement;
  enemyDeadSFX.volume = 0.015;
  enemyDeadSFX.play();
}

export function playHitSound() {
  let hitSFX: HTMLAudioElement = new Audio(
    'assets/sounds/hit' + audioType
  ) as HTMLAudioElement;
  hitSFX.volume = 0.015;
  hitSFX.play();
}
