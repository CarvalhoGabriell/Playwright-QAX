import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'

test('Deve cadastrar uma nova Task', async ({ page }) => {

    await page.goto('http://127.0.0.1:3000')

    // um jeito de preencher um campo usando o fill
    //await page.fill('input[class*=InputNewTask]','Terminar o curso QAX playwrigth')

    // um outro jeito de preencher um campo, usando uma variavel para guardar o locator do input
    let inputNewTask = page.locator('input[placeholder="Add a new Task"]')
    await inputNewTask.fill(faker.company.name())

    await page.click('xpath=//button[contains(text(),"Create")]')

})