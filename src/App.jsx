import React, { useEffect, useState } from "react";

export default function App() {
  let [countries, setCountries] = useState([]);
  let [input, setInput] = useState("");
  let [all, setAll] = useState([]);

  useEffect(() => {
    async function run() {
      try {
        let data = await fetch(
          "https://countriesnow.space/api/v0.1/countries/population"
        );
        console.log("called");
        let res = await data.json();
        setAll(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    run();
    return;
  }, []);

  useEffect(() => {
    if (input) {
      let data = all.filter((countryObj) =>
        countryObj.country.toLowerCase().includes(input)
      );
      setCountries(function () {
        let res = [];
        data.forEach((item) => res.push(item.country));
        return res;
      });
    } else setCountries([]);
    return;
  }, [input]);

  return (
    <div>
      <input
        style={{ width: "50%", height: "2rem" }}
        placeholder="Search county..."
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <>
        {countries.map((country, idx) => {
          return <p key={idx}>{country}</p>;
        })}
      </>
    </div>
  );
}

