var config = {
    appname: 'Transient',
    appDescription: 'The simple, easy corporate file transfer tool',
    mongoUrl: 'mongodb://localhost:27017/transient',
    locations:[
      {
          newYork: {
            outGoing: '\\\\aawsdp03\\shared\\Order Fulfillment\\General\\Todays New York Files\\',
            inComing: '\\\\aawsdp03\\shared\\Order Fulfillment\\General\\inmail\\NY\\'
          }
      },
      {
          kansassCity: {
            outGoing: '\\\\aawsdp03\\shared\\Order Fulfillment\\General\\Today\'s Kansas City Orders\\',
            inComing: '\\\\aawsdp03\\shared\\Order Fulfillment\\General\\inmail\\KC\\'
          }
      },
      {
          canada: {
            outGoing: '\\\\aawsdp03\\shared\\Order Fulfillment\\General\\Todays Extreme Solution Orders\\',
            inComing: '\\\\aawsdp03\\shared\\Order Fulfillment\\General\\inmail\\ES\\'
          }
      },
      {
        forTest: {
          outGoing: 'forTest\\out\\',
          inComing: 'forTest\\in\\'
        }
      }
    ],
    port: 3000,
  }
module.exports = config;
