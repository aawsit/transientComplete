module.exports = {
  location: 'FT',
  watch:{
    folder: './watch/',
    transUrl: 'http://localhost:3000',
    transmission: 'send'
  },
  poll:{
    folder: './recieve',
    transUrl: 'http://localhost:3000',
    transmission: 'receive'
  }
}
