function clickHandle(event) {
    alert("Welcome to the site!")
}

// const form = document.querySelector(".top-banner form");
// const input = document.querySelector(".top-banner input");
// const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".cities");
// const weekSection = document.querySelector(".week");
/*SUBSCRIBE HERE FOR API KEY: https://home.openweathermap.org/users/sign_up*/
const apiKey = "ad6cc1a0ca4dd07bb9bca808aa485dcf";
const currentIndex = 0;
console.log(apiKey, 'apikey')


// form.addEventListener("submit", e => {
//     e.preventDefault();
//     let inputVal = input.value;

//     //check if there's already a city
//     const listItems = list.querySelectorAll(".ajax-section .city");
//     const listItemsArray = Array.from(listItems);

//     if (listItemsArray.length > 0) {
//         const filteredArray = listItemsArray.filter(el => {
//             let content = "";
//             //athens,gr
//             if (inputVal.includes(",")) {
//                 //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
//                 if (inputVal.split(",")[1].length > 2) {
//                     inputVal = inputVal.split(",")[0];
//                     content = el
//                         .querySelector(".city-name span")
//                         .textContent.toLowerCase();
//                 } else {
//                     content = el.querySelector(".city-name").dataset.name.toLowerCase();
//                 }
//             } else {
//                 //athens
//                 content = el.querySelector(".city-name span").textContent.toLowerCase();
//             }
//             return content == inputVal.toLowerCase();
//         });

//         if (filteredArray.length > 0) {
//             msg.textContent = `You already know the weather for ${
//         filteredArray[0].querySelector(".city-name span").textContent
//       } ...otherwise be more specific by providing the country code as well 😉`;
//             form.reset();
//             input.focus();
//             return;
//         }
//     }

//ajax here
const inputVal = [
    { city: 'London', country: 'UK', lat: 51.50, long: -0.12 },
    { city: 'Milan', country: 'Italy', lat: 45.46, long: 9.18 },
    { city: 'Bangkok', country: 'Thailand', lat: 13.75, long: 100.50 },
    { city: 'Los Angeles', country: 'USA', lat: 34.05, long: -118.24 },
    { city: 'Nairobi', country: 'Kenya', lat: -1.29, long: 36.82 }
];

// const displayImage = () => {
//     for (let i = 0; i < inputVal.length; i++) {
//         console.log(inputVal[i], '---------------')

//         inputVal[i].style.display = "none";
//     }
//     inputVal[currentIndex].style.display = "block";
// }

// const moveLeft = () => {
//     if (currentIndex === 0) {
//         currentIndex = carouselImages.length - 1;
//     } else {
//         currentIndex--;
//     }

//     displayImage();
// }
// const moveRight = () => {
//     if (currentIndex == carouselImages.length - 1) {
//         currentIndex = 0;
//     } else {
//         currentIndex++;
//     }

//     displayImage();
// }

// function dotClick(c) {
//     currentIndex = c;
//     displayImage();
//     displayDot();
// }

// displayImage();

inputVal.forEach((el, i) => {
            const url3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${el.lat}&lon=${el.long}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=metric`
            console.log(url3)
            fetch(url3)
                .then(response => response.json())
                .then(data => {
                        const { current, daily } = data;
                        console.log(data, '------------------------')
                        const icon = (p) => `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${p.weather[0]["icon"]}.svg`;
                        const li = document.createElement("li");
                        li.classList.add("city");
                        li.id = `slide-${i + 1}`;
                        console.log('getting here--------------------')
                        const markup = `
        <div class="selected-city">
          <h2 class="city-name" data-name="${el.city},${el.country}">
            <span>${el.city} </span>
          </h2>
          <h3 class="country-name"><span>${el.country}</span></h3>
          <div class="city-temp">${Math.round(current.temp)}<span>°C</span></div>
          <figure>
            <img class="city-icon" src="${icon(current)}" alt="${current.weather[0]["description"]}">
            <figcaption>${current.weather[0]["description"]}</figcaption>
          </figure>
          </div>
          <div class="selected-city__week">
            <ul class="city-temp__list">
              ${daily.splice(0, 5).map((e) => `<li class="city-temp__list-item">
                                                <div class="city-temp">${Math.round(e.temp.day)}<span>°C</span></div>
                                                <figure>
                                                      <img class="city-icon" src="${icon(e)}" alt="${e.weather[0]["description"]}">
                                                      <figcaption>${e.weather[0]["description"]}</figcaption>
                                                  </figure>
                                                </li>`)}
            </ul>
        </div>
        
      `;

            li.innerHTML = markup;
            let arr = [];
            arr.push(li);
            const sorted = arr.sort((a, b) => a.id - b-id)
            for (x of sorted) {
              list.appendChild(li);
            }    
        })
        .catch(() => {
            msg.textContent = "Please search for a valid city 😩";
        });
})



//     msg.textContent = "";
//     form.reset();
//     input.focus();
// })