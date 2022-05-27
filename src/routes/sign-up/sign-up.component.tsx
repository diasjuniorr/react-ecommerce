import React, { useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import {
  createUserDocFromAuth,
  signUpWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const form = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(form);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return
    }

    try {
      const userCredentials = await signUpWithEmailAndPassword(email, password);
      await createUserDocFromAuth(userCredentials.user, {
        displayName,
      });

      resetFormFields();
    } catch (err) {
      alert(err);
    }
  };

  const resetFormFields = () => {
    setFormFields(form);
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          label="Display Name"
          name="displayName"
          type="text"
          value={displayName}
          onChange={handleChange}
        />

        <FormInput
          required
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          required
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />

        <FormInput
          required
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
