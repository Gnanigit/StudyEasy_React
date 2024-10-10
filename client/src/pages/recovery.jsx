import React, { useEffect, useState } from "react";
import { generateOTP, verifyOTP, updatePassword } from "../helper/helper";
import { useNavigate } from "react-router-dom";
import "../styles/recovery.css";

export default function Recovery() {
  const [OTP, setOTP] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [recoveryMode, setRecoveryMode] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { status } = await verifyOTP({ email, code: OTP });
      if (status === 201) {
        setRecoveryMode(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getOTP(e) {
    e.preventDefault();
    const userEnteredEmail = email;
    try {
      const generatedOTP = await generateOTP(userEnteredEmail);
      if (generatedOTP) {
        setOtpGenerated(true);
      }
    } catch (error) {
      console.log("Error while generating OTP");
    }
  }

  async function resendOTP() {
    try {
      await generateOTP(email);
      console.log("OTP resent successfully!");
    } catch (error) {
      console.error("Could not resend OTP:", error.message);
    }
  }

  async function onUpdatePassword(e) {
    e.preventDefault();
    const password = newPassword;
    try {
      await updatePassword({ email, password });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Error updating password");
    }
  }

  return (
    <div className="recovery-container">
      <div className="recovery-form">
        <h2 className="form-title">Account Recovery</h2>
        {!otpGenerated && !recoveryMode && (
          <form className="form" onSubmit={getOTP}>
            <div className="form-group">
              <label htmlFor="email" className="input-label">
                Enter your email address to receive OTP:
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                type="email"
                placeholder="Email"
              />
              <button className="submit-btn" type="submit">
                Get OTP
              </button>
            </div>
          </form>
        )}
        {otpGenerated && recoveryMode === false && (
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="otp" className="input-label">
                Enter 6 digit OTP sent to your email address:
              </label>
              <input
                id="otp"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                className="input-field"
                type="text"
                placeholder="OTP"
              />
              <button className="submit-btn" type="submit">
                Recover
              </button>
            </div>
          </form>
        )}
        {recoveryMode && (
          <form className="form" onSubmit={onUpdatePassword}>
            <div className="form-group">
              <label htmlFor="newPassword" className="input-label">
                Enter your new password:
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="New Password"
                className="input-field"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button className="submit-btn" type="submit">
                Update Password
              </button>
            </div>
          </form>
        )}
        <div className="resend">
          <p className="resend-text">
            Can't get OTP?{" "}
            <button onClick={resendOTP} className="resend-btn">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
