const express = require('express');//funcion express
const bodyParser = require('body-parser');//funcion bodyparser
const app=express();//se inicializa express
const port=process.env.port || 5000; //indica el puerto
app.use(bodyParser.urlencoded({extended: false}));//para el bodyparser,extensiones
app.use(bodyParser.json());
//________________________________________________________________________________________________
// Se crean los usuarios de las tabla users,id,nombre,apellido,email.
const users = [
{dni: 01, firstname: 'Fabi', lastname: 'Soto', Email: 'fabiSoto@gmail.com'},
{dni: 02, firstname: 'Valery', lastname: 'Soto', Email: 'Vale_S@gmail.com'},
{dni: 03, firstname: 'Maria', lastname: 'Cascante', Email: 'MSC@gmail.com'},
{dni: 04, firstname: 'Fabricio', lastname: 'Gutierrez', Email: 'FABRI_G@gmail.com'}]

//se crean todos lleva dni,titulo,llaves,y el userdni 
const todos=[
{dni:01,title:'INA',keywords:'importante',userdni:1},
{dni:02,title:'Universidad',keywords:'estudios',userdni:2},
{dni:03,title:'Trabajo',keywords:'orden',userdni:3},
{dni:04,title:'casa',keywords:'oficio',userdni:4}]

//se crea tasks lleva dni de la tarea,titulo,completo o incompleto,el tododni y el userdni
const tasks=[
{dnit:01,title:'Terminar proyecto',completed:0,tododni:1,userdni:01},
{dnit:02,title:'Clases de refuerzo',completed:0,tododni:2,userdni:02},
{dnit:03,title:'Llamar proveedores',completed:1,tododni:3,userdni:03},
{dnit:04,title:'Lavar ropa',completed:0,tododni:4,userdni:04}
]
//________________________________________________________________________________________________
app.get('/users/todos/:userdni', (req, res) =>{ //buscar por el dni del usuario,llave foranea en todos que le corresponde
    const {userdni} = req.params;
    const all = todos.filter((all) => all.userdni === Number(userdni))[0];///filtra segun el dni que le colocaron
    const task = tasks.filter((task) => task.userdni === Number(userdni))[0];//filtra dni en tasks
    res.json({ok: true, task,all});
});

app.get('/users/:userdni/:todos', (req, res) =>{ //buscar por el dni del usuario,llave foranea en todos que le corresponde
    const {userdni} = req.params;
    const user = todos.filter((user) => user.userdni === Number(userdni))[0];///filtra segun el dni que le colocaron
    res.json({ok: true, user});
});

app.post('/todos/:dni/:tasks', (req, res)=>{ //añadir nueva task
    const {title, completed } = req.body;
    if(title && completed ){

        const {dni}=req.params;
        dnit=1;tododni=dni;userdni=dni;
        tasks.forEach(x=>{
            var cont=1;
            if(x.dni == cont)
            {
                cont++; 
            }
        });
        tasks.push({dnit, title, completed, tododni,userdni});//funcion push
        const task=tasks[tasks.length-1];
        res.json({ok: true, tasks});
    }
});

app.get('/',(_,res)=>{//el get para la captura del resultado
res.send('welcome Express app');//anuncio de entrada localhost5000
});

app.get('/users',(_,res)=>{//captura los usuarios que esta escrito
res.json({ok: true, users});
});

app.get('/user/:dni', (req, res) =>{ //buscar por el dni del usuario
    const {dni} = req.params;
    const user = users.filter((user) => user.dni === Number(dni))[0];
    res.json({ok: true, user});
});

app.post('/users/adduser', (req, res)=>{ //añadir nuevo usuario
    const {dni, firstname, lastname, Email } = req.body;
    if(dni && firstname && lastname && Email){
        users.push({dni, firstname, lastname, Email});//funcion push
        res.json({ok: true, users});
    }
});


app.listen(port,()=>{// indica a cual puerto va
console.log(`Server is run on port: ${port}`);
});
