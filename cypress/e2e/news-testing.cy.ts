const tokenTmp = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZXJiZWxsb25pQGRldi1pZC5mciIsImlkIjoiNjVkODYwMzQyZDRkNDA1MjVkZTY1NTY2Iiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzEwNDkwNjYzLCJleHAiOjE3MTEwOTU0NjN9.myaKfsmCauoVz4TndA7QRYMdsOjYQXfjeu-TTbvVQS4';
describe('Testing login', () => {
  it('login', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/auth/login',
      body: {
        email: 'aserbelloni@dev-id.fr',
        password: 'Motdepasse@@@',
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.be.eq(201);
      expect(response.body).to.have.property("accessToken").that.is.a('string');
    });
  });
  it('login failed', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/auth/login',
      body: {
        email: 'John@mail.fr',
        password: 'Motdepasse',
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.not.be.eq(200 || 201 || 202 || 203);
      expect(response.body.error).to.be.eq('Unauthorized');
    });
  });
});

describe('testing register', () => {
  it('register', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/auth/register/',
      body: {
        email: 'Johnny@mail.fr',
        password: 'Motdepasse@@@',
        firstname: 'John',
        lastname: 'Doe'
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.be.eq(201);
      expect(response.body).to.have.property("id").that.is.a('string');
      expect(response.body).to.have.property("email").that.is.a('string');
      expect(response.body).to.have.property("firstname").that.is.a('string');
      expect(response.body).to.have.property("lastname").that.is.a('string');
      expect(response.body).to.have.property("role").that.is.a('string');
    });
  });

  it('register failed', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/auth/register/',
      body: {
        email: 'aserbelloni@dev-id.fr',
        password: 'Motdepasse@@@',
        firstname: 'John',
        lastname: 'Doe'
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.be.eq(400);
      expect(response.body.message).to.be.eq('EMAIL_ALREADY_EXISTS');
    });
  });
});

describe('Testing add delete udpate news', () => {
  it('get all news', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/news/',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.eq(200);
    });
  });
  it('add one news', () => {
    cy.request({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenTmp}`
      },
      url: 'http://localhost:3000/api/v1/news/',
      body: {
        title: "Once upon a time",
        content: "a test",
        imageUrl: 'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg'
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.not.be.eq(400 || 401 || 402 || 404);
      expect(response.body).to.have.property('id').that.is.a('string');
      expect(response.body).to.have.property('title').that.is.a('string');
      expect(response.body).to.have.property('content').that.is.a('string');
      expect(response.body).to.have.property('imageUrl').that.is.a('string');
      expect(response.body.user.id).to.be.a('string');
    });
  });
  it('delete news not found', () => {

  });
  it('delete news', () => {
    cy.request({

    });
  })
});
