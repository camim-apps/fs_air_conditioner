const axios = require('axios');

async function turnOn(ip) {
    try {
        console.log(`🚀 Turning on device at ${ip}`);
        const urlSonoff = `http://${ip}/cm?cmnd=Power%20On`;
        const response = await axios.get(urlSonoff);
        console.log(`✅ Response from device: ${response.data}`);
    } catch (error) {
        console.log(`❌ Error turning on device at ${ip}: ${error.message}`);
    }
}

module.exports = turnOn;