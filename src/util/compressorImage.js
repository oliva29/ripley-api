const sharp = require('sharp'); 
 
 function compresorImage( file, quality= 100, resize= 0 ){
        try {   
            
                    const compresor = sharp(file) 
                    if ( resize > 0 ){
                        compresor.resize(resize)
                    }

                    compresor.withMetadata()
                       .webp( { quality } )
                       .toBuffer({ resolveWithObject: true }).then(response => response.data) 
        } catch (error) {
            console.log(error)
        } 
 } 

module.exports = {
    compresorImage
}