import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "./store/store";

import Footer from './components/Footer/Footer'
import Header from "./components/Header/AppBar";
import Calendar from "./components/Calendar/Calendar";

import LoginPage from "./components/LoginPage/LoginPage";

function App() {
  const [isUserKnown, setIsUserKnown] = React.useState(
    localStorage.getItem("username") !== null
  );
  const [redirect, setRedirect] = React.useState("");

  useEffect(() => {
    isUserKnown ? setRedirect("/calendar") : setRedirect("/login");
  }, [isUserKnown]);

  return (
    <div className="App">
      <StoreProvider store={store}>
        <Router>
          {redirect ? <Redirect to={redirect} /> : <></>}
          <Switch>
            <Route path="/login">
              <LoginPage
                isUserKnown={isUserKnown}
                setIsUserKnown={setIsUserKnown}
              />
            </Route>
            <Route path="/calendar">
              <Header />
              <main>
                <Calendar />
              </main>
              <Footer />
            </Route>
            <Route path="*">
              <Redirect to={redirect} />
            </Route>
          </Switch>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
