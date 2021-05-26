// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import { getPlayers } from "./gameObjects";
import "firebase/database";

let lifeElement: HTMLOutputElement = <HTMLOutputElement>(
	document.getElementById("live")
);
let scoreElement = <HTMLOutputElement>document.getElementById("score");
let scoreboardElement = <HTMLTableElement>document.getElementById("scoreboard");
let form: HTMLFormElement = <HTMLFormElement>(
	document.getElementById("enterUsername")
);

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBZ53WGjhr1SnVr_86NkPD8krwnHlC2PVY",
	authDomain: "jkioins-invader.firebaseapp.com",
	projectId: "jkioins-invader",
	storageBucket: "jkioins-invader.appspot.com",
	messagingSenderId: "811260413997",
	appId: "1:811260413997:web:4b0c3be03da20b4e2410a4",
	// For databases not in the us-central1 location, databaseURL will be of the
	// form https://[databaseName].[region].firebasedatabase.app.
	// For example, https://your-database-123.europe-west1.firebasedatabase.app
	databaseURL:
		"https://jkioins-invader-default-rtdb.europe-west1.firebasedatabase.app",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

interface UserScore {
	username: string;
	score: number;
	life: string;
}

form.addEventListener("submit", () => saveUserScore());

let score: number = 0;
let nextLive: number = 10;

export function countScore() {
	score++;
	_reward();
	scoreElement.value = score.toString();
}

export function resetScore() {
	score = 0;
	scoreElement.value = score.toString();
}

export function saveUserScore() {
	vanishForm();

	firebase
		.database()
		.ref("userScores")
		.push()
		.set({ username: _getUsername(), score, life: lifeElement.value })
		.then(
			function (snapshot) {
				// success(); // some success method
				loadScoreboard();
			},
			function (error) {
				console.log("error" + error);
				// error(); // some error method
			}
		);
}

export function loadScoreboard() {
	let userScores: Array<UserScore> = [];

	firebase
		.database()
		.ref("userScores")
		.once("value")
		.then((snapshot) => {
			let userScoreDB: { [key: string]: UserScore } = snapshot.val();
			for (const score in userScoreDB) {
				userScores.push(userScoreDB[score]);
			}

			userScores.sort((a, b) => {
				return b.score - a.score;
			});

			updateScoreboardWithData(userScores);
		});
}

function updateScoreboardWithData(userScore: UserScore[]) {
	const newTable = document.createElement("table");
	for (let i = 0; i < userScore.length; i++) {
		let newRow = newTable.insertRow(-1);

		let placeNumberText = document.createTextNode(`${i + 1}.`);
		let usernameText = document.createTextNode(userScore[i].username);
		let scoreText = document.createTextNode(userScore[i].score.toString());
		let lifeText = document.createTextNode(
			userScore[i].life != null ? userScore[i].life?.toString() : ""
		);

		newRow.insertCell(0).appendChild(placeNumberText);
		newRow.insertCell(1).appendChild(usernameText);
		newRow.insertCell(2).appendChild(scoreText);
		newRow.insertCell(3).appendChild(lifeText);
	}
	scoreboardElement.innerHTML = newTable.innerHTML;
}

function _reward() {
	if (nextLive === score) {
		console.log("reward");
		nextLive += nextLive;
		getPlayers().forEach((player) => {
			player.addLife();
		});
	}
	// scoreboardElement.innerHTML = newTable.innerHTML;
}

function _getUsername() {
	let usernameInput = <HTMLInputElement>document.getElementById("username");
	return usernameInput.value;
}

export function displayForm() {
	form.style.display = "flex";
}

export function vanishForm() {
	form.style.display = "none";
}

/**
 * the getter function for the score variable
 * @returns score
 */
export function getScore(): number {
	return score;
}
