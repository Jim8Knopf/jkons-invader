import { init } from "./helper/gameHelper";
import { getAuth, signInAnonymously } from "firebase/auth";
const auth = getAuth();
signInAnonymously(auth).then(() => {
	init();
});
