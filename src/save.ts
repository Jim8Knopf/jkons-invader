let scoreElement = <HTMLOutputElement>document.getElementById("score");
let scoreboardElement = <HTMLTableElement>document.getElementById("scoreboard");
let saveUserButtonElement = <HTMLButtonElement>(
	document.getElementById("saveUser")
);

interface UserScore {
	username: string;
	score: number;
}
const userScore: UserScore[] = [];
saveUserButtonElement.addEventListener("click", () => saveUserScore());
let score: number = 0;

export function countScore() {
	score++;
	scoreElement.value = score.toString();
}

if (!localStorage.getItem("scores")) {
	localStorage.setItem("scores", "[]");
}

export function saveUserScore() {
	vanishForm();
	const localStorageValue: string | null = localStorage.getItem("scores");
	let parsedLocalStorageValues: UserScore[];

	if (localStorageValue) {
		parsedLocalStorageValues = JSON.parse(localStorageValue);
		parsedLocalStorageValues.push({ username: getUsername(), score });
		localStorage.setItem("scores", JSON.stringify(parsedLocalStorageValues));
		loadScoreboard();
	}
}

export function loadScoreboard() {
	const localStorageValue: string | null = localStorage.getItem("scores");
	let parsedLocalStorageValues: UserScore[];

	if (localStorageValue) {
		parsedLocalStorageValues = JSON.parse(localStorageValue);
		parsedLocalStorageValues.sort((a, b) => b.score - a.score);

		for (let i = 0; i < parsedLocalStorageValues.length; i++) {
			let newRow = scoreboardElement.insertRow(-1);

			let placeNumberText = document.createTextNode(`${i + 1}.`);
			let usernameText = document.createTextNode(
				parsedLocalStorageValues[i].username
			);
			let scoreText = document.createTextNode(
				parsedLocalStorageValues[i].score.toString()
			);

			newRow.insertCell(0).appendChild(placeNumberText);
			newRow.insertCell(1).appendChild(usernameText);
			newRow.insertCell(2).appendChild(scoreText);
		}
	}
}

export function getUsername() {
	let usernameInput = <HTMLInputElement>document.getElementById("username");
	return usernameInput.value;
}

let form = <HTMLFormElement>document.getElementById("enterUsername");
export function displayForm() {
	form.style.display = "flex";
}

export function vanishForm() {
	form.style.display = "none";
}
