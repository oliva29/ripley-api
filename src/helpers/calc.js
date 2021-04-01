const reducer = (accumulator, currentValue) => accumulator + currentValue;

const getStandardDeviation = async (nums) => {
      if (nums.length === 0) {
        return 0;
      }
      let average = await getAverage(nums);  
      let data = nums.map((param) => {
        return Math.pow(param - average , 2);
      }) 

      data = data.reduce(reducer)/nums.length;

      return Math.pow(data, 0.5);
}

const getAverage = (nums) => {
    if (nums.length === 0) {
        return 0;
      }
    let sum = nums.reduce(reducer); 
    let avg = sum/nums.length;

    return avg;
}

module.exports = { 
    reducer,
    getStandardDeviation,
    getAverage
}