import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Auth.css';

const Auth: React.FC = () => {
  const { login, register } = useContext(AuthContext);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const reset = () => {
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password);
        setSuccess('Account created successfully. Redirecting...');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-hero">
          <h2>Welcome back to Oris</h2>
          <p>Sign in or create a new account to browse our products and manage your orders.</p>
        </div>
        <div className="auth-panel">
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); reset(); }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => { setMode('signup'); reset(); }}
            >
              Sign Up
            </button>
          </div>

          {error && <div className="auth-message auth-error">{error}</div>}
          {success && <div className="auth-message auth-success">{success}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <label>
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            )}

            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </label>

            <button type="submit" className="auth-submit">
              {mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            {mode === 'login' ? (
              <span>
                New here?{' '}
                <button type="button" className="auth-link" onClick={() => { setMode('signup'); reset(); }}>
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button type="button" className="auth-link" onClick={() => { setMode('login'); reset(); }}>
                  Sign in now
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
