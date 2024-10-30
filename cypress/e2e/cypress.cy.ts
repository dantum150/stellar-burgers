describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('POST', '/api/orders', {
      statusCode: 201,
      fixture: 'order.json'
    }).as('createOrder');

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 201,
      fixture: 'user.json'
    }).as('loginUser');

    cy.intercept('GET', '/api/auth/user', {
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

  it('Открытие модалки с проверкой текста ингредиента', () => {
    // Сохраняем текст ингредиента, чтобы сравнить его с текстом в модалке
    cy.get('[data-testid="ingredient"]')
      .first()
      .find('p.text_type_main-default')
      .invoke('text')
      .then((ingredientText) => {
        // Открываем модальное окно, кликнув по ингредиенту
        cy.get('[data-testid="ingredient"]').first().click();

        // Проверяем, что модальное окно открылось
        cy.get('[data-testid="modal"]').should('exist');

        // Сравниваем текст ингредиента с текстом в заголовке модального окна
        cy.get('[data-testid="modal"] h3.text_type_main-medium')
          .invoke('text')
          .should((modalText) => {
            expect(modalText.trim()).to.equal(ingredientText.trim());
          });
      });
  });

  it('Закрытие модалки', () => {
    cy.get('[data-testid="ingredient"]').first().click();

    cy.get('[data-testid="modal"]').should('exist');

    cy.get('[data-testid="modal"] button').click();

    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('Создание заказа', () => {
    cy.visit('http://localhost:4000/login');

    // Ввод email и пароля
    cy.get('input[name="email"]').type('example@mail.ru');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginUser');
    // Проверка, что перешли на главную страницу
    cy.url().should('eq', 'http://localhost:4000/');

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
