import { expect, APIRequestContext} from "@playwright/test"
import { TaskModel } from "../fixtures/task.model"
require('dotenv').config()

export async function deleteTaskNameByHelper(request: APIRequestContext, taskName: string) {
    await request.delete(`${process.env.BASE_URL_API}/helper/tasks/${taskName}`)
}

export async function postNewTask(request:APIRequestContext, TASK: TaskModel) {
    let response = await request.post(`${process.env.BASE_URL_API}/tasks/`, {data:TASK})
    expect(response.ok()).toBeTruthy
}