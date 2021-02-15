const getRandomNumber = (minNum = 1000000000, maxNum = 99999999999999) => parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)

/*
* 签名算法
* 
* 由于密钥不应该在小程序内出现，因此生产环境下的小程序不应该包含此参数
*/
const getSign = obj => {
  let keys = Object.keys(obj)
  keys.sort()

  let params = []

  keys.forEach(e => {
    if (obj[e] != '') {
      params.push(e + '=' + obj[e])
    }
  })

  params.push('key=' + secret)

  let paramStr = params.join('&')
  const md5Util = require('./md5.js')
  let signResult = md5Util.md5(paramStr).toUpperCase() 

  return signResult
}

const generateOrderNumber = () => {
    let num = '';
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        num += Math.floor(Math.random() * 9 + 1);
      } else {
        num += Math.floor(Math.random() * 10);
      }
    }
    const orderNum = Date.now() + '' + num;
    return orderNum;
  }