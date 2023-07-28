export async function fetchCars() {
  const headers = {
    "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.X_RAPID_API_HOST,
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla`,
    { headers: headers as HeadersInit }
  );

  const result = await response.json();

  return result;
}
