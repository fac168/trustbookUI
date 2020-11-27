import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import firebase from './firebase/index';
import AccountSearch from './component/AccountSearch';

function App() {
  console.log(firebase.db);
  return (
    <div className="App">
      <AccountSearch />
    </div>
  );
}

export default App;
