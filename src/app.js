require("dotenv").config();
const { addMinutes } = require("date-fns");
const {
  fsAirConditioneinAction,
  fsAirConditioneirList,
} = require("./services/fb_service");
const turnOn = require("./turn_on");
const turnOff = require("./turn_off");

async function updateAir(doc, status) {
  await doc.set(
    {
      status,
      updatedAt: new Date().toISOString(),
      waitUntilAt: addMinutes(new Date(), 1).toISOString(),
    },
    { merge: true }
  );
}

async function manageRequest(json) {
  console.log("🌱 Dados do Firebase:", JSON.stringify(json, null, 2));

  if (!json.ip || !json.status || !json.id) {
    console.log("❌ IP, status ou ID não encontrado no documento");
    return;
  }

  if (!["Power On", "Power Off"].includes(json.status)) {
    console.log("❌ Status inválido, deve ser 'Power On' ou 'Power Off'");
    return;
  }

  // Aguardar ligar ou desligar o ar
  const doc = fsAirConditioneirList.doc(`${json.code}-${json.id}`);

  await updateAir(doc, 'WAITING')

  if (json.status === "Power On") {
    // Ligar o ar condicionado
    const newStatus = await turnOn(json.ip);
    await updateAir(doc, newStatus)
  } else {
    // Desligar o ar condicionado
    const newStatus = await turnOff(json.ip);
    await updateAir(doc, newStatus)
  }
}

function runCommands() {
  console.log("👀 Monitorando ar condicionados");

  fsAirConditioneinAction.onSnapshot((snapshot) => {
    for (const change of snapshot.docChanges()) {
      if (change.type === "added") {
        const json = change.doc.data();
        change.doc.ref.delete();
        manageRequest(json);
      }
    }
  });
}

runCommands();
