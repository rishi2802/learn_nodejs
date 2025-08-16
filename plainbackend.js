
let notes=[{
    id:0,
    content: "Wake up"
}];

const getNotes = () =>{
    console.log(notes);
    return notes;
}

const getNoteById = (idi) => {
    const idnote = notes.find(note => note.id === idi);
    console.log(`note at id:${idi}: ${idnote.content}`);
    return idnote.content;
}

const addNote=(content)=>{
    const idi = notes.length? notes[notes.length-1].id +1 :1;
    notes.push({id: idi, content});
    console.log(`note added at id: ${idi}`);
}

const updateNote = (id, newContent)=>{
    const upnote = notes.find(note=>note.id == id);
    upnote.content = newContent;
    return upnote;
}

const deleteNote = (id) =>{
    notes = notes.filter((note)=> note.id !== id);
    console.log(`note deleted at ${id}`);
    getNotes();
    return notes;
}

addNote("hello");
getNotes();
getNoteById(1);
updateNote(1,"Brush teeth");
getNotes();
deleteNote(1);
getNotes(); 
addNote("Go to gym");
getNotes(); 
addNote("Go to work");
getNotes();
addNote("Go to home");
getNotes();
deleteNote(2);