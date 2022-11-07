const fs = require('fs');
const path = require('path');
const {stdin, stdout, exit} = process;

const newFile = fs.createWriteStream(path.join(__dirname, 'text.txt'),'utf-8');
newFile.on('error', function (error) {
  console.log(error.message);
  process.exit();
});

stdout.write('Привет! Напишите текст, для добавления в text.txt\n');

stdin.on('data', data => {
  if(data.toString().trim() === 'exit') exit()
   fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data,
    err => {
        if (err) throw err;
        console.log('Файл был изменен');
    }
  )
}
)
process.on('SIGINT', () => process.exit());

process.on('exit', () => stdout.write('Вы покинули программу. Удачи!'));



