const axios = require("axios");

async function turnOff(ip) {
  try {
    console.log(`🚀 Turning off device at ${ip}`);
    const urlSonoff = `http://${ip}/cm?cmnd=Power%20Off`;
    const response = await axios.get(urlSonoff);
    console.log(`✅ Response from device: ${response.data}`);
    return "OFF";
  } catch (error) {
    console.log(`❌ Error turning off device at ${ip}: ${error.message}`);
    return "UNAVAILABLE";
  }
}

module.exports = turnOff;
