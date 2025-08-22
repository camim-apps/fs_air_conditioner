require("dotenv").config();
const cron = require("node-cron");
const cronjobs = require("./cronjobs");

async function installCronJobs() {
  try {
    console.log("🚀 Installing cronjobs...");

    for (const [cronjobName, cronjob] of Object.entries(cronjobs)) {
      console.log("➡️ Installing cronjob", cronjobName);
      cron.schedule(cronjob.schedule, cronjob.handle);
    }
    console.log('🌱 Jobs installed!')
  } catch (error) {
    console.log("💥 Error installing cron jobs", error);
  }
}

installCronJobs();
