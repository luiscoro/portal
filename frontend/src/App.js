import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/section/Footer";
import Header from "./components/section/Header";
import Home from "./components/section/Home";

function App() {
  return (
    <Router>
      <div className="main-wrapper color-variation-four">
        <Header />
        <Route path="/" component={Home} exact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
