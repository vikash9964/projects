import React, { Component } from 'react';
import { Services } from "./../services/Services";
import { history } from '../helpers';

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
	
async componentDidMount(){

		await this.service.getData().then(res =>{
			if(res.status){	
				this.setState({ first_name: res.data.first_name , last_name: res.data.last_name, image: res.data.avatar });	 
			}else{
				history.push('/');			  
			}
		 });
	}

	render() {
		const { first_name, last_name , image , apiURL} = this.state;

		return (
			<div className="register">
			<center>	<h2>Home Page</h2>
				 <img src={apiURL + image} width="80" />
		<p>Hello : <strong> {first_name} {last_name}</strong></p>		

		
		<input type="button" onClick={this.logout} value="Logout" />


		</center>
			</div>
		);
	}
}

export default Home;
