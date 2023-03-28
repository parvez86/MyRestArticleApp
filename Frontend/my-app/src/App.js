import logo from './logo.svg';
import './App.css';
import FuncComp from './components/funcComp';
import ClassComp from './components/classComponent'
import Main from './components/Main';

function App() {
  function myClick(name){
    alert(`${name}component is clicked`)
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>  
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <h2>This is homepage</h2>
      <FuncComp name="Functional" myClick={myClick}/>
      <ClassComp name="Class" myClick={myClick}/> */}
      <Main/>      
    </div>
  );
}

export default App;
