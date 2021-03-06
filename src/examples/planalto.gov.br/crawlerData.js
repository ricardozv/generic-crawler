const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/leis')

const schema = new mongoose.Schema({ texto: 'string'})
const Lei = mongoose.model('Lei', schema)

const cheerio = require('cheerio')
const BASE_URL = 'http://www.planalto.gov.br/ccivil_03/Leis/LEIS_2001/L10257.htm'
console.log('BASE_URL', BASE_URL)
const crawler = {
  BASE_URL: BASE_URL,
  elementList: 'body',
  fields: [
    {
      name: 'lei',
      value: 'p[align="justify"]',
      getType: 'text',
      valueType: 'css'
    }
  ],
  optionsRequest: {
    uri: BASE_URL,
    transform: function (body) {
      return cheerio.load(body)
    }
  },
  PROMISE_SUCCESS: ($) => {
    return require('./promiseSuccess')($, crawler)
  },
  PROMISE_ERROR: (err) => {
    throw new Error(err)  
  },
  options: {
  },
  callback: (obj) => {
    // Array.from(obj.leis[0]).forEach((el, i) => 
    //   Lei.create({texto: el})
    //     .then((data) => console.log('ARMAZENEI ISSO: ', data))
    // )
    return true
  }
}

module.exports = crawler
