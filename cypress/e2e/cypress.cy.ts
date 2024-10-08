describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      statusCode: 201,
      fixture: 'order.json'
    }).as('createOrder');

    cy.intercept('GET', 'norma.nomoreparties.space/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
  });

  it('проверка на добавление ингредиента', () => {
    cy.wait('@getIngredients');
    cy.get('[data-testid="ingredient"]').eq(2).as('ingredient');
    cy.get('@ingredient').find('button').contains('Добавить').click();

    cy.get('@ingredient')
      .find('p.text_type_main-default')
      .invoke('text')
      .then((text) => {
        cy.get('[data-testid="constructor"] .constructor-element__text')
          .contains(text)
          .should('exist');
      });
  });

  it('Откртыие модалки', () => {
    cy.get('[data-testid="ingredient"]').first().click();

    cy.get('[data-testid="modal"]').should('exist');
  });

  it('Закрытие модалки', () => {
    cy.get('[data-testid="ingredient"]').first().click();

    cy.get('[data-testid="modal"]').should('exist');

    cy.get('[data-testid="modal"] button').click();

    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('Создание заказа', () => {
    cy.get('[data-testid="ingredient"]').eq(0).as('bun');
    cy.get('@bun').find('button').contains('Добавить').click();

    cy.get('[data-testid="ingredient"]').eq(2).as('ingredient');
    cy.get('@ingredient').find('button').contains('Добавить').click();

    cy.get('[data-testid="constructor"] button')
      .contains('Оформить заказ')
      .click();

    cy.wait('@createOrder', { timeout: 10000 }).then((data) => {
      console.log('data', data);
    });

    cy.get('[data-testid="modal"]').should('exist');

    cy.get('[data-testid="modal"] h2').contains('54657');

    cy.get('[data-testid="modal"] button').click();

    cy.get('[data-testid="modal"]').should('not.exist');
  });
});
