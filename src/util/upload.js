
const AWS = require('aws-sdk');
 
require('dotenv').config() // Env 

AWS.config.update({
  accessKeyId: 'AKIA523GIFXJJOBTGUPM',
  secretAccessKey: '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'
})

const s3 = new AWS.S3();
 
async function uploadS3(file,output) { 
    const params = {
      Bucket: 'mi-app-pm-bucket',
      Body: file,
      Key: output,
      ACL: 'public-read'
    };
    return new Promise(resolve => {
      s3.upload(params, (err, data) => { 
        if (err) {
          console.log("Error S3", err);
        } 
        resolve(data)
      });
      })
  }
 

module.exports = {
    uploadS3
};