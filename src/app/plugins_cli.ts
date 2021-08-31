let fs = require('fs');
let path = require('path');
let inquirer = require('inquirer');

let DESTINATION = path.join(__dirname,'plugins/')
function generateTS(fname,description){
    let content = "// Description : "+description;
    fs.readdir(DESTINATION,(err,files)=>{
      if(err){
        return console.log("Destination undefined");
      }
      if(!files.includes(fname+'.ts')){
        let filename = path.join(DESTINATION,fname+'.ts');
        fs.writeFile(filename, content,function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
      }
      else{
        console.log('File already exists !!');
      }
    });
}

const questions = [
  {
    type: 'input',
    name: 'filename',
    message: 'Plugin filename: ',
    default: 'Plugin.ts',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description:  ',
    default: 'No Description',
  },
]
inquirer.prompt(questions).then((ans)=>{
  generateTS(ans.filename,ans.description);
}).catch((err)=>{
  console.log(err);
});