"use strict";
var canvas = (document.getElementById("jkonsInvader"));
var context = canvas.getContext("2d");
// Set canvas height and with in JS, because with and height set in CSS distort drawn shapes
canvas.width = 512;
canvas.height = 448;
context.fillStyle = "white";
context.fillRect(10, 10, 2, 15);
