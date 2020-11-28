import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';
import firebase from './firebase/index';
import AccountAdd from './component/AccountAdd';

function App() {
  console.log(firebase.db);
  return (
    <div className="App">
      <AccountAdd />
    </div>
  );
}

export default App;
