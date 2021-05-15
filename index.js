require('dotenv').config();
const list = document.querySelector(".cities");
const apiKey = process.env.API_KEY;
const currentIndex = 0;

const inputVal = [
    { city: 'London', country: 'UK', lat: 51.50, long: -0.12, image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', gradient: 'red' },
    { city: 'Milan', country: 'Italy', lat: 45.46, long: 9.18, image: 'https://images.unsplash.com/photo-1482321627772-e424c859793c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fG1pbGFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', gradient: 'green' },
    { city: 'Bangkok', country: 'Thailand', lat: 13.75, long: 100.50, image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFuZ2tva3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', gradient: 'purple' },
    { city: 'Los Angeles', country: 'USA', lat: 34.05, long: -118.24, image: 'https://images.unsplash.com/photo-1503891450247-ee5f8ec46dc3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bG9zJTIwYW5nZWxlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', gradient: 'tomato' },
    { city: 'Nairobi', country: 'Kenya', lat: -1.29, long: 36.82, image: 'https://images.unsplash.com/photo-1605885074285-0e73895391db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80', gradient: 'cadetblue' }
];

let arr = [];
inputVal.forEach((el, i) => {
            const url3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${el.lat}&lon=${el.long}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=metric`
            fetch(url3)
                .then(response => response.json())
                .then(data => {
                        const { current, daily } = data;
                        const icon = (p) => `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${p.weather[0]["icon"]}.svg`;
                        const li = document.createElement("li");
                        li.classList.add("city");
                        li.style.backgroundImage = ` url(${el.image}), linear-gradient(${el.gradient}, black)`;
                        li.id = `slide-${i + 1}`;
                        const markup = `
        <div class="selected-city">
            <h2 class="city-name" data-name="${el.city},${el.country}">
              ${el.city}
            </h2>
            <div class="city-weather">${current.weather[0]["description"]}</div>
            <div class="city-temp">${Math.round(current.temp)}<span class="city-temp__symbol--current">&#176</span></div>
        </div>
        <div class="selected-city__week">
            <ul class="city-temp__list">
            ${daily.splice(0, 5).map((e) => `<li class="city-temp__list-item">
                                                <div class="city-temp">${Math.round(e.temp.day)}<span class="city-temp__symbol--week">&#176</span></div>
                                                <figure>
                                                      <img class="city-icon" src="${icon(e)}" alt="${e.weather[0]["description"]}">
                                                      <figcaption>${e.weather[0]["description"]}</figcaption>
                                                </figure>
                                              </li>`)}
            </ul>
        </div>
        
      `;
            
            li.innerHTML = markup;
            arr.push(li);
            const sorted = arr.sort((a, b) => {
              const slideA = a.id;
              const slideB = b.id;
              return slideA < slideB ? -1 : slideA < slideB ? 1 : 0
            })
            for (x of sorted) {
              list.appendChild(x);
            }    
        })
        .catch((e) => {
            console.log('something went wrong...', e);
        });
})