import Requests from "@/api/request";

export default class ApiBoard extends Requests {
    /* CRUD */
    private createBoardGQL = `
      mutation createBoard {
        insert_Board(objects: {}) {
          affected_rows
        }
      }
    `

    private readBoardGQL = `
        query readBoard {
            Board {
                name
                id
                Tasks {
                  id
                  content
                  name
                  id_board
                }
              }
        }
      `

    private updateBoardTitleGQL = `
        mutation updateBoardTitle($id: Int!, $name: String!) {
            update_Board(where: {id: {_eq: $id}}, _set: {name: $name}) {
                affected_rows
            }
        }`

    private deleteBoardGQL = `
        mutation deleteBoard(\$id: Int!) {
            delete_Board(where: {id: {_eq: \$id}}) {
                affected_rows
            }
        }
      `

    async createBoardFetch() {
        await this.fetch({
            query: this.createBoardGQL,
        });
    }

    async readBoardFetch() {
        await this.fetch({
            query: this.readBoardGQL,
        });
    }

    async updateBoardTitleFetch(id: number, name: string) { 
        await this.fetch({
            query: this.updateBoardTitleGQL,
            variables: {
                id,
                name,
            }
        });
    }

    async deleteBoardFetch(id: number) {
        await this.fetch({
            query: this.deleteBoardGQL,
            variables: {
                id
            },
        });
    }
}