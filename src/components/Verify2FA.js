import React, { Component } from 'react';
import Modal from './Modal';
import { connect } from 'react-redux';
import { verifyToken } from '../actions/authActions';
import { withRouter } from 'react-router-dom';
import Alert from './Alert';

class Verify2FA extends Component {
  constructor(props) {
    super(props);

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);

    this.state = {
      authyToken: '',
    };
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.props.verifyToken(
      { authyToken: this.state.authyToken },
      this.props.history
    );
  }

  onChangeHandler({ target }) {
    const value = target.value;
    this.setState({
      [target.name]: value,
    });
  }

  render() {
    return (
      <Modal
        display={this.props.auth.enable2FA}
        title="Enter your verification code"
      >
        <p>
          We have sent a temporary verification code to{' '}
          {this.props.auth.user.phoneNumber}, Enter the code to verify
        </p>
        <form className="" onSubmit={this.onSubmitHandler}>
          {this.props.alert.component === '2fa' && (
            <Alert
              message={this.props.alert.message}
              type={this.props.alert.type}
            />
          )}
          <div className="form-group">
            <input
              type="number"
              value={this.state.authyToken}
              name="authyToken"
              placeholder="Enter token"
              className="form-control"
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="btn btn-primary mr-2"
              onClick={this.onSubmitHandler}
            >
              Verify
            </button>
            <button type="submit" className="btn btn-primary">
              Resend
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  alert: state.alert,
});

export default connect(mapStateToProps, { verifyToken })(withRouter(Verify2FA));
