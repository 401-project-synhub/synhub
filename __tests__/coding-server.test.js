require('../chat-app/coding-server.js');
const supertest = require('supertest');
const app = require('../app.js').app;
const request = supertest(app);

// const getUserRooms = require('../chat-app/coding-server.js').getUserRooms();


it('gets the test endpoint', async done => {
  const response = await request.get('/test');
  
  expect(response.status).toBe(302);
  done();
});


describe('GET Endpoints', () => {
  it('gets the coding endpoint', async done => {
    const response = await request.get('/coding');
    expect(response.status).toBe(200);
    done();
  });
});

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await supertest(app)
      .post('/room');
    expect(res.statusCode).toEqual(302);
    // console.log(res.body);
    // expect(res.body).toHaveProperty();
  });
});


// describe('GET a room ', () => {
//   it('should return room name', () => {
//     let socket= {socket: '123'}; 
//     let names= ['test'];
//     expect(getUserRooms(socket)).toEqual(names);

//   });
// });
  

