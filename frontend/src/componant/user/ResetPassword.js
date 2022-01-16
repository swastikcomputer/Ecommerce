import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../action/UserAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

import { useNavigate,useParams } from 'react-router-dom';
const LockOpenIcon =<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
const LockIcon =<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g fill="none"><path d="M0 0h24v24H0V0z"/><path d="M0 0h24v24H0V0z" opacity=".87"/></g><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>


const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const alert = useAlert();
    const {token}=useParams();
    const { error, success, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(token, myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Password Updated Successfully");
  
        navigate("/login");
      }
    }, [dispatch, error, alert, navigate, success]);
    return (
        <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Change Password" />
            <div className="resetPasswordContainer">
              <div className="resetPasswordBox">
                <h2 className="resetPasswordHeading">Update Profile</h2>
  
                <form
                  className="resetPasswordForm"
                  onSubmit={resetPasswordSubmit}
                >
                  <div>
                    {LockOpenIcon} 
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    {LockIcon} 
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="resetPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    )
}

export default ResetPassword
