import {expect, test} from '@playwright/test'
// importando interface com a massa de dados para o test (payload para as apis)
import {TaskModel} from './fixtures/task.model'

// importando classe contendos os elementos da pagina
import { TasksPage } from './Pages/tasks'; 
import {deleteTaskNameByHelper, postNewTask} from './TypeScript/Helpers'

let taskPage: TasksPage
test.beforeEach(({page})=> {
    taskPage = new TasksPage(page)
})

test.describe('Cadastro Task', () => {
    // cada test() representa um cenário de teste
    test('Deve cadastrar uma nova Task', async({ request}) => {
    
        let newTask: TaskModel = {
            name: "Concluir os cursos da QAX",
            is_done: false
        }
        //delete
        deleteTaskNameByHelper(request, newTask.name)

        await taskPage.goURL();
        //const countBeforeNewTask = page.locator('xpath=//div[text()="Created Tasks"]//span')
        await taskPage.create(newTask)
        await taskPage.shouldHaveTextTask(newTask.name)
    });
    
    test('Não deve cadastrar tasks duplicadas', async({ request})=> {
    
        const payload: TaskModel = {
            name: "Concluir testes para a prova",
            is_done: false
        }
        //post
        postNewTask(request, payload)
        await taskPage.goURL();
        await taskPage.create(payload)
        await taskPage.expectModalError('Task already exists!')
    })
    
    
    test('Deve validar o campo obrigatório',async ({page}) => {
        
        const payload: TaskModel = {
            name: '',
            is_done: false
        }
    
        await taskPage.goURL();
        await taskPage.create(payload)
    
        const validateMsg = await taskPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validateMsg).toEqual('This is a required field')
    })

})

test.describe('Atualização', () => {
    test('Deve concluir tarefa cadastrada',async ({ request}) => {
        
        const newTask: TaskModel = {
            name:'Pagar emprestimo',
            is_done: false
        }
    
        deleteTaskNameByHelper(request, newTask.name)
        postNewTask(request, newTask)
    
        await taskPage.goURL();
        await taskPage.toggleDoneTask(newTask.name)
        await taskPage.shouldBeDone(newTask.name)
    })

})

test.describe('Exclusão', ()=> {
    test('Deve remover uma task', async({ request}) => {
        
        const payloadDel: TaskModel = {
            name:'Criar README',
            is_done: false
        }
    
        deleteTaskNameByHelper(request, payloadDel.name)
        postNewTask(request, payloadDel)

        await taskPage.goURL()
        await taskPage.removeTask(payloadDel.name)
        await taskPage.shouldNotExistTask(payloadDel.name)
    })
})