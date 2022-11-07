const fs = require('fs');
const path = require('path');

const readeText = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readeText.on('error', function (error) {
    console.log(error.message);
});

let text = '';

readeText.on('data', chunk => console.log(chunk += text));
