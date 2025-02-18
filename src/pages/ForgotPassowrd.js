import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleSendCode = async () => {
    const response = await fetch(SummaryApi.forgotPassword.url, {
      method: SummaryApi.forgotPassword.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
      setStep(2);
    } else {
      toast.error(data.message);
    }
  };

  const handleVerifyCode = async () => {
    const response = await fetch(SummaryApi.verifyCode.url, {
      method: SummaryApi.verifyCode.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, newPassword }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
      setStep(3);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
            onClick={handleSendCode}
          >
            Send Verification Code
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Enter Verification Code</h2>
          <input
            type="text"
            placeholder="Enter code"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            onClick={handleVerifyCode}
          >
            Verify Code & Reset Password
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Password Reset Successful!</h2>
          <button
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            onClick={() => (window.location.href = '/login')}
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
