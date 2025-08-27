const admin = require("firebase-admin");
const camimFirebase = require("../config/camim_firebase.json");
const checkStatus = require("../check_status");

admin.initializeApp({
  credential: admin.credential.cert(camimFirebase),
});

const fs = admin.firestore();

async function checkAirStatus() {
  const fsToCheck = fs
    .collection("environments")
    .doc("production")
    .collection("air_conditioners")
    .where("code", "==", process.env.CODE);

  const airConditioners = await fsToCheck.get();

  for (const airConditioner of airConditioners.docs) {
    // Busco o ip
    const data = airConditioner.data();

    console.log('>>> Atualizando', data.ip)

    // Capturo o status do Sonoff
    const newStatus = await checkStatus(data.ip);
    // const newStatus = "UNAVAILABLE";

    // Atualizo o campo de dados
    data.status = newStatus;
    data.updatedAt = new Date().toISOString();

    // Atualizo as infos do ar condicionado no firebase
    await airConditioner.ref.set(data, { merge: true });
  }
}

module.exports = {
  schedule: "*/3 * * * *",
  handle: checkAirStatus,
};
