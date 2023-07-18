const fs = require('fs');
const path = require('path');
const { registerFont, createCanvas, loadImage } = require('canvas');
const express = require('express');

const app = express();

const dir = './images';
const filename = 'image.png';

app.use(express.static(dir, { index: filename }));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server listening on port: ${port}`));

registerFont('./fonts/Poppins-Bold.ttf', { family: 'Poppins', style: 'bold'});

const canvas = createCanvas(4000, 660);
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = 'black';

const testString = 'The quick brown fox jumps over the lazy dog. 1234567890';

ctx.font = 'bold 60px Poppins';
ctx.fillText(testString, 130, 200);

ctx.font = 'bold 80px Poppins';
ctx.fillText(testString, 130, 350);

ctx.font = 'bold 100px Poppins';
ctx.fillText(testString, 130, 520);

const out = fs.createWriteStream(path.join(dir, filename));

const stream = canvas.createPNGStream();

stream.pipe(out);

out.on('finish', () => console.log('The png file was created'));