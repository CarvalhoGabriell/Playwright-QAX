import {expect, test} from '@playwright/test'
// importando interface com a massa de dados para o test (payload para as apis)
import {TaskModel} from './fixtures/task.model'

// importando classe contendos os elementos da pagina
import { TasksPage } from './Pages/tasks'; 
import {deleteTaskNameByHelper, postNewTask} from './TypeScript/Helpers'

// cada test() representa um cenário de teste
test('Deve cadastrar uma nova Task', async({page, request}) => {

    let newTask: TaskModel = {
        name: "Concluir os cursos da QAX",
        is_done: false
    }
    //delete
    deleteTaskNameByHelper(request, newTask.name)

    const taskPage: TasksPage = new TasksPage(page)
    await taskPage.goURL();
    await taskPage.create(newTask)

    await taskPage.shouldHaveTextTask(newTask.name)
});

test('Não deve cadastrar tasks duplicadas', async({page, request})=> {

    const payload: TaskModel = {
        name: "Concluir testes para a prova",
        is_done: false
    }
    //delete
    deleteTaskNameByHelper(request, payload.name)
    //post
    postNewTask(request, payload)

    const taskPage: TasksPage = new TasksPage(page)
    await taskPage.goURL();
    await taskPage.create(payload)
    await taskPage.expectModalError('Task already exists!')
})


test('Deve validar o campo obrigatório',async ({page}) => {
    
    const payload: TaskModel = {
        name: '',
        is_done: false
    }

    const taskPage: TasksPage = new TasksPage(page)
    await taskPage.goURL();
    await taskPage.create(payload)

    const validateMsg = await taskPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validateMsg).toEqual('This is a required field')
})