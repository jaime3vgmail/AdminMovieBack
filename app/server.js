var express = require('express') //llamamos a Express
// para establecer las distintas rutas, necesitamos instanciar el express router

var app = express()           
   

var port = process.env.PORT || 8080  // establecemos nuestro puerto

app.get('/', function(req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })   
})


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

app.post('/', function(req, res) {
  res.json({ mensaje: 'Método post' })   
})

// app.del('/', function(req, res) {
//   res.json({ mensaje: 'Método delete' })  
// })

// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)