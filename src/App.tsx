import Navigation from "./routes/navigation/navigation";
import Home from "./routes/home/home";
import SignIn from "./routes/sign-in/sign-in.component";
import { Routes, Route} from "react-router-dom";
import Shop from "./routes/shop/shop.component";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
