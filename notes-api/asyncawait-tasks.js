//Notes:
//use JSON.stringify while printing any onject
//to use await the function should be declared asyc first and must return a promise i.e require promises
//JSON.stringify(obj, replacer, space)

const fs = require('fs').promises;

async function init() {
    const notees = [{ id: 0, content: "This is note 0" }];
    await fs.writeFile("notes.json", JSON.stringify(notees));
}
async function readall() {
    const data = await fs.readFile('notes.json');
    return JSON.parse(data);
}
const readnote= async (idi)=>{
    const notes = await readall();
    let note = notes.find((note)=>note.id===idi);
    if (note) {
        console.log(`The note is: ${JSON.stringify(note)}`);
    } else {
        console.log("Note not found");
    } 
};



const addnotes  = async (content)=>{
    
   const notes = await readall();
    const idi = notes[notes.length - 1].id + 1;
    const newNote = { id: idi, content };
    notes.push(newNote);
    await fs.writeFile("notes.json", JSON.stringify(notes));
    console.log(`Note added: ${JSON.stringify(newNote)}`);
}

const deletenote= async (id)=>{
    let notes = await readall();
    notes = notes.filter((note)=>note.id  !== id);
    await fs.writeFile("notes.json", JSON.stringify(notes));
    console.log("deleted note");
    console.log(notes);
}

async function noteapp(){
    try{
        await init();
        await  addnotes("Task 1");
        await  readnote(1);
        await  deletenote(0);
    }

    catch(err){
        console.log(`error occured ${err}`);
    }
}

noteapp();