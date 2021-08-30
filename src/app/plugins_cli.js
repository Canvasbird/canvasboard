var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');

DESTINATION = path.join(__dirname,'plugins/')
generateTS(fname,description){
    var content = "// Description : "+description;
    fs.readdir(DESTINATION,(err,files)=>{
      if(err){
        return console.log("Destination undefined");
      }
      if(!files.includes(name+'.ts')){
        var filename = path.join(DESTINATION,fname+'.ts');
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