describe('Music App E2E Scenario', () => {
  it('Should load songs, filter results, and handle "Not Found" state', () => {
    // 1. Відкриття головної сторінки
    cy.visit('/');

    // 2. Перевірка, що користувач на правильному сайті
    cy.contains('Пошук музики');

    // 3. 10 секунд очікування завантаження карток з Firebase
    cy.get('.card', { timeout: 10000 }).should('have.length.at.least', 1);

    // 4. ТЕСТ ПОШУКУ: Ввід "Kalush"
    cy.get('input[type="text"]').type('Kalush');
    
    // Перевірка, що залишилась тільки 1 картка
    cy.get('.card').should('have.length', 1);
    // Перевірка, що це пісня саме введеного автора
    cy.contains('Stefania');

    // 5. ТЕСТ "НЕ ЗНАЙДЕНО": Ввід рандомних символів
    cy.get('input[type="text"]').clear().type('hru123321');
    
    // Перевірка, що з'явився текст помилки
    cy.contains('нічого не знайдено');

    // 6. ТЕСТ СКИДАННЯ: Натискання кнопки "Скинути фільтри"
    cy.contains('button', 'Скинути фільтри').click();

    // Перевірка, що пісні повернулися
    cy.get('.card').should('have.length.at.least', 1);
  });
});