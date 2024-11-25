import './App.css';
import MiniDrawer from './component/MiniDrawer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/musicfolder/Home';
import Profile from './component/musicfolder/profile/Profile';
import LoginForm from './component/LoginForm';
import SignUpForm from './component/SignUpForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Customplaylists from './component/musicfolder/Customplaylists';
import Add from './component/musicfolder/Add';

function App() {
  const [dataget, setdataget] = useState();

  const [musiclist, setmusiclist] = useState();

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3005/publicmusic/show');
              console.log(response.data);
              setmusiclist(response.data.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/publicmusic/publicmusic');
        console.log(response.data.data);
        setdataget(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    console.log(dataget);
  }, [dataget])
  const [data, setdata] = useState();
  const [dataofmu, setdataofmu] = useState();
  const [chengmusic, setchengmusic] = useState();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MiniDrawer />}>
            <Route index element={<Home data={data} setdata={setdata} dataofmu={dataofmu} setdataofmu={setdataofmu} chengmusic={chengmusic} setchengmusic={setchengmusic} data1={dataget} musiclist={musiclist} />} />
            <Route path="play" element={<Customplaylists />} />
            <Route path="Add" element={<Add />} />
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
