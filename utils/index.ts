export async function fetchCars() {
  const headers = {
    "X-RapidAPI-Key": "ea4921db0amsh8fa321818fcf0b5p1ad392jsn5e6fbf6ce855",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars`,
    { headers: headers }
  );

  const result = await response.json();

  return result;
}
