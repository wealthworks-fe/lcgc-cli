import React from 'react';
import { render } from 'react-dom'
import './<%= name %>.less';
  
function App() {
  return (
    <div className="normal">
      <h1>Page <%= name %></h1>
    </div>
  );
}

render(<App/>,document.getElementById('root'))