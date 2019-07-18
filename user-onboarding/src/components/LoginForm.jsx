import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './LoginForm.css';

// Adding destructured 'errors' prop to the form. The 'errors' prop gets passed down from the 'withFormik' component.
function LoginForm({ values, errors, touched, isSubmitting }) {
	return (
		<Form className="login-form">

			<h2>Create User</h2>

			<div className="form-group">
				<label htmlFor="username">Username</label>
				<Field
					autoComplete="off"
					type="text"
					id="_username"
					name="username"
					className={errors.username ? "invalid" : ""}
				/>
				<p className="error-text">
					{touched.username && errors.username}
				</p>
			</div>

			<div className="form-group">
				<label htmlFor="email">Email</label>
				<Field
					autoComplete="off"
					type="email"
					id="_email"
					name="email"
					className={errors.username ? "invalid" : ""}
				/>
				<p className="error-text">
					{touched.email && errors.email}
				</p>
			</div>

			<div className="form-group">
				<label htmlFor="password">Password</label>
				<Field
					autoComplete="off"
					type="password"
					id="_password"
					name="password"
					className={errors.username ? "invalid" : ""}
				/>
				<p className="error-text">
					{touched.password && errors.password}
				</p>
			</div>

			<div className="checkbox-container">
				<label>
					<Field className="checkbox" type="checkbox" name="tos" id="_tos" checked={values.tos} />
					<span className="checkbox-text">Accept TOS</span>
				</label>
				<p className="error-text">
					{touched.tos && errors.tos}
				</p>
			</div>

			<button
				className="submit-button"
				disabled={isSubmitting}
			>
				Submit &rarr;
			</button>
		</Form>
	)
}

export default withFormik({
	mapPropsToValues({username, password, email, tos}) {
		return {
			username: username || "",
			password: password || "",
			email: email || "",
			tos: tos || false
		};
	},

	//=== VALIDATION SCHEMA ===
	validationSchema: Yup.object().shape({
		username: Yup.string()
			.required("Username is required"),
		password: Yup.string()
			.min(6, "Password must be 6 characters or longer")
			.required("Password is required"),
		email: Yup.string()
			.email("Email not valid")
			.required("Email is required"),
		tos: Yup.boolean()
			.oneOf([true], "Please accept terms & conditions")
	}),
	//=== END VALIDATION SCHEMA ===

	handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
		axios
			.post("https://reqres.in/api/users", values)
			.then(response => {
				console.log(response);

				// Alert window with user information when Submit button is clicked
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					onOpen: () => {
						MySwal.clickConfirm()
					}
				}).then(() => {
					return MySwal.fire(
					<div>
						<p>Username: {response.data.username}</p>
						<p>Email: {response.data.email}</p>
					</div>
					)
				})

				resetForm();
				setSubmitting(false);
			})
			.catch(error => {
				console.log(error);
				setSubmitting(false);
			});
	}
})(LoginForm);
