describe('тест корректного добавления ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('добавление булки', () => {
    cy.get('[data-cy="bun-ingredients"]')
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy="constructor-bun-top"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy="constructor-bun-bottom"]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('добавление начинки', () => {
    cy.get('[data-cy=mains-ingredients]')
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy=sauces-ingredients]')
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist');
  });
});

describe('тест корретной работы модального окна ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('модальное окно открывается', () => {
    cy.get('[data-cy=modal]').should('not.exist');
    cy.contains('Краторная булка N-200i').click({ force: true });
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('закрытие модального окна по кнопке', () => {
    cy.contains('Краторная булка N-200i').click({ force: true });
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('оформление заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('сборка бургера', () => {
    cy.get('[data-cy=bun-ingredients]')
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy=mains-ingredients]')
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy=sauces-ingredients]')
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy=order-summ] button').click({ force: true });

    cy.wait('@order')
      .its('request.body')
      .should('deep.equal', {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ]
      });

    cy.get('[data-cy=order-number]').contains('12345').should('exist');

    cy.get('[data-cy=modal-close]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist', { timeout: 5000 });

    cy.get('[data-cy=constructor]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Соус Spicy-X')
      .should('not.exist');
  });
});
