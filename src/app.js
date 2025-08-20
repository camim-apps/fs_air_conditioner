require("dotenv").config();
const admin = require("firebase-admin");
const camimFirebase = require("./config/camim_firebase.json");
const turnOn = require("./turn_on");
const turnOff = require("./turn_off");

admin.initializeApp({
  credential: admin.credential.cert(camimFirebase),
});

const fs = admin.firestore();

async function getStatus(docRef) {
  console.log("🫟 checando o status");
  return 'on';
}

async function manageRequest(json) {
  console.log("🌱 Dados do Firebase:", JSON.stringify(json, null, 2));

  if (!json.ip || !json.status) {
    console.log("❌ IP ou status não encontrado no documento")
    return;
  }

  if (!["Power On", "Power Off"].includes(json.status)) {
    console.log("❌ Status inválido, deve ser 'Power On' ou 'Power Off'");
    return;
  }

  if (json.status === "Power On") {
    // Ligar o ar condicionado
    await turnOn(json.ip)
  } else {
    // Desligar o ar condicionado
    await turnOff(json.ip)
  }
}

function runCommands() {
  const fsToCheck = fs
    .collection("environments")
    .doc("production")
    .collection("air_conditioners_actions")
    .where("code", "==", process.env.CODE);

  console.log("👀 Monitorando ar condicionados");

  fsToCheck.onSnapshot((snapshot) => {
    for (const change of snapshot.docChanges()) {
      if (change.type === "added") {
        const json = change.doc.data();
        change.doc.ref.delete();
        manageRequest(json)
      }
    }
  });
}

runCommands();
