import { useState } from 'react';
import './App.css';
import { DynamicView } from './viewService';

const App = () => {
  const [comp, setComponent] = useState("fed_provider/Comp1");
  const [view, setView] = useState(comp);
  const handleChange = (e:any) => {
    setComponent(e.target.value);
  };
  return (
    <>
      <div className="content">
        <h1>Dynamic View</h1>
        <p>Embed remote views with Modoule Federation Runtime</p>
      </div>
      <div className="component">
        <input
          type="text"
          name="surName"
          value={comp}
          onChange={handleChange}
        />
        <button type="button" onClick={() => setView(comp)}>Set Component</button>
      </div>
      <div className="view">
        <DynamicView module={view} color="green" fontSize="28px"/>
      </div>
    </>
  );
};

export default App;
