const http = require('http');

let notes =[{id:1, sender: "pip", message :"Heyy ravishing"}];

const server = http.createServer((req,res)=>{
    if(req.url === '/notes' && req.method ==='GET'){
        console.log('response sent to notes in method GET');
        res.writeHead(200,{"Content-Type":'application/json'});
        res.end(JSON.stringify(notes));
    }
    if(req.url === '/' && req.method ==='GET'){
        console.log('response sent to notes in method GET');
        res.writeHead(200,{"Content-Type":'application/json'});
        res.end(JSON.stringify("heyy there, This is ravi and pip secret note to solve crimes."));
    }

    else if(req.url.startsWith('/notes/') && req.method === 'GET'){
       const id = parseInt(req.url.split('/')[2]);
        const note = notes.find((note)=> note.id === id);
        if(note){
        console.log('response sent to notes in method GET');
        res.writeHead(200,{"Content-Type":'application/json'});
        res.end(JSON.stringify(note));
        }
        else{
            console.log(`Note with id : ${id} is not found `);
            res.writeHead(200, {'Content-type':'application/json'});
            res.end(JSON.stringify(`OOPSI! This message id isnt availble, maybe you should put it in😃`));
        }
    }

        else if(req.url === '/notes' && req.method === 'POST'){
            console.log("hi");
            const id = notes[notes.length-1].id+1;
            let body = '';
            req.on('data', chunk =>{
                console.log(chunk.toString());
                body+= chunk.toString();
            }); 
            req.on('end', ()=>{
                const contet = JSON.parse(body);
                const newNote = {id, sender: contet.sender, message: contet.message };
                notes.push(newNote);
                res.writeHead(200, {"Content-Type": 'application/json'});
                console.log("Message sent ❤️")
                res.end(JSON.stringify(newNote));
                console.log(notes);
            });
        }
        else if(req.url.startsWith("/notes") && req.method === "PUT"){
            const id = parseInt(req.url.split('/')[2]);
            let body ='';
            req.on('data', chunk =>{
                body+= chunk.toString();
                console.log(body);
            });
            console.log("reading the message!");

            req.on('end', ()=>{
                const editnote = JSON.parse(body);
                const note = notes.find((note)=> note.id === id);
                note.sender = editnote.sender;
                res.writeHead(200, {"Content-Type": 'application/json'});
                res.end(JSON.stringify(note));
                console.log(notes);
            });
        }
        else if(req.url.startsWith("/notes/") && req.method === "DELETE"){
            const id = parseInt(req.url.split("/")[2]);
            const sender = notes.find((note => note.id == id));
            notes = notes.filter(note => note.id !== id);
            res.writeHead(201, {"Content-Type": 'application/json'});
            res.end(JSON.stringify(`Message with id: ${id} from ${sender}🥲`));
            console.log(notes);

        }
    else{
        res.writeHead(404, {"Content-Type": 'text/plain'});
        res.end("OIII WHO ARE YOU? MAX HASTINGGG?? GET OUT!🤬🤬");
    }

});



server.listen(3100, ()=>{
    console.log("You are now connected to the port 3100 to read the crime communication note 🕶️🔎");
});