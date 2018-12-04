const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

const endpointToTest = '/api/games';

describe('Games API GET games', () => {
    it('should return an array of Games', (done) => {
		chai.request(server)
			.get(endpointToTest)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.equals(1);
				done();
			})
    	})
})

describe('Games API GET games/0', () => {
	it('should return the default game', (done) => {
		chai.request(server)
			.get(endpointToTest)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
			    done();
			})
	})
})

describe('Games API GET games/123', () => {
	it('should return the default game', (done) => {
		chai.request(server)
			.get(endpointToTest)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.should.have.property('msg');
				res.body.should.have.property('code');
				res.body.should.have.property('date');
			    done();
			})
	})
})