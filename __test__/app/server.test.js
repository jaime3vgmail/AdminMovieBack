const axios = require('axios');



  const url = 'http://localhost:8080/api/movies/';
  
  describe('Validar backend /api/movies', () => {
    test('El /api/movies', async () => {
      const res = await axios.get(url)

      expect(res).toBeTruthy()
      expect(res.status).toBe(200)      
    })
  })


  const urlHealtCheck = 'http://localhost:8080/healthcheck/';
  
  describe('HealtCheck', () => {
    test('El HealtCheck', async () => {
      const res = await axios.get(urlHealtCheck)

      expect(res).toBeTruthy()
      expect(res.status).toBe(200)      
    })
  })

  const urlUsers = 'http://localhost:8080/validateUser/';
  
  describe('Simple Post', () => {
    test('POST', async () => {
      // No preflight OPTIONS request sent when jest-environment is node
      const x = await axios.post(urlUsers,
        {data: {foo: 42}},
        {headers: {'X-Special-Token': 'DATA'}});
      expect(x.status).toBe(200);
    });
  });