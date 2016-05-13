//var assert = require('assert');

//describe('Test Suite 1', function() {
//    it('Test 1', function() {
//        assert.ok(true, "This shouldn't fail");
//    })

//    it('Test 2', function() {
//        assert.ok(1 === 1, "This shouldn't fail");
//        assert.ok(false, "This should fail");
//    })
//})
var util = require('util');
var http_mocks = require('node-mocks-http');
var should = require('should');

var express = require('express');
var app = express();

var IndexController = require('../routes/index.js');
var controller = new IndexController();
controller.init(app);

function buildResponse() {
	return http_mocks.createResponse({ eventEmitter: require('events').EventEmitter })
}

describe('Welcome Controller Tests', function () {
	
	it('hello', function (done) {
		var response = buildResponse()
		var request = http_mocks.createRequest({
			method: 'GET',
			url: '/',
		})
		
		response.on('end', function () {
			response._getStatusCode()().should.equal(200);
			done()
		})
		
		app.handle(request, response)
	})
});
