const admin = require("firebase-admin");
const camimFirebase = require("./config/camim_firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(camimFirebase),
});

const fs = admin.firestore();

// async function checkFirebase() {
//     // Configurar o Firestore
//

//     const fsAirConditioners = fs.collection('environments').doc('production').collection('air_conditioners')

//     const snapshot = await fsAirConditioners.get()

//     for (const doc of snapshot.docs) {
//         console.log(doc.id, '=>', doc.data())
//     }

//     // const items = snapshot.docs.map(doc => doc.data())

//     // console.log(items)
// }

// checkFirebase()

async function addInfo() {
  //   const fsCaio = fs.collection("caio");
  //   await fsCaio.add({
  //     name: "Caio",
  //     age: 41,
  //   });
  //   await fsCaio.add({
  //     name: "Robson",
  //     age: 51,
  //   });
  //   await fsCaio.doc("id_meu_porra").set({
  //     name: "Caio",
  //     age: 41,
  //     email: "caio@camim.com.br",
  //   });
}

// addCaio();

function monitCaioAll() {
  const fsCaio = fs.collection("caio");

  fsCaio.onSnapshot((snapshot) => {
    for (const doc of snapshot.docs) {
      console.log(">>>", JSON.stringify(doc.data(), null, 2));
    }
  });
}

// function monitCaioOnlyUpdate() {
//   const fsToCheck = fs.collection('environments').doc('production').collection('air_conditioners')

//   console.log('👀 Monitorando modificações')

//   fsToCheck.onSnapshot((snapshot) => {
//     for (const change of snapshot.docChanges()) {
//     //   console.log(">>>", JSON.stringify(doc.data(), null, 2));
//       if (change.type === 'modified') {
//         console.log('➡️ Modificado', change.doc.data())
//       }
//     }
//   });
// }


async function turnOn(docRef) {
    console.log('✅ ligando o ar condicionado')
}

async function turnOff(docRef) {
    console.log('😎 desligando o ar condicionado')
}

async function getStatus(docRef) {
    console.log("🫟 checando o status");
    return 'on';
}

function runCommands() {
  const fsToCheck = fs
    .collection("environments")
    .doc("production")
    .collection("air_conditioners_actions");

  console.log("👀 Monitorando ar condicionados");

  fsToCheck.onSnapshot((snapshot) => {
    for (const change of snapshot.docChanges()) {
      if (change.type === "added") {
        const json = change.doc.data();

        if (json.status === "check") {
          // Checar o status atual do ar condicionado
          
          getStatus(change.doc)
        } else if (json.status === "on") {
          // Ligar o ar condicionado
          turnOn(change.doc)
        } else if (json.status === "off") {
          // Desligar o ar condicionado
          turnOff(change.doc)
        }
      }
    }
  });
}

runCommands();
