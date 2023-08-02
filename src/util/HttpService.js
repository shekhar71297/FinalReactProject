import axios from "axios";

export function getData(endpoint){
   return(
    axios.get(`http://localhost:8888/${endpoint}`)
   );
}

export function AddData(endpoint,data){
    return(
     axios.post(`http://localhost:8888/${endpoint}`,data)
    );
 }

 export function DeleteData(endpoint,id){
    return(
     axios.delete(`http://localhost:8888/${endpoint}/${id}`)
    );
 }

 export function UpdateData(endpoint,id,data){
    return(
     axios.put(`http://localhost:8888/${endpoint}/${id}`,data)
    );
 }