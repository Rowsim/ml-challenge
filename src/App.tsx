import React, { useEffect, useState } from "react";
import { getCompanies } from "./company-service";

function App() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies().then(results => setCompanies(results))
  });

  return (
    <div className="App">
      <h1>ML-Challenge</h1>
      <div>
        {companies && companies.map((company) => (
          <span>{company},</span>
        ))}
      </div>
    </div>
  );
}

export default App;
