import React, { useEffect, useState } from "react";
import "./Home.scss";

export default function Home() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const data = await window.electron.fetchData("SELECT * FROM TaskConsumption");
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home-page">
      <div className="home-page__container container">
        <div>
          <h2>Hello</h2>
          <ul>
            {data.map((row, index) => (
              <li key={index}>{JSON.stringify(row)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
