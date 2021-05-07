import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DataPage from "./pages/DataPage";
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={MainPage} />
      <Route path="/data" component={DataPage} />
    </BrowserRouter>

  );
}
export default App;