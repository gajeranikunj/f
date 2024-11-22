import './App.css';
import MiniDrawer from './component/MiniDrawer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/musicfolder/Home';
import Profile from './component/musicfolder/profile/Profile';
import LoginForm from './component/LoginForm';
import SignUpForm from './component/SignUpForm';
import { useState } from 'react';
import data1 from './component/data/data';

function App() {
  const [data, setdata] = useState();
  const [dataofmu, setdataofmu] = useState();
  const [chengmusic, setchengmusic] = useState();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MiniDrawer />}>
            <Route index element={<Home data={data} setdata={setdata} dataofmu={dataofmu} setdataofmu={setdataofmu} chengmusic={chengmusic} setchengmusic={setchengmusic} data1={data1} />} />
            <Route path="play" element={<Home />} />
            <Route path="profile/*" element={<Profile />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignUpForm />} />
            {/* Handle play route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
