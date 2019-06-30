const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
// const signin = require('../server/routes')

chai.use(chaiHttp);
const expect = chai.expect;

describe('Signin User || post /users/signin', function() {
  // SUCCESS
  describe('SUCCESS', function() {
    it('should send an object with 201 status code', function(done) {
      chai
      .request(app)
      .post('/users/signin')
      .send({ email: 'elia@mail.com', password: 'elia1234' })
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(201)
      expect(res.body).to.be.an('object')
      // expect(res.body).to.have.property('email')
      // expect(res.body).to.have.property('password')
      // expect(res.body.email).to.equal('elia@mail.com')
      // expect(res.body.password).to.equal('elia1234')
      done()

      })
      .catch(function(err) {
        console.log(err)
      })
    })
  });

  // ERROR WITHOUT EMAIL
  describe('ERROR WITHOUT EMAIL', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signin')
      .send({ name: 'Elia', email: '', password: 'elia1234', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Please input an email')
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body.email).to.equal('')
      expect(res.body.password).to.equal('elia1234')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });

  // ERROR EMAIL NOT REGISTERED
  describe('ERROR EMAIL NOT REGISTERED OR INVALID EMAIL', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signin')
      .send({ name: 'Elia', email: '@mail.com', password: 'elia1234', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('User not found')
      expect(res.body).to.be.an('object')
      // expect(res.body).to.have.property('email')
      // expect(res.body).to.have.property('password')
      // expect(res.body.email).to.equal('@mail.com')
      // expect(res.body.password).to.equal('elia1234')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });

  // ERROR WITHOUT PASSWORD
  describe('ERROR WITHOUT PASSWORD', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signin')
      .send({ name: 'Elia', email: 'elia@mail.', password: '', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Please input password')
      expect(res.body).to.be.an('object')
      // expect(res.body).to.have.property('email')
      // expect(res.body).to.have.property('password')
      // expect(res.body.email).to.equal('elia@mail.com')
      // expect(res.body.password).to.equal('')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });

  // ERROR WRONG PASSWORD
  describe('ERROR WRONG PASSWORD', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signin')
      .send({ name: 'Elia', email: 'elia@mail.', password: 'elia123', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Wrong email / password')
      expect(res.body).to.be.an('object')
      // expect(res.body).to.have.property('email')
      // expect(res.body).to.have.property('password')
      // expect(res.body.email).to.equal('elia@mail.com')
      // expect(res.body.password).to.equal('elia123')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });

})