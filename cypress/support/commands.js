// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/Login')
    cy.get('#Username').type(username)
    cy.get('#Password').type(password)
    cy.get('.btn-primary').should('have.value','Login').click()
});

Cypress.Commands.add('dashboard', (username) => {
    cy.url().should('include','/Dashboard')
    cy.get('h1').should('have.text','Dashboard')
    cy.get('h3').should('have.text',`Welcome ${username}`)
})

Cypress.Commands.add('access_create_customer', () => {
    cy.get(':nth-child(4) > .btn').should('have.text','Create New').click()
    cy.url().should('include','/Customer/Create')
    cy.get('h2').should('have.text','Create')
    cy.get('h4').should('have.text','Customer')
})

Cypress.Commands.add('search_customer', (data,keterangan) => {
    let index = 0;
    if(keterangan === 'name'){
        index = 1;
    }else if(keterangan === 'email'){
        index = 6
    }
    cy.get('#searching').type(data)
    cy.get('.container > div > form > .btn').should('have.value','Search').click()
    cy.get(`tbody > :nth-child(2) > :nth-child(${index})`).contains(data)
})

Cypress.Commands.add('search_deleted_customer', (data) => {
    let index = 0;
    cy.get('#searching').type(data)
    cy.get('.container > div > form > .btn').should('have.value','Search').click()
    cy.get('td').contains('No Match')
})

Cypress.Commands.add('access_detail_customer', (data) => {
    cy.url().should('include','/Customer/Details')
    cy.get('h2').should('have.text','Details')
    cy.get('h4').should('have.text','Customer')
    cy.get('.dl-horizontal > :nth-child(2)').contains(data.name)
    cy.get('.dl-horizontal > :nth-child(4)').contains(data.company)
    cy.get('.dl-horizontal > :nth-child(6)').contains(data.address)
    cy.get('.dl-horizontal > :nth-child(8)').contains(data.city)
    cy.get('.dl-horizontal > :nth-child(10)').contains(data.phone)
    cy.get('.dl-horizontal > :nth-child(12)').contains(data.email)
})