// Socket.io(html)---------------------------------
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>web chat</title>
// </head>
// <body>
//     <style>
//         /* body{
//             display: flex;
//             justify-content: space-evenly;
//         } */
//         /* ul{
//             border: 2px solid red;
//             max-width: 45%;
//             min-width: 30%;
//             overflow-wrap: break-word;
//         }
//         form{
//             border: 2px solid yellow;
//             max-width: 45%;
//             min-width: 30%;
//         } */
//     </style>

//     <ul id="list">
       
//     </ul>
//     <form id="form">
//         <input type="text" id="input">
//         <button >Send</button>

//     </form>


//     <script src="/socket.io/socket.io.js"></script>  <!-- //doing something that i didnt understood prolly downloading some library or somethang -->
    
//     <script>
//         const socket = io();

//         const username = prompt("Enter your name");

//         socket.emit("setUsername",username);

//         const form = document.getElementById("form");
//         const input = document.getElementById("input");
//         const list = document.getElementById("list");
//         form.addEventListener("submit",e=>{
//             e.preventDefault();
//             if(input.value){
//                 socket.emit("chat message",input.value);
//                 input.value="";

//             }
//         })
//         socket.on("chat message",msg=>{
//             //var text = document.createTextNode(`${user}: ${msg}`)
//         //    document.getElementById("list").appendChild('li').textContent=text;

//             const item = document.createElement("li");
//             item.textContent=msg;
//             item.style.fontSize="1.5rem"
//             console.log(msg);
//             list.appendChild(item);
//         })

//         socket.on("userJoined",msg=>{
//             const item = document.createElement("li");
//             item.innerHTML=msg;
//             console.log(msg);
//             list.appendChild(item);
//         })


//         socket.on("userLeft",msg=>{
//             const item = document.createElement("li");
//             item.innerHTML=msg;
//             console.log(msg);
//             list.appendChild(item);
//         })
//     </script>
    
// </body>
// </html>

// socket.io(js)---------------------------------
// const express = require("express");
// const socketIO = require("socket.io");
// const path = require("path");
// const app = express();



// const server = app.listen(3000,()=>{
//     console.log('server running on 3000');

// });

// app.use(express.static(path.join(__dirname))) //must understand this line plaaz . prolly  a way to serve static html file

// const io = socketIO(server); //server side instance of socketIO

// const users=[];

// io.on("connection",(socket)=>{
//     console.log('A user is connected to the server');

//     socket.on("setUsername",(username)=>{
//         users[socket.id]= username;
//         socket.broadcast.emit("userJoined",`<h3>${username} has joined the chat.</h3>`);
//     })
//     socket.on("chat message",(msg)=>{
//         const username = users[socket.id] || "Anonymous";
//         io.emit("chat message",`${username}: ${msg}`);
//     })

//     socket.on("disconnect",()=>{
//         const username = users[socket.id] || "Anonymous"; 
//         delete users[socket.id];
//         socket.broadcast.emit("userLeft",`<h3>${username} has left the chat</h3>`);

//     })

// })














// compressed&decomp-----------------------------
// const zlib = require('zlib');

// //example data
// const input = "Hello, World!"

// //compress the data
// zlib.gzip(input,(err,compressedData)=>{

//     if(err){
//         console.log("error compressing data: ",err);
        
//         return;
//     }
//     console.log(compressedData);

//     //decompressing data
//     zlib.gunzip(compressedData,(err,decompressedData)=>{
//         if(err){
//             console.log("Error decompressing data: ",err);
//             return;
//         }
//         console.log("Decompressed Data: ", decompressedData);
//         console.log(decompressedData.toString());
//     })
// })






// another code for compression------
// const server = http.createServer((req,res)=>{
//     const filePath = 'text.txt';
//     const readableStream = fs.createReadStream(filePath);
//     res.writeHead(200,{'Content-Type': 'text/plain',
//                             'Content-Encoding': 'gzip'
    
//     });
//     //compressing the file and piping it to the response stream
//     readableStream.pipe(zlib.Gzip().pipe(res));

//     readableStream.on('error',(err)=>{
//         console.log('error reading file: ',err);
//         res.statusCode = 500;
//         res.end('Internal Server error');
//     })
// })
// server.listen(3000,()=>{
//     console.log('server running on 3000');
// })







// postgrresCRUD--------------------------
// //no frontend we rolling on postman now
// const express = require("express");
// const {Pool} = require("pg");

// const app = express();
// const port = 3000;

// const pool = new Pool({
//     user: 'postgres',
//     host: "localhost",
//     database: 'todos',
//     password: '123',
//     port: 6969,
// });

// app.use(express.json());

// //GET all todos
// app.get('/todos',(req,res)=>{
//     pool.query('SELECT * FROM todos',(error,result)=>{
//         if(error){
//             console.error("Error fetching todos",error);
//             res.status(500).json({error: 'Internal server error'});
//         }else{
//             res.json(result.rows);
//         }
//     })
// })

// app.post('/todos',(req,res)=>{

//     const {title , completed} = req.body;
//     pool.query("INSERT INTO todos (title,completed) VALUES ($1,$2)", [title,completed],(error)=>{
//         if(error){
//             console.error("Error creating todo",error);
//             res.status(500).json({error: "Internal server error"});
//         }else{
//             res.status(201).json({message:"Todo created successfully"});
//         }
//     });
// })

// app.put('/todos/:id',(req,res)=>{
//     const {id} = req.params;
//     const {title , completed} = req.body;
//    pool.query('UPDATE todos SET title = $1,completed = $2 WHERE id = $3',[title,completed,id],(err)=>{
//         if(err){
//             console.error('Error updating todos',err);
//             res.status(500).json({error:"Internal server error"});
//         }else{
//             res.json({message:"Updated successfully"});
//         }
//     })
// });


// app.delete('/todos/:id',(req,res)=>{
//     const {id} = req.params;
//     pool.query('DELETE FROM todos WHERE id = $1',[id],(err)=>{
//         if(err){
//             console.error('Error deleting todo',err);
//             res.status(500).json({error:"Internal server error"});
//         }else{
//             res.json({message:'Deleted successfully'});
//         }
//     })
// })


// app.listen(port,()=>{
//     console.log('server running on 3000');
// })