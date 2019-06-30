const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
// const signin = require('../server/routes')

chai.use(chaiHttp);
const expect = chai.expect;

describe('Add Product || post /products/', function() {
  // SUCCESS
  describe('SUCCESS', function() {
    it('should send an object with 201 status code', function(done) {
      chai
      .request(app)
      .post('/products')
      .send({ name: 'Hoodie', description: 'Warna : Biru', price: 100000, stock: 24 })
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(201)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('description')
      expect(res.body).to.have.property('price')
      expect(res.body).to.have.property('stock')
      expect(res.body.name).to.equal('Hoodie')
      expect(res.body.description).to.equal('Warna : Biru')
      expect(res.body.price).to.equal(100000)
      expect(res.body.stock).to.equal(24)
      done()

      })
      .catch(function(err) {
        console.log(err)
      })
    })
  })

  // ERROR WITHOUT NAME
  describe('ERROR WITHOUT NAME', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/products')
      .send({ name: '', description: 'Warna : Biru', price: 100000, stock: 24 })
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('description')
      expect(res.body).to.have.property('price')
      expect(res.body).to.have.property('stock')
      expect(res.body.name).to.equal('')
      expect(res.body.description).to.equal('Warna : Biru')
      expect(res.body.price).to.equal(100000)
      expect(res.body.stock).to.equal(24)
      done()

      })
      .catch(function(err) {
        console.log(err)
      })
    })
  })

  // ERROR WITHOUT DESCRIPTION
  describe('ERROR WITHOUT DESCRIPTION', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/products')
      .send({ name: 'Hoodie', description: '', price: 100000, stock: 24 })
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('description')
      expect(res.body).to.have.property('price')
      expect(res.body).to.have.property('stock')
      expect(res.body.name).to.equal('Hoodie')
      expect(res.body.description).to.equal('')
      expect(res.body.price).to.equal(100000)
      expect(res.body.stock).to.equal(24)
      done()

      })
      .catch(function(err) {
        console.log(err)
      })
    })
  })

  // ERROR WITHOUT PRICE
  describe('ERROR WITHOUT PRICE', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/products')
      .send({ name: 'Hoodie', description: 'Warna: Biru', price: '', stock: 24 })
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('description')
      expect(res.body).to.have.property('price')
      expect(res.body).to.have.property('stock')
      expect(res.body.name).to.equal('Hoodie')
      expect(res.body.description).to.equal('Warna: Biru')
      expect(res.body.price).to.equal('')
      expect(res.body.stock).to.equal(24)
      done()

      })
      .catch(function(err) {
        console.log(err)
      })
    })
  })

  // ERROR WITHOUT STOCK
  describe('ERROR WITHOUT STOCK', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/products/')
      .send({ name: 'Hoodie', description: 'Warna: Biru', price: 100000, stock: '' })
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('description')
      expect(res.body).to.have.property('price')
      expect(res.body).to.have.property('stock')
      expect(res.body.name).to.equal('Hoodie')
      expect(res.body.description).to.equal('Warna: Biru')
      expect(res.body.price).to.equal(100000)
      expect(res.body.stock).to.equal('')
      done()

      })
      .catch(function(err) {
        console.log(err)
      })
    })
  })

})