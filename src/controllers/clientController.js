
const Client = require('../models/clientModel');
const differenceInYears = require('date-fns/differenceInYears')
const { getAverage, getStandardDeviation } = require('../helpers/calc');

async function getClient(req, res) {
  try {
    let result = await Client.findAndCountAll(
      {
        where: {
          state: true
        },
        order: [
          ['createdAt', 'DESC'],
        ]
      }
    )

    return res.send({
      message: 'Consulta correcta.',
      data: result
    });
  } catch (error) {
    return res.status(400).send({ message: 'Server error', error })
  }
}

async function setClient(req, res) {
  try {
    const { name, lastName, dateOfBirth } = req.body;
    var date = new Date();
    const arrayDate = date.toLocaleDateString('es-PE').split('/')
    const arrayDateOfBirth = dateOfBirth.split('/')
    let age = differenceInYears(new Date(arrayDate[2], arrayDate[1], arrayDate[0]), new Date(arrayDateOfBirth[2], arrayDateOfBirth[1], arrayDateOfBirth[0]));
    let result = new Client({ name, lastName, dateOfBirth:new Date(arrayDate[2], arrayDate[1], arrayDate[0]), age });
    await result.save();
    return res.send({
      message: 'Consulta correcta.',
      data: result
    });
  } catch (error) { 
    console.error(error);
    return res.status(400).send({ message: 'Server error', error })
  }
}



async function getClientAge() {
  let result = await Client.findAll(
    {
      attributes: ['age'],
      where: {
        state: true
      },
      raw: true
    }
  )

  return result;
}

async function getKpi(req, res) {
  try {
    const clients = await getClientAge();
    const clientsResult = clients.map(param => param.age);
    const standardDeviation = await getStandardDeviation(clientsResult);
    const average = await getAverage(clientsResult)
    return res.send({
      message: 'Consulta correcta.',
      data: {
        average: average.toFixed(2),
        standardDeviation: standardDeviation.toFixed(2)
      }
    });
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: 'Server error', error })
  }
}
module.exports = {
  getClient,
  setClient,
  getKpi
};
