const { createToken } = require('../util/jsonwebtoken');
const { encryptPassword, matchPassword } = require('../util/bcrypt');
const { getUserApiPromart } = require('./apiPromart.controller');
 
const User = require('../models/clientModel');


async function OAuthGoogleLogin(req, res) {
  try { 
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Server Error: ${error.message}`,
    });
  }
}

async function OAuthRegister(req, res) {
  try {
    const { dni, email, password} =  req.body;
    const passwordEncrypted = await encryptPassword(password)
    const data_api_promart = await getUserApiPromart(dni);
   
    if ( data_api_promart.success ) {
      let name = data_api_promart.data.name.trim();
      let last_name = data_api_promart.data.lastName.trim();  
      let birthday = data_api_promart.data.cumpleaños;
      let anniversary = data_api_promart.data.aniversario;
      let job = data_api_promart.data.desPuesto.trim();
     
      let type = 'client' 
      let user = new User({ dni, email, password: passwordEncrypted, name, last_name,  anniversary,birthday, job,  type });
       
      await user.save(); 
      return res.send({
        message: 'Login exitoso!',
        exist: false,
        data: {
          token: await createToken({ 
            dni: dni,
            email: email,
            type: 'client',
          }),
          user: {
            name: name, 
            last_name: last_name,
            photo: null,  
            type: 'client',
            email: email
          },
        },
      }); 
    } else {
      return res.status(401).send({ message:'Usuario no registrado o credenciales incorrectas' })
    }
  } catch (error) { 
    if ( error.code ) {
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
    const {dni, password} =  req.body; 
    let data_user = await getUser(dni);     
    if ( data_user ) {      
         const statusPassword = await matchPassword( password, data_user.password )  
          // Contraseña correcta y estado correcto (state=true) 
          if ( statusPassword && data_user.status  ) {   
            return res.send({
              message: 'Login exitoso!',
              data: {
                token: await createToken({ 
                  dni: data_user.dni,
                  email: data_user.email,
                  type: data_user.type,
                }),
                user: {
                  name: data_user.name, 
                  photo: data_user.photo,
                  nickname: data_user.nickname,
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
    console.log(error)
    return res.status(400).send({message:'Server error',error})
  }
}

// Función para obtener datos del colaborador en caso esté registrado en la aplicación tu hogar soñado
async function getUser(dni) {
  try {  
    let result = await User.findOne({status: true, dni })   
   
    return  result  ? result : false

  } catch (error) {
    console.log(error);
    return {
      success: false
    }
  }
}


module.exports = {
  OAuthGoogleLogin,
  OAuthRegister,
  OAuthLocal
};
