import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import{ useState } from 'react';
import Last from './components/Last.js';

const App = () => {
  let PageSize = 5;
  let apiKey = process.env.REACT_APP_NEWS_API
  const [progress,setProgress] = useState(0)

  return (
    <div className="App">
      <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />   
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  pageSize={PageSize} country="in" category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize={PageSize} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={PageSize} country="in" category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={PageSize} country="in" category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize={PageSize} country="in" category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" pageSize={PageSize} country="in" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={PageSize} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" pageSize={PageSize} country="in" category="technology" />} />
        </Routes>
      </Router>
      <Last/>
    </div>
  );
}

export default App;
