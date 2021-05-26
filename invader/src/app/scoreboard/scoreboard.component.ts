import { Component, OnInit } from '@angular/core';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// import { getPlayers } from "";
import 'firebase/database';

export interface UserScore {
  username: string;
  score: number;
  life: string;
}

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  score: number = 0;
  life: number = 3;
  nextLive: number = 10;

  // Your web app's Firebase configuration
  firebaseConfig = {
    apiKey: 'AIzaSyBZ53WGjhr1SnVr_86NkPD8krwnHlC2PVY',
    authDomain: 'jkioins-invader.firebaseapp.com',
    projectId: 'jkioins-invader',
    storageBucket: 'jkioins-invader.appspot.com',
    messagingSenderId: '811260413997',
    appId: '1:811260413997:web:4b0c3be03da20b4e2410a4',
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL:
      'https://jkioins-invader-default-rtdb.europe-west1.firebasedatabase.app',
  };
  constructor() {}

  ngOnInit(): void {
    // Initialize Firebase
    firebase.initializeApp(this.firebaseConfig);
    this.loadScoreboard();
    // TODO
    // form.addEventListener('submit', () => saveUserScore());
  }

  countScore() {
    this.score++;
    this._reward();
  }

  resetScore() {
    this.score = 0;
  }

  saveUserScore() {
    // TODO
    // this.vanishForm();
    firebase
      .database()
      .ref('userScores')
      .push()
      .set({
        username: this._getUsername(),
        score: this.score,
        life: this.life,
      })
      .then(
        function (snapshot) {
          // success(); // some success method
          snapshot.loadScoreboard();
        },
        function (error) {
          console.log('error' + error);
          // error(); // some error method
        }
      );
  }

  loadScoreboard() {
    let userScores: Array<UserScore> = [];

    firebase
      .database()
      .ref('userScores')
      .once('value')
      .then((snapshot) => {
        let userScoreDB: { [key: string]: UserScore } = snapshot.val();
        for (const score in userScoreDB) {
          userScores.push(userScoreDB[score]);
        }

        userScores.sort((a, b) => {
          return b.score - a.score;
        });

        this.updateScoreboardWithData(userScores);
      });
  }

  updateScoreboardWithData(userScore: UserScore[]) {
    const newTable = document.createElement('table');
    for (let i = 0; i < userScore.length; i++) {
      let newRow = newTable.insertRow(-1);

      let placeNumberText = document.createTextNode(`${i + 1}.`);
      let usernameText = document.createTextNode(userScore[i].username);
      let scoreText = document.createTextNode(userScore[i].score.toString());
      let lifeText = document.createTextNode(
        userScore[i].life != null ? userScore[i].life?.toString() : ''
      );

      newRow.insertCell(0).appendChild(placeNumberText);
      newRow.insertCell(1).appendChild(usernameText);
      newRow.insertCell(2).appendChild(scoreText);
      newRow.insertCell(3).appendChild(lifeText);
    }
    // TODO
    // scoreboardElement.innerHTML = newTable.innerHTML;
  }

  _reward() {
    if (this.nextLive === this.score) {
      console.log('reward');
      this.nextLive += this.nextLive;
      // TODO
      // getPlayers().forEach((player) => {
      //   player.addLife();
      // });
    }
  }

  _getUsername() {
    let usernameInput = <HTMLInputElement>document.getElementById('username');
    return usernameInput.value;
  }

  // TODO
  // displayForm() {
  //   form.style.display = 'flex';
  // }

  // vanishForm() {
  //   form.style.display = 'none';
  // }

  /**
   * the getter function for the score variable
   * @returns score
   */
  getScore(): number {
    return this.score;
  }
}
