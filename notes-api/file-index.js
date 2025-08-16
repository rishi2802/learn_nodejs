const fs = require("fs").promises;
const http = require("http");

const server = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    //readAll

    try {
      // Try to access the file
      await fs.access("notes.json");
      console.log(`file exits`);

      const data = await fs.readFile("notes.json", "utf8");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    } catch (err) {
      // File does not exist, so create it
      const notes = [
        {
          id: 0,
          sender: "Pippa Fitz Amobi",
          message: "Welcome to the investigation chat",
        },
      ];
      await fs.writeFile("notes.json", JSON.stringify(notes, null, 2));
      console.log("Created notes.json with initial note.");
      res.end(JSON.stringify(notes));
    }
  }

  if (req.url.startsWith("/") && req.method === "GET" && req.url !== "/") {
    //read by id
    try {
      const id = parseInt(req.url.split("/")[1]);
      const data = JSON.parse(await fs.readFile("notes.json", "utf8"));
      const note = data.find((note) => note.id === id);
      if (note) {
        console.log(`Message Found id: ${id}, ${JSON.stringify(note)}`);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(note));
      } else {
        console.log(`Message id: ${id} Not Found`);
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(`Message id: ${id} Not Found`);
      }
    } catch (err) {
      console.log(`Error Found in GET method with id- ${err}`);
      res.writeHead(404, { "Content-Type": "plain/text" });
      res.end(JSON.stringify(err));
    }
  }

  if (req.url === "/" && req.method === "POST") {
    try {
      console.log(`POST TARTED`);
      let data = JSON.parse(await fs.readFile("notes.json", "utf8")); //utf8 redas the data in string instead of binary buffer
      console.log(`POST GOING`);
      const id = data[data.length - 1].id + 1;
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const note = JSON.parse(body);
        const newNote = { id: id, sender: note.sender, message: note.message };
        data.push(newNote);
        await fs.writeFile("notes.json", JSON.stringify(data, null, 2));
        res.writeHead(201, { "Content-Type": "application/json" }); // Status code 201 - created successfully
        console.log(
          `New Note written succesfully,\n${JSON.stringify(newNote)}`
        );
        res.end(JSON.stringify(newNote));
      });
    } catch (err) {
      console.log(`Written failed - ${JSON.stringify(err)}`);
      res.writeHead(500, { "Content-Type": "plain/text" });
    }
  }

  if (req.url.startsWith("/") && req.url !== "/" && req.method === "POST") {
    const id = parseInt(req.url.split("/")[1]);
    console.log(`POST to id: ${id}`);

    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString(); // collect incoming body
    });

    req.on("end", async () => {
      try {
        // Parse the incoming JSON
        const data = JSON.parse(body);

        // Read existing notes
        let notes = JSON.parse(await fs.readFile("notes.json", "utf8"));

        // Add new note
        const newNote = { id, sender: data.sender, message: data.message };
        notes.push(newNote);

        // Write back to file
        await fs.writeFile("notes.json", JSON.stringify(notes, null, 2));

        // Send response
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, note: newNote }));
        console.log(`Message with id ${id} written successfully`);
      } catch (err) {
        console.log(`Error writing into id:${id}, error: ${err}`);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ error: "Invalid request", details: err.message })
        );
      }
    });

    
  }
  if (
    req.method === "DELETE" &&
    req.url !== "/" &&
    req.url !== "/favicon.ico"
  ) {
    console.log("DELETE request received for:", req.url);

    const id = parseInt(req.url.split("/")[1]);
    if (isNaN(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid ID" }));
      return;
    }

    try {
      let notes = JSON.parse(await fs.readFile("notes.json", "utf8"));

      const beforeLength = notes.length;
      notes = notes.filter((note) => note.id !== id);

      if (notes.length === beforeLength) {
        // ID not found
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Note not found" }));
        return;
      }

      await fs.writeFile("notes.json", JSON.stringify(notes, null, 2));
      res.writeHead(204);
      res.end();
    } catch (err) {
      console.log(`error - ${err}`);
      res.writeHead(500, { "Content-Type": "plain/text" });
      res.end(`Deletion failed - ${JSON.stringify(err.message)}`);
    }
  }
});

server.listen(3000, () => {
  console.log(`Successfully connected to chat`);
});
