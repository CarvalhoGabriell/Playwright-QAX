import {test, expect} from '@playwright/test'


// cada test() representa um cenário de teste
test('Deve cadastrar uma nova Task', async({page, request}) => {

    const nameNewTask = "Realizar cursos da QAX"
    await request.delete('http://localhost:3333/helper/tasks/' + nameNewTask)

    await page.goto('http://127.0.0.1:3000')

    let inputText = page.locator("#newTask")
    await inputText.fill(nameNewTask)

    await page.getByRole('button', {name: 'Create'}).click()

    let taskSucess = page.locator('css=.task-item > p >> text='+nameNewTask)
    await expect(taskSucess).toBeVisible()
});

test.only('Não deve cadastrar tasks duplicadas', async({page, request})=> {

    const payload = {
        name: "Concluir testes para a prova",
        is_done: false
    }

    await request.delete('http://localhost:3333/helper/tasks/'+payload.name)
    let response = await request.post('http://localhost:3333/tasks/', {data:payload})
    expect(response.ok()).toBeTruthy
    console.log(response)

    await page.goto('http://127.0.0.1:3000')

    let inputText = page.locator("#newTask")
    await inputText.fill(payload.name)

    await page.getByRole('button', {name: 'Create'}).click()

    let modalErro = page.locator('#swal2-html-container')
    await expect(modalErro).toHaveText('Task already exists!')

    await page.getByRole('button', {name: 'OK'}).click()
})