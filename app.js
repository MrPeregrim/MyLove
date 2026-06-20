import { db, storage }
from "./firebase.js";

import {

collection,
addDoc,
getDocs,
doc,
updateDoc,
increment

}
from
"https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {

ref,
uploadBytes,
getDownloadURL

}
from
"https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

/* ==========================
   СЧЁТЧИК ДНЕЙ
========================== */

const startDate =
new Date("2026-05-17");

function updateDays(){

const now =
new Date();

const diff =
now - startDate;

const days =
Math.floor(diff / 86400000);

const el =
document.getElementById(
"daysTogether"
);

if(el){

el.innerText =
days + " дней";

}

}

updateDays();

/* ==========================
   ФРАЗА ДНЯ
========================== */

const quotes = [

"Ты — лучшее, что случилось со мной ❤️",

"Ты мой дом ❤️",

"Любовь начинается с улыбки ❤️",

"С тобой каждый день особенный ❤️",

"Я выбираю тебя каждый день ❤️",

"Ты моё счастье ❤️"

];

const quoteEl =
document.getElementById(
"quoteOfDay"
);

if(quoteEl){

quoteEl.innerText =
quotes[
Math.floor(
Math.random() *
quotes.length
)
];

}

/* ==========================
   РОЗЫ
========================== */

const roseBtn =
document.getElementById(
"giveRoseBtn"
);

if(roseBtn){

roseBtn.addEventListener(
"click",
async ()=>{

const roseRef =
doc(
db,
"settings",
"roses"
);

await updateDoc(
roseRef,
{
count:
increment(1)
}
);

createPetals();

loadRoses();

});
}

async function loadRoses(){

const snapshot =
await getDocs(
collection(
db,
"settings"
)
);

snapshot.forEach(docu=>{

if(
docu.id === "roses"
){

document
.getElementById(
"rosesCounter"
)
.innerText =
docu.data().count;

}

});
}

/* ==========================
   ЗАПИСКИ
========================== */

const sendBtn =
document.getElementById(
"sendNoteBtn"
);

if(sendBtn){

sendBtn.addEventListener(
"click",
async ()=>{

const text =
document
.getElementById(
"noteText"
)
.value;

if(!text) return;

await addDoc(
collection(
db,
"notes"
),
{
text,
createdAt:
Date.now()
}
);

loadNotes();

});
}

async function loadNotes(){

const container =
document.getElementById(
"notesContainer"
);

container.innerHTML = "";

const snapshot =
await getDocs(
collection(
db,
"notes"
)
);

snapshot.forEach(item=>{

const note =
document.createElement(
"div"
);

note.className =
"glass";

note.style.padding =
"25px";

note.innerHTML =
item.data().text;

container.appendChild(
note
);

});
}

/* ==========================
   СТИХИ
========================== */

const savePoemBtn =
document.getElementById(
"savePoemBtn"
);

if(savePoemBtn){

savePoemBtn.addEventListener(
"click",
async ()=>{

const title =
document
.getElementById(
"poemTitle"
)
.value;

const text =
document
.getElementById(
"poemText"
)
.value;

if(
!title ||
!text
) return;

await addDoc(
collection(
db,
"poems"
),
{
title,
text,
createdAt:
Date.now()
}
);

loadPoems();

});
}

async function loadPoems(){

const container =
document.getElementById(
"poemsContainer"
);

container.innerHTML = "";

const snapshot =
await getDocs(
collection(
db,
"poems"
)
);

snapshot.forEach(item=>{

const poem =
item.data();

const card =
document.createElement(
"div"
);

card.className =
"glass";

card.style.padding =
"25px";

card.innerHTML =

"<h3>"+poem.title+
"</h3><br><p>"+
poem.text+
"</p>";

container.appendChild(
card
);

});
}

/* ==========================
   ФОТО
========================== */

const upload =
document.getElementById(
"photoUpload"
);

if(upload){

upload.addEventListener(
"change",
async e=>{

for(const file of e.target.files){

const fileRef =
ref(
storage,
"photos/" +
Date.now() +
file.name
);

await uploadBytes(
fileRef,
file
);

const url =
await getDownloadURL(
fileRef
);

await addDoc(
collection(
db,
"photos"
),
{
url
}
);

}

loadPhotos();

});
}

async function loadPhotos(){

const gallery =
document.getElementById(
"galleryGrid"
);

gallery.innerHTML = "";

const snapshot =
await getDocs(
collection(
db,
"photos"
)
);

snapshot.forEach(item=>{

const img =
document.createElement(
"img"
);

img.src =
item.data().url;

img.style.width =
"100%";

img.style.height =
"350px";

img.style.objectFit =
"cover";

img.style.borderRadius =
"20px";

gallery.appendChild(
img
);

});
}

/* ==========================
   ЛЕПЕСТКИ
========================== */

function createPetals(){

for(
let i=0;
i<25;
i++
){

const petal =
document.createElement(
"div"
);

petal.innerHTML =
"🌹";

petal.style.position =
"fixed";

petal.style.left =
Math.random()*100+"vw";

petal.style.top =
"-50px";

petal.style.zIndex =
999999;

petal.style.fontSize =
"30px";

document.body
.appendChild(
petal
);

setTimeout(()=>{

petal.style.transition =
"6s linear";

petal.style.transform =
"translateY(120vh) rotate(720deg)";

petal.style.opacity =
"0";

},10);

setTimeout(()=>{
petal.remove();
},6000);

}
}

/* ==========================
   ЗАГРУЗКА
========================== */

loadPhotos();
loadPoems();
loadNotes();
loadRoses();