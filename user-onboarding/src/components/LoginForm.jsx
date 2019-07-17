import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import './LoginForm.css';

function LoginForm(props) {
	return (
		<Form className="login-form">

			<h2>Create User</h2>

			<div className="form-group">
				<label htmlFor="username">Name</label>
				<Field
					autoComplete="off"
					type="text"
					id="_username"
					name="username"
				/>
			</div>

			<div className="form-group">
				<label htmlFor="email">Email</label>
				<Field
					autoComplete="off"
					type="email"
					id="_email"
					name="email"
				/>
			</div>

			<div className="form-group">
				<label htmlFor="password">Password</label>
				<Field
					autoComplete="off"
					type="password"
					id="_password"
					name="password"
				/>
			</div>

			<button
				className="submit-button"
			>
				Submit &rarr;
			</button>
		</Form>
	)
}

export default withFormik({
	mapPropsToValues({username, password, email}) {
		return {
			username: username || "",
			password: password || "",
			email: email || ""
		};
	},

	handleSubmit(values) {
		console.log(values);
	}
})(LoginForm);
