import Requests from "@/api/request";

export default class ApiTask extends Requests {
    /* CRUD */
    private createTaskGQL = `
        mutation createBoard($id_board: Int!, $position: float8!) {
            insert_Task(objects: {id_board: $id_board, content: "", position: $position}) {
                affected_rows
            }
        }
    `

    private readTaskGQL = `
        query readTask($id: Int!) {
            Task(where: {id: {_eq: $id}}) {
            content
            id
            name
            Board {
                id
                name
            }
            }
        }
      `

    private updateTaskGQL = ``

    private updateTaskTitleGQL = `
        mutation updateTaskTitle($id: Int!, $name: String!) {
            update_Task(where: {id: {_eq: $id}}, _set: {name: $name}) {
                affected_rows
            }
        }`
    private updateTaskContentGQL = `
        mutation updateTaskTitle($id: Int!, $content: String!) {
            update_Task(where: {id: {_eq: $id}}, _set: {content: $content}) {
                affected_rows
            }
        }`

    private updateTaskMoveGQL = `
        mutation updateTaskMove($id_board: Int!, $id_task: Int!, $position: float8!) {
            update_Task(where: {id: {_eq: $id_task}}, _set: {position: $position, id_board: $id_board}) {
                affected_rows
            }
        }`

    private deleteTaskGQL = `
        mutation deleteTask($id: Int!) {
            delete_Task(where: {id: {_eq: $id}}) {
                affected_rows
            }
        }
    `

    async createTaskFetch(id_board: number, position: number) {
        await this.fetch({
            query: this.createTaskGQL,
            variables: {
                id_board,
                position,
            },
        });
    }

    async readTaskFetch(id: number) {
        await this.fetch({
            query: this.readTaskGQL,
            variables: {
                id,
            }
        })
    }

    async updateTaskFetch() {

    }

    async updateTaskTitleFetch(id: number, name: string) {
        await this.fetch({
            query: this.updateTaskTitleGQL,
            variables: {
                id,
                name,
            },
        });
    }

    async updateTaskContentFetch(id: number, content: string) {
        await this.fetch({
            query: this.updateTaskContentGQL,
            variables: {
                id,
                content,
            },
        });
    }

    async updateTaskMove(id_board: number, id_task: number, position: number) {
        await this.fetch({
            query: this.updateTaskMoveGQL,
            variables: {
                id_board,
                id_task,
                position,
            },
        });
    }

    async deleteTaskFetch(id: number) {
        await this.fetch({
            query: this.deleteTaskGQL,
            variables: {
                id,
            },
        });
    }
}