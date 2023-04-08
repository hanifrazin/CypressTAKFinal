const { faker } = require('@faker-js/faker');
const firstname = faker.name.firstName();
const surname = faker.name.lastName();
const email = faker.internet.email();
const password = '1234567890';
const phone = faker.phone.number();
const username = faker.internet.userName();
const exist_firstname = '';
const empty = '';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
describe('Test Case SignUp', () => {
    beforeEach(() => {
        cy.visit("/")
        cy.get('.form-inline > .navbar-nav > :nth-child(1) > .nav-link').should('have.text', 'Sign Up').click()
        cy.url().should('include','/UserRegister/NewUser')
        cy.get('h2').should('have.text','Add new user')
    });
    
    it('Sign up should be access and success register new user', () => {
        cy.get('#FirstName').type(firstname)
        cy.get('#Surname').type(surname)
        cy.get('#E_post').type(email)
        cy.get('#Mobile').type(phone)
        cy.get('#Username').type(username)
        cy.get('#Password').type(password)
        cy.get('#ConfirmPassword').type(password)
        cy.get('#submit').click()
        cy.get('.label-success').should('have.text','Registration Successful')
    })

    it('Sign up should be handle if all fields are empty',() => {
        cy.get('#submit').click()
        cy.get('#FirstName-error').should('have.text','Please enter first name')
        cy.get('#Surname-error').should('have.text','Please enter surname')
        cy.get('#Username-error').should('have.text','Please enter username')
        cy.get('#Password-error').should('have.text','Please enter password')
    })

    it('Sign up should be handle if confirm password not match with password', () => {
        cy.get('#FirstName').type(firstname)
        cy.get('#Surname').type(surname)
        cy.get('#E_post').type(email)
        cy.get('#Mobile').type(phone)
        cy.get('#Username').type(username+'111')
        cy.get('#Password').type(password)
        cy.get('#ConfirmPassword').type(password+'111')
        cy.get('#submit').click()
        cy.get('#ConfirmPassword-error').should('have.text','\'Confirm password\' and \'Password\' do not match.')
    });

    it('Sign up should be handle if username is exist', () => {
        cy.get('#FirstName').type(firstname)
        cy.get('#Surname').type(surname)
        cy.get('#E_post').type(email)
        cy.get('#Mobile').type(phone)
        cy.get('#Username').type(username)
        cy.get('#Password').type(password)
        cy.get('#ConfirmPassword').type(password)
        cy.get('#submit').click()
        cy.get('.label-danger').should('have.text','Username already exist')
    });


});