import { useState } from "react";
import {
  createUserDocFromAuth,
  signInWithEmail,
  signinWithgooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

const defaultForm = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultForm);
  const { email, password } = formFields;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("logando");
    try {
      const response = await signInWithEmail(email, password);
      const user = response.user;
      console.log("user", user);
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    const response = await signinWithgooglePopup();
    const user = await createUserDocFromAuth(response.user);
    console.log("user", user);
  };

  return (
    <div>
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
      <Button type="submit">SIGN IN</Button>
      </form>
      <Button className="google-sign-in" onClick={signInWithGoogle}>
        SIGN IN WITH GOOGLE
      </Button>
    </div>
  );
};

export default SignInForm;
