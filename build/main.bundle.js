/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var calculateMonthlyPayment = function calculateMonthlyPayment(principal, years, rate) {
	    if (rate) {
	        var monthlyRate = rate / 100 / 12;
	    }
	    var monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
	    return { principal: principal, years: years, rate: rate, monthlyRate: monthlyRate, monthlyPayment: monthlyPayment };
	};
	
	var calculateAmortization = function calculateAmortization(principal, years, rate) {
	    var _calculateMonthlyPaym = calculateMonthlyPayment(principal, years, rate),
	        monthlyRate = _calculateMonthlyPaym.monthlyRate,
	        monthlyPayment = _calculateMonthlyPaym.monthlyPayment;
	
	    var balance = principal;
	    var amortization = [];
	    var reserve = void 0;
	    for (var y = 0; y < years; y++) {
	        var interestY = 0; //Interest payment for year y
	        var principalY = 0; //Principal payment for year y
	        for (var m = 0; m < 12; m++) {
	            var interestM = balance * monthlyRate; //Interest payment for month m
	            var principalM = monthlyPayment - interestM; //Principal payment for month m
	            interestY = interestY + interestM;
	            principalY = principalY + principalM;
	            balance = balance - principalM;
	        }
	        amortization.push({ principalY: principalY, interestY: interestY, balance: balance });
	    }
	    return { monthlyPayment: monthlyPayment, monthlyRate: monthlyRate, amortization: amortization };
	};
	
	document.getElementById('calcBtn').addEventListener('click', function () {
	    var principal = document.getElementById("principal").value;
	    var years = document.getElementById("years").value;
	    var rate = document.getElementById("rate").value;
	    var reserve = document.getElementById("reserve").value;
	    if (reserve >= principal * 0.2) {
	        var _calculateAmortizatio = calculateAmortization(principal, years, rate),
	            monthlyPayment = _calculateAmortizatio.monthlyPayment,
	            monthlyRate = _calculateAmortizatio.monthlyRate,
	            amortization = _calculateAmortizatio.amortization;
	
	        document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
	        document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
	        amortization.forEach(function (month) {
	            return console.log(month);
	        });
	    } else {
	        window.alert("You cannot get the mortgage loan");
	    };
	});

/***/ }
/******/ ]);
//# sourceMappingURL=main.bundle.js.map