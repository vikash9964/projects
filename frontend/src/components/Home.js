import React, { Component } from 'react';
import { Services   } from "./../services/Services";
import { history } from '../helpers';
import { getUserQuery } from './../queries/queries';
import { graphql } from 'react-apollo';
let $id = localStorage.getItem("userID");

class Home extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',	
			image: '',
			apiURL: 'http://localhost:8000/',				
		};
		this.service = new Services();
		this.logout = this.logout.bind(this);
	}

async logout(e) {

		await this.service.logout().then(res =>{
			history.push('/');
		 });
        
	}
	
	displayUser(){
		var data = this.props.data;		
        if(data.loading){
            return( <div>Loading user info...</div> );
        } else {		
			return(
				<div>
					<img alt="useimg" src={this.state.apiURL + data.UserDeatails.avatar} width="80" />
					<p>Hello : <strong> {data.UserDeatails.first_name} {data.UserDeatails.last_name}</strong></p>
				</div>
			);
        }
	}


	render() {

		return (
			<div className="register">
			<center>	<h2>Home Page</h2>		
			{this.displayUser()}
			<input type="button" onClick={this.logout} value="Logout" />
		</center>
			</div>
		);		
	}
}

export default graphql(getUserQuery, {
    options: (props) => {
        return {
            variables: {
                id: $id
            }
        }
    }
})(Home);