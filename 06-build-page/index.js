const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const pathFolder = path.join(__dirname, 'project-dist');

function createNewDir(){
	fs.mkdir(
	  path.join(__dirname, 'project-dist'),
	  { recursive: true },
	  (err) => {
		if(err) console.log(err.message)
		console.log('Папка создана')
    createHTML()
	  }
	)  
  }

  createNewDir()



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