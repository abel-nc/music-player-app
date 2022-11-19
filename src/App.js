import React from 'react';
import { Route, Routes } from 'react-router';
import Searcher from './components/Searcher';
import Sidebar from './components/Sidebar';
import './main.scss';
import Discover from './pages/Discover'
import AroundYou from './pages/AroundYou'
import TopArtists from './pages/TopArtists'
import TopCharts from './pages/TopCharts'
import SongBar from './components/SongBar';
import { useGlobalContext } from './context';
import ArtistPage from './pages/ArtistPage';
import SongPage from './pages/SongPage';
import SearchPage from './pages/SearchPage';
import Footer from './components/Footer';

const App = () => {

  const { activeSong } = useGlobalContext()

  return (
    <main className='d-flex'>
      <Sidebar />
      <div className='app-page'>
        <Searcher />
        <div className='d-flex'>
          <Routes>
            <Route path='/' element={<Discover />} />
            <Route path='/around-you' element={<AroundYou />} />
            <Route path='/top-artists' element={<TopArtists />} />
            <Route path='/top-charts' element={<TopCharts />} />
            <Route path='/artists/:id' element={<ArtistPage />} />
            <Route path='/songs/:id' element={<SongPage />} />
            <Route path='/search/:query' element={<SearchPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
      { activeSong.hub ? <SongBar /> : null }
    </main>
  );
}

export default App;
