
describe('template spec', () => {
  it('login', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/auth/login',
      body: {
        email: 'John@mail.fr',
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
