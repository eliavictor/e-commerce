const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
// const signin = require('../server/routes')

chai.use(chaiHttp);
const expect = chai.expect;

describe('Get Product || get /products/', function() {
  // SUCCESS
  describe('SUCCESS', function() {
    it('should send an object with 200 status code', function(done) {
      chai
      .request(app)
      .get('/products')
      .then(function(res) {

      // Assertion
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('products');
      done();

      })
      .catch(function(err) {
        console.log(err)
      })
    })
  })

})