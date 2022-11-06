const fs = require('fs');
const fsPromises = require('fs/promises');
const { dirname } = require('path');
const path = require('path');
const pathFolder = path.join(__dirname, 'project-dist');

fs.mkdir(
  path.join(__dirname, 'project-dist'),
  { recursive: true },
  (err) => {
    if(err) console.log(err.message)
    console.log('Папка создана')
    createHTML()
    bildCss()
    fs.rm(
      path.join(__dirname, 'project-dist', 'assets'),
      { recursive: true, force: true },
      (err) => {
        if(err) console.log(err.message)

        fs.mkdir(
          path.join(__dirname, 'project-dist', 'assets'),
          { recursive: true },
          (err) => {
            if(err) console.log(err.message)
            createDirForAssets()
            copydir()
          }
        )
      }

    )
  }
)


  async function createHTML() {
    const temp = await fsPromises.readFile(
      path.join(__dirname, 'template.html'),
      'utf-8',
      (err) => {
        if (err) throw err;
    });

    let fileHTML = temp;
    const templNames = temp.match(/\{\{+[a-w]+}}/g);
    for (let name of templNames) {
      let readFileComp = await fsPromises.readFile(path.join(__dirname, 'components', `${name.slice(2, -2)}.html`), 'utf-8', (err) => {
        if (err) throw err;
      });
      fileHTML = fileHTML.replace(`${name}`, `${readFileComp}`);

      await fsPromises.writeFile(
        path.join(pathFolder, 'index.html'),
        fileHTML,
        (err) => { if(err)console.log(err.message) }
        );
    }
  }


function bildCss(){
fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    if(err) console.log(err.message)

    fs.writeFile(
      path.join(__dirname, 'project-dist', 'style.css'),
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
              path.join(__dirname, 'project-dist', 'style.css'),
              data,
              (err) => {
                if(err)console.log(err.message)
              }
            )
          } 
        )

      }
    })
  }
)
}

function createDirForAssets(){
  fs.readdir(
    path.join(__dirname, 'assets'),
    { withFileTypes: true },
    (err,dirs) => {
      dirs.forEach(dir => {

        fs.mkdir(
          path.join(__dirname, 'project-dist', 'assets', dir.name),
          { recursive: true },
          (err) => {
            if(err) console.log(err.message)
          }
        )
      })
    }
  )
}


function copyFiles(namedir){
fs.readdir(
  path.join(__dirname, 'assets', namedir),
  { withFileTypes: true },
  (err, files) => {
    if(err) console.log(err.message)

    files.forEach(file => {
        let inputDir = path.join(__dirname, 'assets', namedir, file.name)
        let outputDir = path.join(__dirname, 'project-dist', 'assets', namedir, file.name)

        fs.copyFile(inputDir, outputDir, (err) => {
            if(err) console.log(err.message)
        })
    })
    console.log(`Папки с файлами скопированы из assets/${namedir} в project-dist`)
  }
)
}

function copydir(){
fs.readdir(
  path.join(__dirname, 'assets'),
  { withFileTypes: true },
  (err,dirs) => {
    if(err) console.log(err.message)
    dirs.forEach(dir => {
      if((dir.isDirectory)) {
      console.log(dir.name)
      copyFiles(dir.name)
      }
    })
})
}
