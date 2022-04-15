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

    private readTaskGQL = ``

    private updateTaskGQL = ``

    private updateTaskMoveGQL = `
        mutation updateTaskMove($id_board: Int!, $id_task: Int!, $position: float8!) {
            update_Task(where: {id: {_eq: $id_task}}, _set: {position: $position, id_board: $id_board}) {
                affected_rows
            }
        }`

    private deleteTaskGQL = ``

    async createTaskFetch(id_board: number, position: number) {
        await this.fetch({
            query: this.createTaskGQL,
            variables: {
                id_board,
                position,
            },
        });
    }

    async readBoardFetch() {
        
    }

    async updateBoardFetch() {

    }

    async updateTaskMove(id_board:number, id_task: number, position: number){
        await this.fetch({
            query: this.updateTaskMoveGQL,
            variables: {
                id_board,
                id_task,
                position,
            },
        });
    }

    async deleteBoardFetch(id: number) {
        
    }
}