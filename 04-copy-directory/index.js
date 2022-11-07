const fs = require('fs');
const path = require('path')

fs.access(path.join(__dirname, 'files-copy'), (error) => {
    if (error && error.code === 'ENOENT') {
      createNewDir();
      copyFiles();
    } else {
      fs.readdir(
        path.join(__dirname, 'files-copy'),
        (err, files) => {
          if(err) console.log(err.message)

          files.forEach(file => {    
            fs.unlink(path.join(path.join(__dirname, 'files-copy'), file), (err) => {
                if(err) console.log(err.message)
            })
        })
        }
      )
      copyFiles();
    }
});

function createNewDir(){
  fs.mkdir(
    path.join(__dirname, 'files-copy'),
    { recursive: true },
    (err) => {
      if(err) console.log(err.message)
    }
  )  
}

function copyFiles(){
  fs.readdir(
    path.join(__dirname, 'files'),
    { withFileTypes: true },
    (err, files) => {
      if(err) console.log(err.message)
  
      files.forEach(file => {
          let inputDir = path.join(__dirname, 'files', file.name)
          let outputDir = path.join(__dirname, 'files-copy', file.name)
  
          fs.copyFile(inputDir, outputDir, (err) => {
              if(err) console.log(err.message)
          })
      })
      console.log('Файлы скопированы из files в files-copy')
    }
  )
}
