var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var port = process.env.PORT || 8080  // establecemos nuestro puerto

app.get('/', function(req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })   
});


//Conectando al backend para obtener las peliculas
app.get('/api/movies', function(req, res) {

    try
    {

        let url="https://comicvine.gamespot.com/api/movies/?api_key=b6bd313da96a3c6ceddae3afe0253db9685ddf9e&format=json"
        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
      
          data=myJson;
          res.json(data);   
            // console.log(data)
        })
        .catch(error => 
            res.json({ error: error.message })
        );

    }
    catch(error)
    {
        res.json({ error: error.message,stack:error.stack });   
    }
})

app.get('/healthcheck', function(req, res) {
  try
  {
    res.json({ mensaje: 'OK' });
  }
  catch(error)
  {
      res.json({ error: error.message,stack:error.stack });   
  }
})

app.post('/validateUser', function(req, res) {
  try
  {
    console.log('Got body:', req.body);
    // console.log('Got body:', req);
      if (req.body== null || req.body.username==null)
      {
        res.status(500).json({ error: 'Username Requerido' });    
      }
      if (req.body== null || req.body.password==null)
      {
        res.status(500).json({ error: 'Password Requerido' });    
      }
      res.json({ mensaje: 'Cliente Valido' });
    
    
  }
  catch(error)
  {
      res.json({ error: error.message,stack:error.stack });   
  }
})

// app.del('/', function(req, res) {
//   res.json({ mensaje: 'Método delete' })  
// })

// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)