import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Taskcomponents from './Components/Task/Task';
import "primereact/resources/themes/lara-light-indigo/theme.css";  



function App() {
  return (
    <div className="App">
       <Taskcomponents />
     
    </div>
  );
}

export default App;
