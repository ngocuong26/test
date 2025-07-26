import './App.css';
import '../src/Global/Global.scss';
import HomePage from './pages/Home/Home';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import SignIn from './pages/SignIn/SignIn';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <Router>
      <AppSignIn />
    </Router>
  );
  
}

function AppSignIn() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      { 
        path === '/signin' || path === '/profile' || 
        path === '/profile/post/add' || path === '/profile/post/edit' ? 
      (
        <div className={`${path === '/signin' ? 'signin' : 'profile'}`}>
          <Routes>
              <Route path='/signin' element={<SignIn />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/post/add' element={<Profile />} />
              <Route path='/profile/post/edit' element={<Profile />} />
            </Routes>
        </div>
      ) : (
        <>
          <div className='app'>
            <div className="content">
              <Header />
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/link' element={<HomePage />} />
                  <Route path='/signin' element={<SignIn />} />
                </Routes>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

export default App
