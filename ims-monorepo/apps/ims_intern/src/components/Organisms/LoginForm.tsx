'use client';

import React, { useState } from 'react';
import FormField from '../Molecules/Form';
import Button from '../InputField/Button';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.container}>
      
      <h1 className={styles.title}>Avant</h1>
      <p className={styles.subtitle}>Login to your account</p>

      <div className={styles.form}>
        <FormField
          label=""
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormField
          label=""
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.forgotdiv}>
          <a href="#" className={styles.forgot}>
            Forgot Password?
          </a>
        </div>
        <Button>
          Login
        </Button>
      </div>

     
      <div className={styles.divider}>
        <span>- Or login with -</span>
      </div>

    
      <div className={styles.socials}>
        <div className={styles.icon}>G</div>
        <div className={styles.icon}>f</div>
      </div>

   
      <p className={styles.footer}>
        Don’t have an account? <span className={styles.signup}>Sign up</span>
      </p>

    </div>
  );
};

export default LoginForm;