import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import LocalRoutes from './Router/LocalRoutes'


function App() {
  return (
    <div className="App">
      <LocalRoutes/>
      <Login/>
    </div>
  );
}

export default App;
