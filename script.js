const generate =  async function () {
    const city = document.getElementById("city").value;
    const api = "43b45a25ab040b556ddbf855b65203d0"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},uk&appid=${api}&units=metric`; 

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`); 
        }

        const data = await response.json();
        const weather = data.weather[0].description; 
        const temp = data.main.temp; 
        const humidity = data.main.humidity; 

       const resultDiv= document.getElementsByClassName("result")[0];
       resultDiv.innerHTML=`
            <h2>Weather in ${city}</h2>
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Condition: ${weather}</p>
        `;
        resultDiv.classList.add("active");

    } catch (error) {
        const resultDiv = document.getElementsByClassName("result")[0];
        resultDiv.innerHTML = "<p>Could not fetch data, please try again...</p>";
        resultDiv.classList.add("active"); 
        console.error(error);
    }
};
document.getElementById("btn").addEventListener("click",generate);

document.getElementById("city").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        generate();
    }
});