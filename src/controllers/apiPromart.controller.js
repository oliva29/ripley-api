const axios = require('axios');  
const https = require('https');

 async function getUserApiPromart(dni) {
    let data = {};
  
    dni = dni.toString();
    
    const agent = new https.Agent({
      rejectUnauthorized: false
    });
  
    let url = `https://apiexterno.promart.pe/utility/employee/${dni}`
  
    await axios({
      method: 'GET',
      url: url,
      httpsAgent: agent,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'company': 'hp',
        // 'Authorization': 'dc1b5cda-f06b-3c08-a506-95c5b6b49494',
        'client_id': '1f4329fd-6b8e-37d2-8117-bbc13660ba34',
        'access_token': 'e5d85a1e-b3e1-3046-9d8d-c0dd566380d8'
      }
    })
      .then(response => {
        data = {
          data: response.data,
          success: true,
          status: response.status
        }
      })
      .catch(error => {
        console.log(error);
        data = {
          success: false,
          status: false
        }
      })
  
    return new Promise(resolve => {
      resolve(data)
    });
  }

 

module.exports = {
  getUserApiPromart, 
};
