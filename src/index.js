function displayCurrentDateAndTime() {
  const currentDate = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = currentDate.getDate().toString().padStart(2, "0");
  const month = currentDate.getMonth().toString().padStart(2, "0");
  const day = days[currentDate.getDay()];
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");

  const currentDateAndTime = document.querySelector("#current-date-and-time");
  currentDateAndTime.innerHTML = `${day} ${date}.${month} | ${hours}:${minutes}`;
}

function currentPositionCallback(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(showWeather);
  console.log(position.data);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(currentPositionCallback);
}

function showUVindex(UVindex) {
  let uv = UVindex;
  let uvElement = document.querySelector("#uv-index");
  uvElement.innerHTML = Math.round(uv);
}

function forecastDayFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
    <div class="col">
            <span class="day-of-the-week">${forecastDayFormat(
              forecastDay.dt
            )}</span>
            <img class="weather-forecast-icon" src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" />
            <span class = "forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}?? </span>
            <span class = "forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}??</span>
          </div>
    `;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;

  showUVindex(response.data.current.uvi);
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  let currentCityDisplay = document.querySelector("#city-name");
  currentCityDisplay.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temperatureValue = document.querySelector("#current-temperature");
  temperatureValue.innerHTML = `${temperature}??`;

  let currentCountryCode = response.data.sys.country;
  let currentCountryName = countryCodes[currentCountryCode];
  let currentCountryDisplay = document.querySelector("#country-name");
  currentCountryDisplay.innerHTML = currentCountryName;

  let currentWeatherIcon = document.querySelector("#icon");
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = response.data.main.humidity;

  let currentWindSpeed = document.querySelector("#wind");
  currentWindSpeed.innerHTML = response.data.wind.speed;

  let currentWeatherDescription = document.querySelector(
    "#weather-description"
  );
  currentWeatherDescription.innerHTML = response.data.weather[0].description;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCityBySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  if (city) {
    searchCity(city);
  } else {
    alert("Please, enter a city");
  }
}

// Country names by codes
const countryCodes = {
  BD: "Bangladesh",
  BE: "Belgium",
  BF: "Burkina Faso",
  BG: "Bulgaria",
  BA: "Bosnia and Herzegovina",
  BB: "Barbados",
  WF: "Wallis and Futuna",
  BL: "Saint Barthelemy",
  BM: "Bermuda",
  BN: "Brunei",
  BO: "Bolivia",
  BH: "Bahrain",
  BI: "Burundi",
  BJ: "Benin",
  BT: "Bhutan",
  JM: "Jamaica",
  BV: "Bouvet Island",
  BW: "Botswana",
  WS: "Samoa",
  BQ: "Bonaire, Saint Eustatius and Saba ",
  BR: "Brazil",
  BS: "Bahamas",
  JE: "Jersey",
  BY: "Belarus",
  BZ: "Belize",
  RU: "Russia",
  RW: "Rwanda",
  RS: "Serbia",
  TL: "East Timor",
  RE: "Reunion",
  TM: "Turkmenistan",
  TJ: "Tajikistan",
  RO: "Romania",
  TK: "Tokelau",
  GW: "Guinea-Bissau",
  GU: "Guam",
  GT: "Guatemala",
  GS: "South Georgia and the South Sandwich Islands",
  GR: "Greece",
  GQ: "Equatorial Guinea",
  GP: "Guadeloupe",
  JP: "Japan",
  GY: "Guyana",
  GG: "Guernsey",
  GF: "French Guiana",
  GE: "Georgia",
  GD: "Grenada",
  GB: "United Kingdom",
  GA: "Gabon",
  SV: "El Salvador",
  GN: "Guinea",
  GM: "Gambia",
  GL: "Greenland",
  GI: "Gibraltar",
  GH: "Ghana",
  OM: "Oman",
  TN: "Tunisia",
  JO: "Jordan",
  HR: "Croatia",
  HT: "Haiti",
  HU: "Hungary",
  HK: "Hong Kong",
  HN: "Honduras",
  HM: "Heard Island and McDonald Islands",
  VE: "Venezuela",
  PR: "Puerto Rico",
  PS: "Palestinian Territory",
  PW: "Palau",
  PT: "Portugal",
  SJ: "Svalbard and Jan Mayen",
  PY: "Paraguay",
  IQ: "Iraq",
  PA: "Panama",
  PF: "French Polynesia",
  PG: "Papua New Guinea",
  PE: "Peru",
  PK: "Pakistan",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PM: "Saint Pierre and Miquelon",
  ZM: "Zambia",
  EH: "Western Sahara",
  EE: "Estonia",
  EG: "Egypt",
  ZA: "South Africa",
  EC: "Ecuador",
  IT: "Italy",
  VN: "Vietnam",
  SB: "Solomon Islands",
  ET: "Ethiopia",
  SO: "Somalia",
  ZW: "Zimbabwe",
  SA: "Saudi Arabia",
  ES: "Spain",
  ER: "Eritrea",
  ME: "Montenegro",
  MD: "Moldova",
  MG: "Madagascar",
  MF: "Saint Martin",
  MA: "Morocco",
  MC: "Monaco",
  UZ: "Uzbekistan",
  MM: "Myanmar",
  ML: "Mali",
  MO: "Macao",
  MN: "Mongolia",
  MH: "Marshall Islands",
  MK: "Macedonia",
  MU: "Mauritius",
  MT: "Malta",
  MW: "Malawi",
  MV: "Maldives",
  MQ: "Martinique",
  MP: "Northern Mariana Islands",
  MS: "Montserrat",
  MR: "Mauritania",
  IM: "Isle of Man",
  UG: "Uganda",
  TZ: "Tanzania",
  MY: "Malaysia",
  MX: "Mexico",
  IL: "Israel",
  FR: "France",
  IO: "British Indian Ocean Territory",
  SH: "Saint Helena",
  FI: "Finland",
  FJ: "Fiji",
  FK: "Falkland Islands",
  FM: "Micronesia",
  FO: "Faroe Islands",
  NI: "Nicaragua",
  NL: "Netherlands",
  NO: "Norway",
  NA: "Namibia",
  VU: "Vanuatu",
  NC: "New Caledonia",
  NE: "Niger",
  NF: "Norfolk Island",
  NG: "Nigeria",
  NZ: "New Zealand",
  NP: "Nepal",
  NR: "Nauru",
  NU: "Niue",
  CK: "Cook Islands",
  XK: "Kosovo",
  CI: "Ivory Coast",
  CH: "Switzerland",
  CO: "Colombia",
  CN: "China",
  CM: "Cameroon",
  CL: "Chile",
  CC: "Cocos Islands",
  CA: "Canada",
  CG: "Republic of the Congo",
  CF: "Central African Republic",
  CD: "Democratic Republic of the Congo",
  CZ: "Czech Republic",
  CY: "Cyprus",
  CX: "Christmas Island",
  CR: "Costa Rica",
  CW: "Curacao",
  CV: "Cape Verde",
  CU: "Cuba",
  SZ: "Swaziland",
  SY: "Syria",
  SX: "Sint Maarten",
  KG: "Kyrgyzstan",
  KE: "Kenya",
  SS: "South Sudan",
  SR: "Suriname",
  KI: "Kiribati",
  KH: "Cambodia",
  KN: "Saint Kitts and Nevis",
  KM: "Comoros",
  ST: "Sao Tome and Principe",
  SK: "Slovakia",
  KR: "South Korea",
  SI: "Slovenia",
  KP: "North Korea",
  KW: "Kuwait",
  SN: "Senegal",
  SM: "San Marino",
  SL: "Sierra Leone",
  SC: "Seychelles",
  KZ: "Kazakhstan",
  KY: "Cayman Islands",
  SG: "Singapore",
  SE: "Sweden",
  SD: "Sudan",
  DO: "Dominican Republic",
  DM: "Dominica",
  DJ: "Djibouti",
  DK: "Denmark",
  VG: "British Virgin Islands",
  DE: "Germany",
  YE: "Yemen",
  DZ: "Algeria",
  US: "United States",
  UY: "Uruguay",
  YT: "Mayotte",
  UM: "United States Minor Outlying Islands",
  LB: "Lebanon",
  LC: "Saint Lucia",
  LA: "Laos",
  TV: "Tuvalu",
  TW: "Taiwan",
  TT: "Trinidad and Tobago",
  TR: "Turkey",
  LK: "Sri Lanka",
  LI: "Liechtenstein",
  LV: "Latvia",
  TO: "Tonga",
  LT: "Lithuania",
  LU: "Luxembourg",
  LR: "Liberia",
  LS: "Lesotho",
  TH: "Thailand",
  TF: "French Southern Territories",
  TG: "Togo",
  TD: "Chad",
  TC: "Turks and Caicos Islands",
  LY: "Libya",
  VA: "Vatican",
  VC: "Saint Vincent and the Grenadines",
  AE: "United Arab Emirates",
  AD: "Andorra",
  AG: "Antigua and Barbuda",
  AF: "Afghanistan",
  AI: "Anguilla",
  VI: "U.S. Virgin Islands",
  IS: "Iceland",
  IR: "Iran",
  AM: "Armenia",
  AL: "Albania",
  AO: "Angola",
  AQ: "Antarctica",
  AS: "American Samoa",
  AR: "Argentina",
  AU: "Australia",
  AT: "Austria",
  AW: "Aruba",
  IN: "India",
  AX: "Aland Islands",
  AZ: "Azerbaijan",
  IE: "Ireland",
  ID: "Indonesia",
  UA: "Ukraine",
  QA: "Qatar",
  MZ: "Mozambique",
};

const apiKey = "c95d60a1e3adbeb286133f1ebebc2579";

// get html elemtns
const currentLocation = document.querySelector("#current-location");
const citySearchInput = document.querySelector("#search-input");

// add event listeners
currentLocation.addEventListener("click", getCurrentPosition);
citySearchInput.addEventListener("submit", getCityBySubmit);

displayCurrentDateAndTime();
searchCity("Kyiv");
