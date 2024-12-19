describe('Проверяем доступность приложения', function () {
  it('Сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });
});

describe('Тестирование конструктора бургера', () => {
  //  ингредиенты с сервера
  before(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as(`${'ingredients'}`);
  });

  //  данные пользователя с сервера
  beforeEach('Авторизация пользователя', () => {
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as(`${'user'}`);
    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockReshToken');
  });

  // Выполнить в конце
  afterEach(() => {
    cy.setCookie('accessToken', '');
    window.localStorage.setItem('refreshToken', '');
  });

  beforeEach('Открытие главной страницы', () => {
    cy.visit('http://localhost:4000');
  });

  // сбор и оформление заказа
  describe('Тестирование сбор заказа и его оформление', () => {
    describe('Тестирование добавления ингредиентов в конструктор', () => {
      it('Добавление булок в конструктор', () => {
        cy.get('div').contains('Выберите булки').should('exist');
        cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
        cy.get('div').contains('Выберите булки').should('not.exist');
      });

      it('Добавление начинок в конструктор', () => {
        cy.get('div').contains('Выберите начинку').should('exist');
        cy.get('h3')
          .contains('Начинки')
          .next('ul')
          .contains('Добавить')
          .click();
        cy.get('div').contains('Выберите начинку').should('not.exist');
      });

      it('Добавление соусов в конструктор', () => {
        cy.get('div').contains('Выберите начинку').should('exist');
        cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();
        cy.get('div').contains('Выберите начинку').should('not.exist');
      });

      it('Сбор бургера и оформление заказа', () => {
        cy.contains('user').should('exist');
        // Перехват обращения к API
        cy.intercept('POST', 'api/orders', {
          fixture: 'order.json'
        }).as(`${'order'}`);

        //Сбор бургера
        cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
        cy.get('h3')
          .contains('Начинки')
          .next('ul')
          .contains('Добавить')
          .click();
        cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();

        //оформить заказ
        cy.contains('Оформить заказ').click();

        cy.wait('@order').its('response.statusCode').should('eq', 200);

        // открыть мод окно
        cy.contains('6655').should('exist');

        // закрытие esc
        cy.get(`body`).type('{esc}');
        cy.get(`body`).type('{esc}');

        // проверка очистки
        cy.contains('Выберите начинку').should('exist');
        cy.contains('Выберите булки').should('exist');
      });
    });
  });

  // модальные окна
  describe('Тестирование открытия и закрытия модальных окон', () => {
    beforeEach('Открытие главной страницы', () => {
      cy.contains('Говяжий метеорит (отбивная)').click();
    });
    it('Закрытие модального окна по нажатию на крестик', () => {
      cy.get('#modals').find('button').click();
      cy.get('#modals').should('be.empty');
      cy.get('div').contains('Детали ингредиента').should('not.exist');
    });
    it('Закрытие модального окна по нажатию оверлей', () => {
      cy.contains('Детали ингредиента').should('exist');
      cy.get(`body`).type('{esc}');
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });
});
