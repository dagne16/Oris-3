import React, { useState } from 'react';
import './Signup.css';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Signup failed');
      // on success redirect to login
      window.location.href = '/login';
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <section className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create account</h2>
        {error && <div className="signup-error">{error}</div>}
        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button className="signup-btn" type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default Signup;
