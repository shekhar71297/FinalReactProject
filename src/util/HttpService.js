// import axios from "axios";

// export function Get(url){
//    return(
//     axios.get(url)
//    );
// }

// export function Post(url,data){
//     return(
//      axios.post(url,data)
//     );
//  }

//  export function Delete(url){
//     return(
//      axios.delete(url)
//     );
//  }

//  export function Put(url,data){
//     return(
//      axios.put(url,data)
//     );
//  }

import axios from "axios";
//create axios object with basic config
export const axiosHttp = axios.create({
    baseURL:'http://localhost:8888'
});

// export const Get = (url) => {
//     return axiosHttp.get(url);
//   };
  
//   export const Post = (url, payload) => {
//     return axiosHttp.post(url, payload);
//   };
  
//   export const Put = (url, payload) => {
//     return axiosHttp.put(url, payload);
//   };
  
//   export const Delete = (url) => {
//     return axiosHttp.delete(url);
//   };

// create intercepter for request
axiosHttp.interceptors.request.use(
    (config)=>{
        const token=!!sessionStorage.getItem("jwt");//removeItem('jwt'),setItem('jwt','sdasdsad')
        return{
            ...config,
            headers:{
                ...(token && {'Authorization':`Bearer ${sessionStorage.getItem("jwt")}`}),
                ...config.headers,
            }
        }
    },
    (error)=>{
        return Promise.reject(error)
    }
);

// create intercepter for response
//when we use intercepter No need to access response.data in action.js, as the interceptor already extracts data

axiosHttp.interceptors.response.use(
    (response)=>{
        return response.data
    },
    (error)=>{
        return Promise.reject(error)
    }
);

//Global request for Http Request

export const Get =(url,headers={})=>{
    return axiosHttp.get(url,{headers:headers})
}

export const Post=(url,payload,headers={})=>{
    return axiosHttp.post(url,payload,{headers:headers})
}

export const Put=(url,payload,headers={})=>{
    return axiosHttp.put(url,payload,{headers:headers})
}

export const Delete=(url,headers={})=>{
    return axiosHttp.delete(url,{headers:headers})
}


