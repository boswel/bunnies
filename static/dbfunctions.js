export async function getCountryInfo() {
  return await fetch("https://geolocation-db.com/json/")
  .then(response => response.json())
}

export async function getCountryRecords(countryCode) { 
  return await fetch("/country?" + new URLSearchParams({country:countryCode}))
  .then(response => {
    if (response.ok) {
      return response.json()
    }
    else {
      Promise.reject("Something went wrong. Please reload the page.")
    }
  });
}

export async function updateHighScore(countryName, countryCode, countedClicks) {
  let data = {
    "country": countryName,   
    "country_code": countryCode,
    "score": countedClicks 
  }
  await fetch("/save", {method : "POST", body : JSON.stringify(data), headers: {"content-type": "application/json"}}); 
}

export async function getBestCountries() {
  return await fetch("/best")
  .then(response => response.json()) 
}