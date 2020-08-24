import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Services } from "./../services/Services";
import { history } from '../helpers';



class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			submitted: false,
			error: false,
			errorMessage:""
		};		

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.service = new Services();
	}

	handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async handleSubmit(e) {
		e.preventDefault();
		console.log('You are logged in');
		this.setState({ submitted: true });
		const { email, password } = this.state;
		if (email && password) {
            await this.service.login(email,password).then(res =>{
				if(res.status){
					console.log('Redirect..');
					history.push('/home');		
	 
				}else{
					console.log('erorr..');
					this.setState({ erorr: true, errorMessage: res.message});
				  
				}
			 });
		}
    }


	render() {
		const { email, password, submitted , erorr , errorMessage} = this.state;

		return (
			<div className="login">
				<form name="form" onSubmit={this.handleSubmit}>
					<h2>Login</h2>
					{erorr &&
                            <div className="help-block">{errorMessage}</div>
                        }
					<div className="username">
						<input
							type="text"
							placeholder="Email..."
							value={email}
							onChange={this.handleChange}
							name="email"
						/>
						{submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
					</div>

					<div className="password">
						<input
							type="password"
							placeholder="Password..."
							value={password}
							onChange={this.handleChange}
							name="password"
						/>
						{submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
					</div>

					<input type="submit" value="Login" />
				</form>

				<Link to="/register">Create an account</Link>
			</div>
		);
	}
}

export default Login;
