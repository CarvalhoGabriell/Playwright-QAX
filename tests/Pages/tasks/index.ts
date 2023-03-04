import { Page, expect, Locator } from "@playwright/test"
import { TaskModel } from "../../fixtures/task.model"


export class TasksPage {
    readonly page: Page
    readonly inputTaskName: Locator
    
    constructor(page: Page ) {
        this.page = page
        this.inputTaskName = page.locator('#newTask')
    }

    async goURL() {
        await this.page.goto('http://127.0.0.1:3000')
    }

    async create(payloadnewTask: TaskModel) {
        await this.inputTaskName.fill(payloadnewTask.name)
        await this.page.getByRole('button', {name: 'Create'}).click()
    
    }

    async shouldHaveTextTask(taskName: string) {
        let taskSucess = this.page.locator('css=.task-item > p >> text='+taskName)
        await expect(taskSucess).toBeVisible()
    }

    async expectModalError(msgError: string) {
        let modalErro = this.page.locator('#swal2-html-container')
        await expect(modalErro).toHaveText(msgError)

        await this.page.getByRole('button', {name: 'OK'}).click()
    }
}