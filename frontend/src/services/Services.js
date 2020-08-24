import { Component } from "react";
//import config from 'config';

export class Services extends Component {

    async login(email,password){        

        return await fetch("http://localhost:8000/api/login",{
            method:"POST",
            headers:{
                "Content-type" : "application/json"
            },
            body:JSON.stringify({
                email : email,
                password : password
            })
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.status){   
                
                console.log(data.token);
                localStorage.setItem('apptoken', data.token);
                return data;
            }else {
                return data;
            }
        });
    }

    async regster(formData){  

        return await fetch("http://localhost:8000/api/register",{
            method:"POST",            
            body: formData             
            
        }).then(function(response){
            return response.json();
        }).then(function(data){
            return data;
        });
    }


    async getData(){        

        return await fetch("http://localhost:8000/api/user-details",{
            method:"GET",
            headers:{
                "Content-type" : "application/json",
                Authorization :  localStorage.getItem("apptoken")
            }            
        }).then(function(response){
            return response.json();
        }).then(function(data){
            return data;
        });
    }  
    
    
    async logout(){       

        localStorage.removeItem("apptoken");
        return true;

    } 

}