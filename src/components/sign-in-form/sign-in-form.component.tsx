import { useState, useContext } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {UserContext} from "../../contexts/user.context"
import {
  createUserDocFromAuth,
  signInWithEmail,
  signinWithgooglePopup,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";

const defaultForm = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultForm);
  const { email, password } = formFields;

  const userContext = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await signInWithEmail(email, password);
      userContext?.setUser(response);
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
    <div className="sign-up-container">
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
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" className="google-sign-in" onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
