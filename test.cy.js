/// <reference types = "Cypress"/>

describe('Test Automation Calculator Simulator', () => {
    it('Visit', () => {
        cy.visit('cypress/public/index.html')
    })
    // Проверка контента на клавишах
    it('Verify Contains', () => {
        cy.get('div[class="buttons"]').children().should('have.length', 21) // 17 кнопок, плюс 4-е <br>
        // Цифры
        cy.get('input[class="button number"]').should('be.visible').as('numbres')
        cy.get('@numbres').eq(0).should('have.value', '7')
        cy.get('@numbres').eq(1).should('have.value', '8')
        cy.get('@numbres').eq(2).should('have.value', '9')
        cy.get('@numbres').eq(3).should('have.value', '4')
        cy.get('@numbres').eq(4).should('have.value', '5')
        cy.get('@numbres').eq(5).should('have.value', '6')
        cy.get('@numbres').eq(6).should('have.value', '1')
        cy.get('@numbres').eq(7).should('have.value', '2')
        cy.get('@numbres').eq(8).should('have.value', '3')
        cy.get('@numbres').eq(9).should('have.value', '.')
        cy.get('@numbres').eq(10).should('have.value', '0')
        // Операторы
        cy.get('input[class="button operator"]').should('be.visible').as('operators')
        cy.get('@operators').eq(0).should('have.value', '/')
        cy.get('@operators').eq(1).should('have.value', '*')
        cy.get('@operators').eq(2).should('have.value', '-')
        cy.get('@operators').eq(3).should('have.value', '+')
        // AC
        cy.get('input[class="button clear"]').should('have.value', 'AC')
        // =
        cy.get('input[class="button result"]').should('have.value', '=')
    })
    // Проверка на ввод символов, на двойной ввод символов, на кол-во отображенных символов на дисплее, проверка кнопки AC (23 числа)
    it('Verify Click', () => {
        // Кликаем по цифрам дважды 
        cy.get('input[value="7"]').dblclick()
        cy.get('input[value="8"]').dblclick()
        cy.get('input[value="9"]').dblclick()
        cy.get('input[value="4"]').dblclick()
        cy.get('input[value="5"]').dblclick()
        cy.get('input[value="6"]').dblclick()
        cy.get('input[value="1"]').dblclick()
        cy.get('input[value="2"]').dblclick()
        cy.get('input[value="3"]').dblclick()
        cy.get('input[value="."]').dblclick()
        cy.get('input[value="0"]').dblclick()
        // Если value не равен 778899445566112233..00, то это баг!
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '778899445566112233..00'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '778899445566112233..00')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // Проверяем кнопку AC
        cy.get('input[value="AC"]').click()
        cy.get('input[id="screen"]').should('have.value', '')
        // Кликаем по знакам дважды
        cy.get('input[value="/"]').dblclick()
        cy.get('input[value="*"]').dblclick()
        cy.get('input[value="-"]').dblclick()
        cy.get('input[value="+"]').dblclick()
        // Если value не равен /*-+, то это баг!        
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '/*-+'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '/*-+')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // AC
          cy.get('input[value="AC"]').click()
          cy.get('input[id="screen"]').should('have.value', '')
         // Проверка на кол-во символов на дисплее (по API допустимо не более 23 символов)
         cy.get('input[value="7"]').dblclick().dblclick().dblclick()
                                   .dblclick().dblclick().dblclick()
                                   .dblclick().dblclick().dblclick()
                                   .dblclick().dblclick().click()
        // Проверяем значание на дисплее, если value.length более 23 символов, то это баг!
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val.length <= 23){
                cy.log('OK')
            } else {
                cy.log('BUG!!!')
            }
        })
        // // AC
         cy.get('input[value="AC"]').click()
         cy.get('input[id="screen"]').should('have.value', '')
    })
    // Математическая проверка (т.к. это пример, то на каждое действие будет по одной проверке)
    it('Math Test', () => {
        // 6 - 8 = -2
        cy.get('input[value="6"]').click()
        cy.get('input[value="-"]').click()
        cy.get('input[value="8"]').click()
        cy.get('input[value="="]').click()
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '-2'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '-2')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // -2 * 4 = -8
        cy.get('input[value="*"]').click()
        cy.get('input[value="4"]').click()
        cy.get('input[value="="]').click()
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '-8'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '-8')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // -8 + 50 = 42
        cy.get('input[value="+"]').click()
        cy.get('input[value="5"]').click()
        cy.get('input[value="0"]').click()
        cy.get('input[value="="]').click()
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '42'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '42')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // 42 / 4 = 10.5
        cy.get('input[value="/"]').click()
        cy.get('input[value="4"]').click()
        cy.get('input[value="="]').click()
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '10.5'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '10.5')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // Проверка деления на 0 (по API на дисплее должно появится Infinity)
        cy.get('input[value="/"]').click()
        cy.get('input[value="0"]').click()
        cy.get('input[value="="]').click()
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == 'Infinity'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', 'Infinity')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // Проверка на нажатие любой клавиши при ошибке ввода, показанном на дисплее
        cy.get('input[value="0"]').click()
        // Если value не равен 0, то это баг!
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '0'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '0')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // AC 
        cy.get('input[value="AC"]').click()
        cy.get('input[id="screen"]').should('have.value', '')
    })
    // Иные проверки
    it ('Other Tests', () => {
        // Проверка на нажание = без введенных символов (по API на дисплей должно вывести undefined)
        cy.get('input[id="screen"]').should('have.value', '')
        cy.get('input[value="="]').click()
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == 'undefined'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', 'undefined')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })

        // Проверка на нажатие любой клавиши при ошибке ввода, показанном на дисплее (по API ошибка должна исчезнуть и должен начаться ввод символов)
        cy.get('input[value="0"]').click()
        // Если value не равен 0, то это баг!
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '0'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '0')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // AC 
        cy.get('input[value="AC"]').click()
        cy.get('input[id="screen"]').should('have.value', '')

        // Проверка на нажание = с одним введенным номером (по API на дисплее должен остаться символ)
        cy.get('input[value="5"]').click()
        cy.get('input[value="="]').click()
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '5'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '5')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // AC 
        cy.get('input[value="AC"]').click()
        cy.get('input[id="screen"]').should('have.value', '')
        
        // Проверка на нажание = с одним введенным номером и одним оператором (по API на дисплей должен остаться символ и оператор)
        cy.get('input[value="5"]').click()
        cy.get('input[value="/"]').click()
        cy.get('input[value="="]').click()
        Cypress.on('uncaught:exception', (err, runnable) => {return false})
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '5/'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '5/')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // AC 
        cy.get('input[value="AC"]').click()
        cy.get('input[id="screen"]').should('have.value', '')

        // Проверка на нажатие = с одним номером и двумя операторами (по API должен остаться номер и один оператор) 
        cy.get('input[value="6"]').click()
        cy.get('input[value="/"]').dblclick()
        cy.get('input[value="="]').click()
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '6//'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '6//')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // AC 
        cy.get('input[value="AC"]').click()
        cy.get('input[id="screen"]').should('have.value', '')

        // Проверка на нажатие = с двумя значениями, двумя одинаковыми операторами (по API на дисплей должна вывестись undefined) 
        cy.get('input[value="6"]').click()
        cy.get('input[value="*"]').dblclick()
        cy.get('input[value="6"]').click()
        cy.get('input[value="="]').click()
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == 'undefined'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', 'undefined')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // AC 
        cy.get('input[value="AC"]').click()
        cy.get('input[id="screen"]').should('have.value', '')   

        // Проверка на нажатие = с двумя значениями, двумя разными операторами (по API на дисплей должна вывестись undefined)
        cy.get('input[value="4"]').dblclick()
        cy.get('input[value="*"]').click()
        cy.get('input[value="/"]').click()
        cy.get('input[value="2"]').click()
        cy.get('input[value="="]').click()
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == 'undefined'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', 'undefined')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // AC 
        cy.get('input[value="AC"]').click()
        cy.get('input[id="screen"]').should('have.value', '')  

        // Проверка на корректность отображения точки (по API если первым кликом нажать на клавишу ".", то дальнейший ввод чисел начнется с 0.)
        cy.get('input[value="."]').click()
        cy.get('input[value="1"]').click()
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '0.1'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '0.1')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
        // Корректность математического решения в таком случае
        cy.get('input[value="+"]').click()
        cy.get('input[value="2"]').click()
        cy.get('input[value="."]').click()
        cy.get('input[value="1"]').click()
        cy.get('input[value="="]').click()
        cy.get('#screen').then(($screen) => {
            const val = $screen.val()

            if(val == '2.2'){
                cy.log('OK')
                cy.get('input[id="screen"]').should('have.value', '2.2')
            } else {
                cy.log('BUG!!!')
                cy.get('input[id="screen"]').should('have.value', val)
            }
        })
    })
})