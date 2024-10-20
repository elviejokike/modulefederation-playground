import './App.css';
import { DynamicView } from './viewService';

const App = () => {
  return (
    <div className="content">
      <h1>Dynamic View</h1>
      <p>Embed remote views with Modoule Federation Runtime</p>
      <DynamicView module="fed_provider/Comp2" color="green" fontSize="28px"/>
    </div>
  );
};

export default App;
