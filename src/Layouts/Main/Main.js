import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../../Pages/Index.js';
import Show from '../../Pages/Show.js';
import CreatePost from '../../Pages/CreatePost.js';
import "../../Assets/Styles/index.css";
import { useNavigate } from 'react-router-dom';
import Splash from '../../Pages/splash.js';



const Main = (props) => {
  const [gameData, setGameData] = useState(null);
  const URL = 'https://gamehub-backend.onrender.com/';

  const navigate = useNavigate();

  const getGame = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setGameData(data);
  };

  const createGame = async (newGame) => {
    const createURL = 'http://localhost:4000/collection/create';

    try {
      const response = await fetch(createURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGame),
      });

      if (response.ok) {
        console.log('Game created successfully');
      } else {
        console.log('Failed to create Game');
      }
    } catch (error) {
      console.log('Error creating Game:', error);
    }
  };

  const updateGame = async (updatedGame, id) => {
    await fetch(URL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGame),
    });

    getGame();
  };

  const deleteGame = async (id) => {
    await fetch(URL + id, {
      method: 'DELETE',
    });

    getGame();
  };

  useEffect(() => {
    getGame();
  }, []);

  return (
    <main>
      <Routes>
      <Route
          path="/collection"
          element={props.user ? (
            <Index gameData={gameData} />
          ) : (
            // redirect
            () => {
              navigate('/', { replace: true });
              return null;
            }
          )}
        />
        <Route
          path="/collection/:id"
          element={<Show gameData={gameData} updateGame={updateGame} deleteGame={deleteGame} />}
        />
      <Route
          path="/collection/create"
          element={props.user ? (
            <CreatePost createGame={createGame} />
          ) : (
            // redirect
            () => {
              navigate('/', { replace: true });
              return null;
            }
          )}
        />
        <Route
          exact path="/"
          element={<Splash />}
        />

      </Routes>
   
    </main>
  );
};

export default Main;
