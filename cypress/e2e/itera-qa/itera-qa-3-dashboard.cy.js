const { faker } = require('@faker-js/faker');
const name = faker.name.fullName();
const company = faker.company.catchPhraseAdjective();
const email = faker.internet.email();
const phone = faker.phone.number();
const address = faker.address.streetName();
const city = faker.address.cityName();
const changeAddress = faker.address.streetAddress();
const changeCity = faker.address.cityName();
const changePhone = faker.phone.imei();

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe('Test Case Dashboard', () => {
    beforeEach(() => {
        cy.login('Rylan85','1234567890')
        cy.dashboard('Rylan85')
    });

    it('Should be success create new data', () => {
        cy.access_create_customer()
        cy.get('#Name').type(name)
        cy.get('#Company').type(company)
        cy.get('#Address').type(address)
        cy.get('#City').type(city)
        cy.get('#Phone').type(phone)
        cy.get('#Email').type(email)
        cy.get('.col-md-offset-2 > .btn').should('have.value','Create').click()
        cy.url().should('include','/Dashboard')
    });

    it('Should be success back to dashboard', () => {
        cy.access_create_customer()
        cy.get(':nth-child(3) > .btn').should('have.text','Back to List').click()
        cy.url().should('include','/Dashboard')
    });

    it('Should be success search by name was created', () => {
        cy.search_customer(name,'name')
    });

    it('Should be success search by email was created', () => {
        cy.search_customer(email,'email')
    });

    it('Should be access detail data was created', () => {
        cy.search_customer(name,'name')
        cy.get('tbody > :nth-child(2) > :nth-child(7) > .btn-outline-info').contains('Detail').click()
        const data = {
            'name' : name,
            'company' : company,
            'address' : address,
            'city' : city,
            'phone' : phone,
            'email' : email
        }
        cy.access_detail_customer(data)
    });

    it('Should be success edit data', () => {
        cy.search_customer(name,'name')
        cy.get('tbody > :nth-child(2) > :nth-child(7) > .btn-outline-primary').contains('Edit').click()
        cy.get('#Name').should('have.value',name)
        cy.get('#Company').should('have.value',company)
        cy.get('#Address').should('have.value',address).clear().type(changeAddress)
        cy.get('#City').should('have.value',city).clear().type(changeCity)
        cy.get('#Phone').should('have.value',phone).clear().type(changePhone)
        cy.get('#Email').should('have.value',email)
        cy.get('.col-md-offset-2 > .btn').should('have.value','Save').click()
        cy.url().should('include','/Dashboard')
    });

    it('Should be access detail data was changed', () => {
        cy.search_customer(name,'name')
        cy.get('tbody > :nth-child(2) > :nth-child(7) > .btn-outline-info').contains('Detail').click()
        const data = {
            'name' : name,
            'company' : company,
            'address' : changeAddress,
            'city' : changeCity,
            'phone' : changePhone,
            'email' : email
        }
        cy.access_detail_customer(data)
    });

    it('Should be success delete data', () => {
        cy.search_customer(name,'name')
        cy.get('tbody > :nth-child(2) > :nth-child(7) > .btn-outline-danger').contains('Delete').click()
        cy.get('.dl-horizontal > :nth-child(2)').contains(name)
        cy.get('.dl-horizontal > :nth-child(4)').contains(company)
        cy.get('.dl-horizontal > :nth-child(6)').contains(changeAddress)
        cy.get('.dl-horizontal > :nth-child(8)').contains(changeCity)
        cy.get('.dl-horizontal > :nth-child(10)').contains(changePhone)
        cy.get('.dl-horizontal > :nth-child(12)').contains(email)
        cy.get('.btn-outline-danger').should('have.value','Delete').click()
    });

    it('Should be success search by name was deleted', () => {
        cy.search_deleted_customer(name)
    });
});

