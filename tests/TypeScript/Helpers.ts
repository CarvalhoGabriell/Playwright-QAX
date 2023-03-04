import { expect, APIRequestContext} from "@playwright/test"
import { TaskModel } from "../fixtures/task.model"

export async function deleteTaskNameByHelper(request: APIRequestContext, taskName: string) {
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
}

export async function postNewTask(request:APIRequestContext, TASK: TaskModel) {
    let response = await request.post('http://localhost:3333/tasks/', {data:TASK})
    expect(response.ok()).toBeTruthy
    console.log(response.json)
}