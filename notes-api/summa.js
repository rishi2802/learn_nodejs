const fs = require('fs').promises;

async function notesapp(){
  try{
    await fs.writeFile("asyncawait.txt", "Task 1");
    await fs.appendFile("asyncawait.txt","Tak 2");
  }
  catch(err){
    console.log("Error"+ err);
  }
};

notesapp();