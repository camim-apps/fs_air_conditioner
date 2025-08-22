const axios = require("axios");

async function checkStatus(ip) {
  try {
    console.log(`🚀 Checking device at ${ip}`);
    const urlSonoff = `http://${ip}/cm?cmnd=Power`;
    const response = await axios.get(urlSonoff);
    console.log(`✅ Response from device: ${response.data}`);
    return response.data?.POWER || "UNAVAILABLE";
  } catch (error) {
    console.log(`❌ Error checking device at ${ip}: ${error.message}`);
    return "UNAVAILABLE";
  }
}

module.exports = checkStatus;
