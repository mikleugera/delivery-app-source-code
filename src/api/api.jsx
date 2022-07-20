import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001/api/',
});

export const Shops_API = {
    get(){
        return instance.get(`shops/findAll`)
    }
};

export const Shopping_card_API = {
    post(data){
        return instance.post(`shopping_card/create`, data)
    }
};