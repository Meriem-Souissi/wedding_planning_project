import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Invitations from "./pages/Invitations";
import WeddingVenue from "./pages/WeddingVenue";
import HairStylist from "./pages/HairStylist";
import Photographer from "./pages/Photographer";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ScrollToTop from "./component/ScrollToTop";
import { loadUser } from "./actions/authActions";
import { useDispatch } from "react-redux";
import WrongPage from "./pages/WrongPage";
import PrivateRoute from "./PrivateRoute";
import { AnimatePresence } from "framer-motion";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUser());
    }
  }, [localStorage.getItem("token")]);
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence>
        <Switch>
          <Route path="/profile/:id" component={Profile} />
          <Route path="/services/wedding_invitation" component={Invitations} />
          <Route path="/services/wedding_venue" component={WeddingVenue} />
          <Route path="/services/hair_stylist" component={HairStylist} />
          <Route path="/services/photographer" component={Photographer} />
          <PrivateRoute path="/edit-profile" component={EditProfile} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={WrongPage} />
        </Switch>
      </AnimatePresence>
    </Router>
  );
}

export default App;
