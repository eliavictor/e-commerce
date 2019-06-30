const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
// const signup = require('../server/routes')

chai.use(chaiHttp);
const expect = chai.expect;

describe('Signup User || post /users/signup', function() {
  // SUCCESS
  describe('SUCCESS', function() {
    it('should send an object with 201 status code', function(done) {
      chai
      .request(app)
      .post('/users/signup')
      .send({ name: 'Elia', email: 'elia@mail.com', password: 'elia1234', address: 'Gading Serpong', balance: 10000})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(201)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body).to.have.property('address')
      expect(res.body).to.have.property('balance')
      expect(res.body.name).to.equal('Elia')
      expect(res.body.email).to.equal('elia@mail.com')
      expect(res.body.password).to.equal('elia1234')
      expect(res.body.address).to.equal('Gading Serpong')
      expect(res.body.balance).to.equal(10000)
      done()

      })
      .catch(function(err) {
        console.log(err)
      })
    })
  })

  // // ERROR WITHOUT NAME
  describe('ERROR WITHOUT NAME', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signup')
      .send({ name: '', email: 'elia@mail.com', password: 'elia1234', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Please input name')
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body.name).to.equal('')
      expect(res.body.email).to.equal('elia@mail.com')
      expect(res.body.password).to.equal('elia1234')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });

  // ERROR NAME LENGTH < 3
  describe('ERROR NAME LENGTH < 3', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signup')
      .send({ name: 'El', email: 'elia@mail.', password: 'elia1234', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Please input password')
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body.name).to.equal('El')
      expect(res.body.email).to.equal('elia@mail.com')
      expect(res.body.password).to.equal('elia1234')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });

  // // ERROR WITHOUT EMAIL
  describe('ERROR WITHOUT EMAIL', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signup')
      .send({ name: 'Elia', email: '', password: 'elia1234', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Please input an email')
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body.name).to.equal('Elia')
      expect(res.body.email).to.equal('')
      expect(res.body.password).to.equal('elia1234')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });

  // ERROR INVALID EMAIL WITHOUT TEXT BEFORE @
  describe('ERROR INVALID EMAIL WITHOUT TEXT BEFORE @', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signup')
      .send({ name: 'Elia', email: '@mail.com', password: 'elia1234', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Please input a valid email')
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body.name).to.equal('Elia')
      expect(res.body.email).to.equal('@mail.com')
      expect(res.body.password).to.equal('elia1234')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });

  // // ERROR INVALID EMAIL WITHOUT @
  describe('ERROR INVALID EMAIL WITHOUT @', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signup')
      .send({ name: 'Elia', email: 'eliamail.com', password: 'elia1234', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Please input a valid email')
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body.name).to.equal('Elia')
      expect(res.body.email).to.equal('eliamail.com')
      expect(res.body.password).to.equal('elia1234')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });

  // ERROR INVALID EMAIL WITHOUT TEXT AFTER @ AND BEFORE .
  describe('ERROR INVALID EMAIL WITHOUT TEXT AFTER @ AND BEFORE .', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signup')
      .send({ name: 'Elia', email: 'elia@.com', password: 'elia1234', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Please input a valid email')
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body.name).to.equal('Elia')
      expect(res.body.email).to.equal('elia@.com')
      expect(res.body.password).to.equal('elia1234')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });

  // ERROR INVALID EMAIL WITHOUT .
  describe('ERROR INVALID EMAIL WITHOUT .', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signup')
      .send({ name: 'Elia', email: 'elia@mailcom', password: 'elia1234', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Please input a valid email')
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body.name).to.equal('Elia')
      expect(res.body.email).to.equal('elia@mailcom')
      expect(res.body.password).to.equal('elia1234')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });

  // ERROR INVALID EMAIL WITHOUT TEXT AFTER .
  describe('ERROR INVALID EMAIL WITHOUT TEXT AFTER .', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signup')
      .send({ name: 'Elia', email: 'elia@mail.', password: 'elia1234', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Please input a valid email')
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body.name).to.equal('Elia')
      expect(res.body.email).to.equal('elia@mail.')
      expect(res.body.password).to.equal('elia1234')
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
      .post('/users/signup')
      .send({ name: 'Elia', email: 'elia@mail.', password: '', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Please input password')
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body.name).to.equal('Elia')
      expect(res.body.email).to.equal('elia@mail.com')
      expect(res.body.password).to.equal('')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });

  // ERROR PASSWORD LENGTH < 8
  describe('ERROR PASSWORD LENGTH < 8', function() {
    it('should send an object with 400 status code', function(done) {
      chai
      .request(app)
      .post('/users/signup')
      .send({ name: 'Elia', email: 'elia@mail.', password: 'elia123', cart: []})
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(400)
      expect(res).to.have.message('Password minimal 8 characters')
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body.name).to.equal('Elia')
      expect(res.body.email).to.equal('elia@mail.com')
      expect(res.body.password).to.equal('elia123')
      done();

      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });
})