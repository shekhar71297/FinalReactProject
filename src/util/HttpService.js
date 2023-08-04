import axios from "axios";

export function getData(url){
   return(
    axios.get("http://localhost:8888/StudentResult")
   );
}

export function AddData(url,data){
    return(
     axios.post(url,data)
    );
 }

 export function DeleteData(url){
    return(
     axios.delete(url)
    );
 }

 export function UpdateData(url,data){
    return(
     axios.put(url,data)
    );
 }