import { useEffect, useState } from "react";
import $ from "jquery";
import Swal from 'sweetalert2';
import './App.css';
import NavBar from "./components/navbar/NavBar.jsx";
import MainCard from "./components/card/MainCard.jsx";
import History from "./components/history/History.jsx"

function App() {
  const [isLoged, setIsLoged] = useState(false);
  const [userid, setUserId] = useState(0);
  const [balance, setBalance] = useState(0);
  var id = sessionStorage.getItem('id');
  var logged = sessionStorage.getItem('logged');

  useEffect(() => {
    if (logged) {
      setIsLoged(true);
      setUserId(id)
    }
    else {
      setIsLoged(false);
      setUserId(0)
    }
  }, [logged, id])

  useEffect(() => {
    if (id) {
      $.ajax({
        url: `http://localhost:3001/balance/${id}`,
        type: "GET",
        dataType: "json",
        success: function (r) {
          setBalance(r)
        },
        error: function (xhr, status) {
          Swal.fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: 'Por favor revise los campos',
          })
        },
      })
    }
  }, [id])

  return (
    <div className="App">
      <NavBar isLoged={isLoged} />
      <MainCard user={userid} balance={balance} />
      <History />
    </div>
  );
}

export default App;
