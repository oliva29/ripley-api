 
 const fs = require('fs');
 const pdf = require('html-pdf'); 
 const path = require('path')

async function generatePdf() {
  try {
          
            const template = path.join(`${__dirname}/../view/`, 'cotizacion.html')
            const filename = template.replace('.html', '.pdf')
            let templateHtml = fs.readFileSync(template, 'utf8')
          
            const image = path.join('file://',`${__dirname }/../view/`, 'backgroundpdf.png')
            templateHtml = templateHtml.replace('{{image}}', image)
            const config  = {
                "format": "A4", 
            }
            return new Promise((resolve) => {
              pdf.create(templateHtml, config ).toFile(filename,(err,res)=> {
                resolve(res) 
              });
            }) 
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = { 
  generatePdf,
};
