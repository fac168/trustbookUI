import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';
import firebase from './firebase/index';
import {AppRoute} from './AppRoute';

function App() {
  console.log(firebase.db);
  return (
    <div className="App">
      <AppRoute />
    </div>
  );
}

export default App;
