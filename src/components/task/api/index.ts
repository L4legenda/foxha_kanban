import Requests from "@/api/request";

export default class ApiTask extends Requests {
    /* CRUD */
    private createTaskGQL = `
        mutation createBoard($id_board: Int!) {
            insert_Task(objects: {id_board: $id_board, content: ""}) {
                affected_rows
            }
        }
    `

    private readTaskGQL = ``

    private updateTaskGQL = ``

    private deleteTaskGQL = ``

    async createTaskFetch(id_board: number) {
        await this.fetch({
            query: this.createTaskGQL,
            variables: {
                id_board,
            },
        });
    }

    async readBoardFetch() {
        
    }

    async updateBoardFetch() {

    }

    async deleteBoardFetch(id: number) {
        
    }
}