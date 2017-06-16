module.exports = {
  location: 'FT',
  watch:{
    folder: './watch/',
    transUrl: 'http://localhost:3000',
    transmission: 'send'
  },
  poll:{
    folder: './receive',
    transUrl: 'http://localhost:3000',
    transmission: 'receive'
  }
}
