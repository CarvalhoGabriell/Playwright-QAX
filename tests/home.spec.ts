import {test, expect} from '@playwright/test';


test('Webapp deve estar no ar', async ({page})=> {
    await page.goto('http://127.0.0.1:3000')
    await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L')

    await page.waitForTimeout(4000)
})