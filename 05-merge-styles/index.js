const fs = require('fs');
const path = require('path');


fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    if(err) console.log(err.message)

    fs.writeFile(
      path.join(__dirname, 'project-dist', 'bundle.css'),
              '',
              (err) => {
                if(err)console.log(err.message)
              }
    );

    files.forEach(file => {
      const isCSS = path.extname(file.name)
      if(file.isFile() && isCSS === '.css'){
        fs.readFile(
          path.join(path.join(__dirname, 'styles'), file.name),
          'utf-8',
          (err, data) => {
            if(err) console.log(err.message)
            fs.appendFile(
              path.join(__dirname, 'project-dist', 'bundle.css'),
              data,
              (err) => {
                if(err)console.log(err.message)
              }
            )
          } 
        )

      }
    })
    console.log('Сбор файла bundle.css из файлов .css в папке styles осуществлен!')
  }
)