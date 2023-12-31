import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BeritaProvider } from './contexts/beritaContext';
import Layout from "./layouts/latyout"
import Home from './pages/home';
import BeritaApi from './pages/berita-api';
import IklanApi from './pages/iklan-api';
import EdukasiApi from './pages/edukasi-api';
import PraloginApi from './pages/pralogin-api';
import { IklanProvider } from './contexts/iklanContext';
import { EdukasiProvider } from './contexts/edukasiContext';
import { PraloginProvider } from './contexts/praloginContext';
import Login from './pages/login';
import TermPolicyApi from './pages/term-policy-api';
import { TermPolicyProvider } from './contexts/termPolicyContext';

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <Layout>
                <Home />
              </Layout>
            } />
            <Route path='/login' element={
              <Layout>
                <Login />
              </Layout>
            } />
            <Route path='/berita' element={
              <BeritaProvider>
                <Layout>
                  <BeritaApi />
                </Layout>
              </BeritaProvider>
            } />
            <Route path='/iklan' element={
              <IklanProvider>
                <Layout>
                  <IklanApi />
                </Layout>
              </IklanProvider>
            } />
            <Route path='/edukasi' element={
              <EdukasiProvider>
                <Layout>
                  <EdukasiApi />
                </Layout>
              </EdukasiProvider>
            } />
            <Route path='/pralogin' element={
              <PraloginProvider>
                <Layout>
                  <PraloginApi />
                </Layout>
              </PraloginProvider>
            } />
            <Route path='/term-policy' element={
              <TermPolicyProvider>
                <Layout>
                  <TermPolicyApi />
                </Layout>
              </TermPolicyProvider>
            } />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
