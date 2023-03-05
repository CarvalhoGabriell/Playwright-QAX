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
        await this.page.goto('/')
    }

    async create(payloadnewTask: TaskModel) {
        await this.inputTaskName.fill(payloadnewTask.name)
        await this.page.getByRole('button', {name: 'Create'}).click()
    
    }

    async removeTask(taskName: string) {
        const taskDel = this.page.locator(`xpath=//p[text()="${taskName}"]/following-sibling::button`)
        await taskDel.click()
    }

    async toggleDoneTask(taskName: string) {
        const task = this.page.locator(`xpath=//p[text()="${taskName}"]/preceding-sibling::button`)
        await task.click()
    }

    async shouldHaveTextTask(taskName: string) {
        let taskSucess = this.page.locator('css=.task-item > p >> text='+taskName)
        await expect(taskSucess).toBeVisible()
    }

    async shouldBeDone(taskName: string) {
        let taskTarget = this.page.getByText(taskName)
        await expect(taskTarget).toHaveCSS('text-decoration-line', 'line-through')
    }

    async shouldNotExistTask(taskName: string) {
        let taskRemove = this.page.locator('css=.task-item > p >> text='+taskName)
        await expect(taskRemove).not.toBeVisible()
    }

    async expectModalError(msgError: string) {
        let modalErro = this.page.locator('#swal2-html-container')
        await expect(modalErro).toHaveText(msgError)

        await this.page.getByRole('button', {name: 'OK'}).click()
    }
}