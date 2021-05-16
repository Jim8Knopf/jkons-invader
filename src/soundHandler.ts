let audioType: string;
let audio = new Audio();

if (audio.canPlayType("audio/mp3")) {
	audioType = ".mp3";
} else {
	audioType = ".wav";
}

let titleTheme = new Audio(
	"assets/sounds/jkons-invader_title_theme" + audioType
);
titleTheme.loop = true;
titleTheme.volume = 0.05;
export function playTitleTheme() {
	titleTheme.play();
}

let shotSFX: HTMLAudioElement = new Audio(
	"assets/sounds/laser" + audioType
) as HTMLAudioElement;
shotSFX.volume = 0.015;
export function playShotSound() {
	shotSFX.play();
}
