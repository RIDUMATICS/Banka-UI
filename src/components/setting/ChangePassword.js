import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from './../../actions/authActions';

const ChangePassword = () => {
	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const dispatch = useDispatch();

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const data = { oldPassword, password, confirmPassword };
		dispatch(changePassword( data ));
	}
		return (
			<Fragment>
				<h1>Change Password</h1>
				<p>It's a good idea to use a strong password that you're not using elsewhere</p>
				<form onSubmit={onSubmitHandler}>
					<div className="form-group row">
						<label htmlFor="oldPassword" className="col-sm-2 col-form-label">
							Current Password
						</label>
						<div className="col-sm-5">
							<input
								type="password"
								className="form-control"
								id="oldPassword"
								value={oldPassword}
								name="oldPassword"
								onChange={(e) => setOldPassword(e.target.value)}
								autoComplete="true"
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="password" className="col-sm-2 col-form-label">
							New Password
						</label>
						<div className="col-sm-5">
							<input
								type="password"
								className="form-control"
								id="password"
								value={password}
								name="password"
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="true"
							/>
							<small className="form-text text-muted">* At least 8 characters</small>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="confirmPassword" className="col-sm-2 col-form-label">
							Confirm Password
						</label>
						<div className="col-sm-5">
							<input
								type="password"
								className="form-control"
								id="confirmPassword"
								value={confirmPassword}
								name="confirmPassword"
								onChange={(e)=> setConfirmPassword(e.target.value)}
								autoComplete="true"
							/>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</Fragment>
		);
	}

export default ChangePassword;
