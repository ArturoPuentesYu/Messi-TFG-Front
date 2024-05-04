import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.tsx';
import NavBar from './components/navBar.tsx';
import Footer from './components/footer.tsx';
const App = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
