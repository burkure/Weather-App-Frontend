import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";


function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
  });

  

  async function weatherData(e) {
    e.preventDefault();
    if (form.city == "") {
      alert("Enter City...");
    } else {
      const data = await fetch(
        `http://localhost:8080/weather/city/${form.city}`
      )
        .then((res) => res.json())
        .then((data) => data.data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "city") {
      setForm({ ...form, city: value });
    }
  };
  return (
    <div className="weather">
      <div className="weather-body">
        <img src="/Weather+Targeting.png" style={{width: "15%"}}/> <br/>
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="Enter City Name"
          name="city"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {/* {console.log(weather)} */}
      {weather.data != undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
      </div>
    </div>
  );
}

export default Weather;