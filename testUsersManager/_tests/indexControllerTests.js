var util = require('util');
var httpStatus = require('http-status');
var http_mocks = require('node-mocks-http');
var should = require('should');
var mockery = require('mockery');
var express = require('express');

function buildResponse() {
	return http_mocks.createResponse({ eventEmitter: require('events').EventEmitter })
}

var loggersMock = require('./infrastructure/loggersMock');
mockery.registerMock('../infrastructure/loggers', loggersMock);

describe('Index Controller Tests', function () {
	var app;
	var controller;
	var IndexController;
	
	before(function () {
		mockery.enable({
			warnOnReplace: true,
			warnOnUnregistered: true
		});
		app = express();
		var IndexController = require('../routes/index.js');
		controller = new IndexController();
		controller.init(app);
	});
	
	after(function () {
		mockery.disable();
	});
	
	it('index action ok', function (done) {
		var response = buildResponse()
		var request = http_mocks.createRequest({
			method: 'GET',
			url: '/',
		});
		
		response.on('end', function () {
			response._getStatusCode().should.equal(httpStatus.OK);
			done();
		});
		
		app.handle(request, response);
	});
	
	it('action not found', function (done) {
		var response = buildResponse()
		var request = http_mocks.createRequest({
			method: 'GET',
			url: '/invalid',
		});
		
		response.on('end', function () {
			response._getStatusCode().should.equal(httpStatus.NOT_FOUND);
			done();
		});
		
		app.handle(request, response);
	})

});
