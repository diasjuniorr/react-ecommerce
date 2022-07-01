import { useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {
  signInWithEmail,
  signinWithgooglePopup,
} from "../../utils/firebase/firebase.utils";
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";

const defaultForm = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultForm);
  const { email, password } = formFields;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmail(email, password);
      resetFormFields();
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signinWithgooglePopup();
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormFields(defaultForm);
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <ButtonsContainer>
          <Button type="submit">SIGN IN</Button>
          <Button
            type="button"
            className="google-sign-in"
            onClick={signInWithGoogle}
          >
            GOOGLE SIGN IN
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
