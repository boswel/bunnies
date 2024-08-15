export async function getCountryInfo() {
  return await fetch("https://api.ipregistry.co/?key=tryout")
  .then(response => response.json())
  .then(json => {
    return {
      country_name: json.location.country.name,
      country_code: json.location.country.code
    }
  });
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
