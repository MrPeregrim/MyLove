// Firebase SDK

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
getFirestore
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {
getStorage
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

/*
ЗАМЕНИ НА СВОИ ДАННЫЕ
ИЗ FIREBASE CONSOLE
*/

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain:
"YOUR_PROJECT.firebaseapp.com",

projectId:
"YOUR_PROJECT_ID",

storageBucket:
"YOUR_PROJECT.appspot.com",

messagingSenderId:
"000000000000",

appId:
"YOUR_APP_ID"

};

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

const storage =
getStorage(app);

export {
db,
storage
};