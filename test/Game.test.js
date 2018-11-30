//
// Unittest for the Game class
//
const chai = require('chai')
const assert = require('assert')
const Game = require('../src/models/game.model')

chai.should()

describe('Game', () => {

    it('should be intitialized successfully when providing valid arguments', (done) => {
        const game = new Game('  abc  ', '  def  ', 2018, ' fps ')

        game.should.have.property('name').that.is.a('string').which.equals('abc')
        game.name.should.be.a('string')
        game.should.have.property('year').equals(2018)
        game.should.not.have.property('password')

        assert.equal(game.name, 'abcd', 'Names do not match')

        done()
    })

})