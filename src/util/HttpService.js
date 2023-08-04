import axios from "axios";

export function Get(url){
   return(
    axios.get(url)
   );
}

export function Post(url,data){
    return(
     axios.post(url,data)
    );
 }

 export function Delete(url){
    return(
     axios.delete(url)
    );
 }

 export function Update(url,data){
    return(
     axios.put(url,data)
    );
 }