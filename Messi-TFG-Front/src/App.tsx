import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/index/page';
import NavBar from './components/navBar.tsx';
import Footer from './components/footer.tsx';
const App = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
