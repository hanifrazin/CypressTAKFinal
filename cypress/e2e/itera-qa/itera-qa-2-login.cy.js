Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe('Test Case Login-Logout', () => {
    beforeEach(() => {
        cy.visit("/")
        cy.get('.form-inline > .navbar-nav > :nth-child(2) > .nav-link').should('have.text','Login').click()
        cy.url().should('include','/Login')
        cy.get('table > tbody > tr > :nth-child(2)').contains('LOGIN')
    });

    it('Should be successfull login', () => {
        cy.login('Rylan85','1234567890')
        cy.dashboard('Rylan85')
    });

    it('Should be success clear Form Login', () => {
        cy.get('#Username').type('usersaja')
        cy.get('#Password').type('password')
        cy.get(':nth-child(7) > :nth-child(2) > .btn-secondary').click()
        cy.get('#Username').should('have.value','')
        cy.get('#Password').should('have.value','')
    })

    it('Should be handle error if username and password wrong', () => {
        cy.login('Rylan855','111222333')
        cy.get('.alert-danger').should('have.text','Wrong username or password')
    })

    it('Should be handle error if user doesn\'t input username and password', () => {
        cy.get('.btn-primary').click()
        cy.get('.alert-danger').should('have.text','Wrong username or password')
    })

    it('Should be success redirect to register page', () => {
        cy.get('.btn > a').should('have.text','Not registered? Register here').click()
        cy.url().should('include','/UserRegister/NewUser')
        cy.get('h2').should('have.text','Add new user')
    })

    it('Should be successfull logout after login', () => {
        cy.login('Rylan85','1234567890')
        cy.dashboard('Rylan85')
        cy.get('.form-inline > .navbar-nav > :nth-child(2) > .nav-link').should('have.text','Log out').click()
        cy.url().should('include','/Login')
    })
});