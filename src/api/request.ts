import axios from "axios";

export default class request{
    DEFAUT_URL:string = "http://23.111.121.1:8080/v1/graphql"

    response: any = {}
    data: any = {}

    constructor(){

    }

    async fetch(data:object={}){
        const request = await axios({
            method: "POST",
            url: this.DEFAUT_URL,
            data: data,
        });
        this.response = request;
        this.data = request.data;
        return request;
    }
}