// https://on.cypress.io/api

describe('OSS starter tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('about page is there and navigates', () => {
    // Arrange & Act
    cy.get('[href="/about"]').click()
    // Assert
    cy.url().should('include', '/about')
  })

  it('navigate into languages, autocomplete is working and navigates', () => {
    // Arrange
    cy.visit('/languages')

    // Act
    cy.get('[data-cy="language-input"]').type('TypeScript')
    cy.contains('[data-cy=language-suggestion]', 'TypeScript').click()
    cy.get('[data-cy="find-issues"]').click()

    // Assert
    cy.get('[data-cy="language-tab-TypeScript"]').should('be.visible').click()
  })
})
