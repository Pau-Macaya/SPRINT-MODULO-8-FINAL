import express from 'express';
import hbs from 'hbs';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import {Skater} from './Skater.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const skater = new Skater();
const secret = "springM8"
let skaters = await skater.getskaters();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', async (req, res) => {
  
        const token = req.query.token;
        jwt.verify(token, 'springM8', (err, decoded) => {
            if (err) {
              console.error('Error al verificar el token:', err.message);
              res.render('index', { skaters });

            } else {
                let rol = decoded.rol;
                let admin = decoded.admin;
              res.render('index', { skaters, rol, admin, token });
            }
        });
        
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/registro', (req, res) => {
    res.render('registro');
});

app.get ('/admin', (req, res) => {

    const token = req.query.token; //obtiene token de la url
    jwt.verify(token, 'springM8', (err, decoded) => { //verifica el token
        if (err) {
          console.error('Error al verificar el token:', err.message);
          res.redirect(`/?token=${token}`); // si esta malo devuelve el token a la ruta raiz

        } else {
            // si esta bueno toma el valor admin(booleano) y consulta si es true
            let admin = decoded.admin;
            if (admin) {
                res.render('admin',{skaters}); // si es true significa que el usuario tiene el rol de admin asique renderiza admin.hbs
            }else{
                res.redirect(`/?token=${token}`); // de lo contrario si el usuario no es admin devuelve a la raiz y redirige el token
            }
        }
    });
    
});

app.get ('/datos', (req, res) => {
    const token = req.query.token;
    jwt.verify(token, 'springM8', (err, decoded) => {
        if (err) {
          console.error('Error al verificar el token:', err.message);
          res.redirect('/');

        } else {
            let admin = decoded.admin;
            if (admin) {
                res.redirect(`/?token=${token}`);
            }else{
                //  guardamos los dados del token en variables que luego enviamos a la vista para rellenar el formulario
                let email =decoded.email
                let nombre =decoded.nombre
                let anos_experiencia =decoded.anos_experiencia
                let especialidad =decoded.especialidad
                let foto =decoded.foto

                res.render('datos',{email,nombre,anos_experiencia,especialidad,foto,skaters});
            }
        }
    });
})

app.post('/login', async (req, res) => {
//    admin validado then
let user = req.body; //email, pasword
//console.log(user);

try {
    //console.log(await skater.validuser(user.email,user.password));
    if(await skater.validuser(user.email,user.password)){
    const selectskater =  await skater.getSkater(user.email,user.password)  
    const token = jwt.sign(selectskater[0],secret,{expiresIn:"1m"})
    res.redirect(`/?token=${token}`);
    } else {
        res.status(400).redirect('/login');
    }

} catch (error) { 
    console.log(error);   
}
  });

app.post('/registro', async (req, res) => {
     // recepcion del formulario    
    //  console.log("server.js ", req.body);
    try{
        await skater.newSkater(req.body.email, req.body.nombre, req.body.password, req.body.years, req.body.especialidad, req.body.foto);
        res.redirect(`/?token=${token}`);
    }
    catch{
        res.status(400).redirect('/registro');
    }

 
});

app.post('/admin', async (req, res) => {
    const user = req.body;
    console.log(user);
    try{
        await skater.updateEstado(user.email, user.estado);
        res.redirect('/admin');
    }catch{
        res.status(400).redirect('/admin');
    }
})


app.listen(3000, () => {
    console.log('Server on port 3000');
});