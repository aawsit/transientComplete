var config = {
    appname: 'Transient',
    appDescription: 'The simple, easy corporate file transfer tool',
    mongoUrl: 'mongodb://localhost:27017/transient',
    locations:[
        {
          location: 'NY',
          outGoing: '\\\\aawsdp03\\shared\\Order Fulfillment\\General\\Todays New York Files\\',
          inComing: '\\\\aawsdp03\\shared\\Order Fulfillment\\General\\inmail\\NY\\',
        },
        {
          location: 'KC',
          outGoing: '\\\\aawsdp03\\shared\\Order Fulfillment\\General\\Today\'s Kansas City Orders\\',
          inComing: '\\\\aawsdp03\\shared\\Order Fulfillment\\General\\inmail\\KC\\',
        },
        {
          location: 'CA',
          outGoing: '\\\\aawsdp03\\shared\\Order Fulfillment\\General\\Todays Extreme Solution Orders\\',
          inComing: '\\\\aawsdp03\\shared\\Order Fulfillment\\General\\inmail\\ES\\',
        },
      {
        location:'ft',
        outGoing: '.\\forTest\\out\\',
        inComing: '.\\forTest\\in\\',
      }
    ],
    shares: [
      {
        name: 'CPC',
        location: 'C:\\Users\\rutherfordc.AA\\Documents\\commas web\\COMMaS\\',
        files: [],
      },
      {
        name: 'BS',
        location: 'somewhere out there....',
        files: [],
      }
    ],
    port: 3000,
  }
module.exports = config;
