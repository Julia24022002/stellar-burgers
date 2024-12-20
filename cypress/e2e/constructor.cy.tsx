describe('Проверяем доступность приложения', function () {
  // const testUrl = 'http://localhost:4000';
  it('Сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('/');
  });
});

describe('Тестирование конструктора бургера', () => {
  const SELECT_BUNS_TEXT = 'Выберите булки';
  const SELECT_FILLING_TEXT = 'Выберите начинку';
  const BUNS_SECTION_TITLE = 'Булки';
  const FILLINGS_SECTION_TITLE = 'Начинки';
  const MODAL_SELECTOR = '#modals';
  const BODY_SELECTOR = 'body';

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
    localStorage.setItem('refreshToken', 'mockRefreshToken');
  });

  // Выполнить в конце
  afterEach(() => {
    cy.clearCookies();
    localStorage.removeItem('refreshToken');
  });

  beforeEach('Открытие главной страницы', () => {
    cy.visit('/');
  });

  // сбор и оформление заказа
  describe('Тестирование сбор заказа и его оформление', () => {
    describe('Тестирование добавления ингредиентов в конструктор', () => {
      it('Добавление булок в конструктор', () => {
        cy.get('div').contains(SELECT_BUNS_TEXT).should('exist');
        cy.get('h3')
          .contains(BUNS_SECTION_TITLE)
          .next('ul')
          .contains('Добавить')
          .click();
        cy.get('div').contains(SELECT_BUNS_TEXT).should('not.exist');
      });

      it('Добавление начинок в конструктор', () => {
        cy.get('div').contains(SELECT_FILLING_TEXT).should('exist');
        cy.get('h3')
          .contains(FILLINGS_SECTION_TITLE)
          .next('ul')
          .contains('Добавить')
          .click();
        cy.get('div').contains(SELECT_FILLING_TEXT).should('not.exist');
      });

      it('Добавление соусов в конструктор', () => {
        cy.get('div').contains(SELECT_FILLING_TEXT).should('exist');
        cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();
        cy.get('div').contains(SELECT_FILLING_TEXT).should('not.exist');
      });

      it('Сбор бургера и оформление заказа', () => {
        cy.contains('user').should('exist');
        // Перехват обращения к API
        cy.intercept('POST', 'api/orders', {
          fixture: 'order.json'
        }).as(`${'order'}`);

        //Сбор бургера
        cy.get('h3')
          .contains(BUNS_SECTION_TITLE)
          .next('ul')
          .contains('Добавить')
          .click();
        cy.get('h3')
          .contains(FILLINGS_SECTION_TITLE)
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
        cy.get(BODY_SELECTOR).type('{esc}');
        cy.get(BODY_SELECTOR).type('{esc}');

        // проверка очистки
        cy.contains(SELECT_FILLING_TEXT).should('exist');
        cy.contains(SELECT_BUNS_TEXT).should('exist');
      });
    });
  });

  // модальные окна
  describe('Тестирование открытия и закрытия модальных окон', () => {
    beforeEach('Открытие главной страницы', () => {
      cy.contains('Говяжий метеорит (отбивная)').click();
    });
    it('Закрытие модального окна по нажатию на крестик', () => {
      cy.get(MODAL_SELECTOR).find('button').click();
      cy.get(MODAL_SELECTOR).should('be.empty');
      cy.get('div').contains('Детали ингредиента').should('not.exist');
    });
    it('Закрытие модального окна по нажатию оверлей', () => {
      cy.contains('Детали ингредиента').should('exist');
      cy.get(BODY_SELECTOR).type('{esc}');
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });
});
