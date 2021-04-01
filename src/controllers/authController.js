const { createToken } = require('../util/jsonwebtoken');
const { encryptPassword, matchPassword } = require('../util/bcrypt'); 
 
const User = require('../models/userModel');

 

async function OAuthRegister(req, res) {
  try {
    const { email, password} =  req.body;
    const passwordEncrypted = await encryptPassword(password)  
      let user = new User({ email, password: passwordEncrypted });
       
      await user.save(); 
      return res.send({
        message: 'Login exitoso!',
        exist: false,
        data: {
          token: await createToken({  
            email: email 
          }),
          user: {   
            email: email
          },
        },
      }); 
   
  } catch (error) {  
    if ( parseInt( error.parent.code , 10) === 23505) {
      console.log(error.parent.code);
      return res.send({
        message: 'Usuario ya registrado.',
        exist: true
      }); 
    } else {
      res.status(500).send({
        message: `Server Error`,
      });
    }
    
  }
}

async function OAuthLocal(req, res) {
  try {
    const {email, password} =  req.body; 
    let data_user = await getUser(email);     
    
    if ( data_user ) {      
         const statusPassword = await matchPassword( password, data_user.password )  
          // Contraseña correcta y estado correcto (state=true) 
          if ( statusPassword && data_user.state  ) {   
            return res.send({
              message: 'Login exitoso!',
              data: {
                token: await createToken({  
                  email: data_user.email,
                  type: data_user.type,
                }),
                user: { 
                  type: data_user.type,
                  email: data_user.email
                },
              },
            }); 

          } else {  
            return res.status(401).send({ message:'Usuario no registrado o credenciales incorrectas' })
          }
        } else { 
          return res.status(401).send({ message:'Usuario no registrado o credenciales incorrectas' })
        }
      
  } catch (error) {  
    
    return res.status(400).send({message:'Server error',error})
  }
}

// Función para obtener datos del colaborador en caso esté registrado en la aplicación tu hogar soñado
async function getUser(email) {
  try {  
    let result = await User.findOne({ where: {state: true, email} })   
   
    return  result  ? result : false

  } catch (error) {
    console.log(error);
    return {
      success: false
    }
  }
}


module.exports = { 
  OAuthRegister,
  OAuthLocal
};
