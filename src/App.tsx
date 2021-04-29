import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./pages";
import LoginForm from "./components/LoginForm";
import ProjectList from "./components/ProjectList";
import React from "react";
import useToken from "./store/useToken";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <LoginForm setToken={setToken} />;
  }
  return (
    <div className="App">
      <h1 data-testid="heading">Application</h1>
      <ProjectList token={token} />
      <p>{JSON.stringify(token)}</p>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
