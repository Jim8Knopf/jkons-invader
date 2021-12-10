// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
	getDatabase,
	ref,
	set,
	onValue,
	DataSnapshot,
} from "firebase/database";
import { getPlayers } from "./gameObjects";

let lifeElement: HTMLOutputElement = <HTMLOutputElement>(
	document.getElementById("live")
);
let scoreElement = <HTMLOutputElement>document.getElementById("score");
let scoreboardElement = <HTMLTableElement>document.getElementById("scoreboard");
let saveUserButtonElement = <HTMLButtonElement>(
	document.getElementById("saveUser")
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
const app = initializeApp(firebaseConfig);

interface UserScore {
	username: string;
	score: number;
	life: string;
}

saveUserButtonElement.addEventListener("click", () => saveUserScore());
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
	const db = getDatabase();

	set(ref(db, "userScores/" + user_uid), {
		username: _getUsername(),
		score,
		life: lifeElement.value,
	}).then(function () {
		loadScoreboard();
	});
}

export function loadScoreboard() {
	const userScores: Array<UserScore> = [];
	const db = getDatabase();
	const userScoreRef = ref(db, "userScores/");

	onValue(userScoreRef, (snapshot) => {
		snapshot.forEach((userScoreDB) => {
			userScores.push(userScoreDB.val());
		});

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

let form = <HTMLFormElement>document.getElementById("enterUsername");
export function displayForm() {
	form.style.display = "flex";
}

export function vanishForm() {
	form.style.display = "none";
}

// * get user uid
let user_uid: string;
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
		user_uid = user.uid;
	}
});
/**
 * the getter function for the score variable
 * @returns score
 */
export function getScore(): number {
	return score;
}
