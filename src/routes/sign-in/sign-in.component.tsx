import {signinWithgooglePopup, createUserDocFromAuth} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const signInWithGoogle = async () => {
        const response = await signinWithgooglePopup();
        const user = await createUserDocFromAuth(response.user);
        console.log("user", user);
    }

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={signInWithGoogle}>Sign in</button>
        </div>
    )
}

export default SignIn