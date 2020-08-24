import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Services } from "./../services/Services";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
            user: {
                first_name: '',
				last_name: '',
				email: '',
                dob: new Date(),
                password: ''
            },
			submitted: false,
			error: false,
			errorMessage:"",
			success: false,
			successMessage:"",
			avatar:{}
        };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
		this.service = new Services();
	}

	handleImageChange = e => {
		console.log(e.target.files[0]);
		this.setState({
			avatar: e.target.files[0]
		  });
	  };

	handleDateChange = date => {
		this.setState({
		  startDate: date
		});
	  };

	handleChange(event) {
		const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    async handleSubmit(e) {
		e.preventDefault();
		console.log('You are register in');	
		this.setState({ submitted: true });
		const { user } = this.state;

	  /*let myfrom = document.getElementById('regsiterForm');
		const formData = new FormData(myfrom);			
		*/

        if (user.first_name && user.last_name && user.dob && user.password) {
			
			const formData = new FormData();			
			formData.append("image",this.state.avatar);
			formData.append("first_name",user.first_name);
			formData.append("last_name",user.last_name);
			formData.append("dob",user.dob);
			formData.append("email",user.email);
			formData.append("password", user.password);

			await this.service.regster(formData).then(res =>{
				if(res.status){
					console.log('success..');					
					this.setState({ success: true, successMessage: res.message});	
	 
				}else{
					console.log('erorr..');
					this.setState({ erorr: true, errorMessage: res.message});				  
				}
			 });
		}	
		
    }

	render() {
		const { erorr , errorMessage , success, successMessage} = this.state;

		return (
			<div className="register" >
				<form onSubmit={this.handleSubmit} id="regsiterForm">
					<h2>Register</h2>
					{erorr &&
                            <div className="help-block">{errorMessage}</div>
                        }
						{success &&
                            <div className="help-block">{successMessage}</div>
                        }

<div className="avatar">
	<label>Profile Picture : </label>
						<input
							type="file"							
							name="avatar"
							onChange={this.handleImageChange}
						/>
					</div>
					<hr></hr>

					<div className="first_name">
						<input
							type="text"
							placeholder="First Name"
							name="first_name"
							value={this.state.first_name}
							onChange={this.handleChange}
						/>
					</div>

					<div className="last_name">
						<input
							type="text"
							placeholder="Last Name"
							name="last_name"
							value={this.state.last_name}
							onChange={this.handleChange}
						/>
					</div>

					<div className="dob">
					<DatePicker
					name="dob"
					placeholder="Enter your date of birth"
					selected={this.state.startDate}
					onChange={this.handleDateChange}
                       />
						
					</div>

					<div className="email">
						<input
							type="text"
							placeholder="Enter your email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</div>

					<div className="pasword">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>				

					<input type="submit" value="Login" />
				</form>

				<Link to="/">Login Here</Link>
			</div>
		);
	}
}

export default Register;
