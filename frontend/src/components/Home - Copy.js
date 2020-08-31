import React, { Component } from 'react';
import { Services   } from "./../services/Services";
import { history } from '../helpers';
import { getUserQuery } from './../queries/queries';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

let $id = localStorage.getItem("apptoken");

const GET_USER = gql`  
    {
		UserDeatails(id:"5f4273a1cff88417a8149816")
		{
		  first_name,
		  last_name,
		  avatar
		}
	  }	  
  `;


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
            return( <div>Loading books...</div> );
        } else {		
			return(
				<div>
					<img alt="image" src={this.state.apiURL + data.UserDeatails.avatar} width="80" />
					<p>Hello : <strong> {data.UserDeatails.first_name} {data.UserDeatails.last_name}</strong></p>
				</div>
			);
			//this.setState({ first_name: data.UserDeatails.first_name , last_name: data.UserDeatails.last_name, image: data.UserDeatails.avatar });	 
        }
	}
	
	
async componentDidMount(){	

		/*await this.service.getData().then(res =>{
			if(res.status){	
				this.setState({ first_name: res.data.first_name , last_name: res.data.last_name, image: res.data.avatar });	 
			}else{
				history.push('/');			  
			}
		 });*/
	}

	render() {
		//const { first_name, last_name , image , apiURL} = this.state;
		/*return (
		<Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading</div>
          }

          if (error) {
            return <div>Error: {error.toString()}</div>
          }
          return(
			<div className="register">
			<center>	
				<h2>Home Page</h2>
				<img alt="image" src={this.state.apiURL + data.UserDeatails.avatar} width="80" />
				<p>Hello : <strong> {data.UserDeatails.first_name} {data.UserDeatails.last_name}</strong></p>						
		        <input type="button" onClick={this.logout} value="Logout" />
            </center>
	       </div>
		);        
        }}
      </Query>	 */ 


	/*	return (
			<div className="register">
			<center>	<h2>Home Page</h2>		
			<img alt="image" src={this.state.apiURL + avatar} width="80" />
		 <p>Hello : <strong> {first_name} {last_name}</strong></p>		
		<input type="button" onClick={this.logout} value="Logout" />
		</center>
			</div>
		);*/

		)
	}
}

export default graphql(getUserQuery, {
    options: (props) => {
        return {
            variables: {
                id: "5f4273a1cff88417a8149816"
            }
        }
    }
})(Home);


//export default graphql(getUserQuery)(Home);
