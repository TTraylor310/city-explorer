import Header from './Header';
import Footer from './Footer.js';
import Main from './Main.js';
import '../css/style.css';
// import axios from "axios";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default App;
