require("dotenv").config();
const checkAirStatus = require("../cronjobs/check_air_status");

async function test() {
  await checkAirStatus.handle();
}

test();
