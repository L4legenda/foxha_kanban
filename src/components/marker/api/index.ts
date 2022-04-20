import Requests from "@/api/request";

export default class ApiMarker extends Requests {
    /* CRUD */
    private createMarkerGQL = `
        mutation createMarker($name: String!, $color: String!, $task_id: Int!) {
            insert_Marker(objects: {name: $name, color: $color, task_id: $task_id }) {
                affected_rows
            }
        }
    `

    private readMarkerGQL = `
        query readMarker($task_id: Int!) {
            Marker(order_by: {id: desc}, where: {task_id: {_eq: $task_id}}) {
                name
                color
                task_id
            }
        }
      
      `
    private readMarkerColorGQL = `
        query readMarkerColor {
            MarkerColor {
                color
            }
        }
    `


    private updateMarkerGQL = ``

    private updateMarkerTitleGQL = `
        `
    private updateMarkerContentGQL = ``

    private updateMarkerMoveGQL = ``

    private deleteMarkerGQL = `
    `

    async createMarkerFetch(name: string, color: string, task_id: number) {
        await this.fetch({
            query: this.createMarkerGQL,
            variables: {
                name,
                color,
                task_id,
            },
        });
    }

    async readMarkerFetch(task_id: number) {
        await this.fetch({
            query: this.readMarkerGQL,
            variables: {
                task_id,
            }
        })
    }

    async readMarkerColorFetch() {
        await this.fetch({
            query: this.readMarkerColorGQL,
            variables: {
            }
        })
    }

    async updateMarkerFetch() {

    }

    async deleteMarkerFetch(id: number) {
        await this.fetch({
            query: this.deleteMarkerGQL,
            variables: {
                id,
            },
        });
    }
}