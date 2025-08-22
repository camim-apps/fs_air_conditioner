const admin = require("firebase-admin");
const camimFirebase = require("../config/camim_firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(camimFirebase),
});

const fs = admin.firestore();

const fsProduction = fs.collection("environments").doc("production");

module.exports = {
  fsAirConditioneirList: fsProduction
    .collection("air_conditioners")
    .where("code", "==", process.env.CODE),
  fsAirConditioneinAction: fsProduction
    .collection("air_conditioners_actions")
    .where("code", "==", process.env.CODE),
};
