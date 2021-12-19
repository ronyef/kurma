import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuthContext } from "./hooks/useAuthContext";
import { OrderContextProvider } from "./context/OrderContext";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const { authIsReady, user } = useAuthContext();

  return (
    <IonApp>
      {authIsReady && (
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              { user && <Redirect to='/dashboard' /> }
              { !user && <Home /> }
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/login">
              { user && <Redirect to="/dashboard" /> } 
              { !user && <Login />}
            </Route>
            <Route path="/register">
              { user && <Redirect to="/dashboard" /> }
              { !user && <Register /> }
            </Route>
            <Route path="/dashboard">
              { !user && <Redirect to='/login' /> }
              { user && 
                <OrderContextProvider>
                  <Dashboard /> 
                </OrderContextProvider>
              }
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </IonApp>
  );
};

export default App;
