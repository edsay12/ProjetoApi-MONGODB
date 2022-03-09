import app  from './app.js'
const port = 8081 



app.on('conectado',()=>{
    app.listen(port,()=>{
        console.log("server iniciado")
    });

})




