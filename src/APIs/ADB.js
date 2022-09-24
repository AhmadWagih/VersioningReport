
import { alertError } from '../helper/toast';
import client from './client';
const resource = "/ADB"

export const getADB=async ()=>{
    try {
        const {data} = client.get(resource)
        return data;
    } catch (error) {
        alertError(error)
    }
}