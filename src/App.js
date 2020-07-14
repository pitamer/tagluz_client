import React from 'react';

import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Calendar from './components/Calendar/Calendar'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Calendar />
      </main>
      <Footer />
    </div>
  );
}

export default App;
