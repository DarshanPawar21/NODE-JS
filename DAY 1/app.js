import fs from 'fs';
fs.writeFileSync("index.html","<div></div>",(err)=>{
    if(err) throw err;
    console.log("File created successfully");
})
fs.readFile("index.html","utf-8",(err,data)=>{
    if(err) throw err;
    console.log(data);
})
