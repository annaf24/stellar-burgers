describe('Интеграционные тесты страницы конструктора бургеров', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000/');

    });

    it('добавление булки', () => {
    cy.get('[data-cy="bun-ingredients"]').contains('Краторная булка').click();
    cy.get('[data-cy="constructor"]').should('contain.text', 'Краторная булка');
    })
})