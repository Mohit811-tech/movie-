import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import Favourite from './components/Favourite';

function App() {
  return (
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={
            <>
              <Banner/>
              <Movies/>
            </>
          }>
          </Route>

          <Route path='/favourite' element={
            <Favourite />
          }>
          </Route>
        </Routes>
      </BrowserRouter>

  );
}

export default App;
