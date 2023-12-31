import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, fuel, limit } = filters;
  const headers = {
    /// For SSR
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_RAPID_API_HOST,
    //// For CSR
    // "X-RapidAPI-Key": "ea4921db0amsh8fa321818fcf0b5p1ad392jsn5e6fbf6ce855",
    // "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${model}&make=${manufacturer}&year=${year}&fuel_type=${fuel}&limit=${limit}`,
    { headers: headers as HeadersInit }
  );

  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  /// key ...
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { year, make, model } = car;
  /// SSR
  url.searchParams.append(
    "customer",
    process.env.NEXT_PUBLIC_CAR_IMAGES_API_KEY as string
  );
  /// CSR
  // url.searchParams.append("customer", "hrjavascript-mastery");

  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (title: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(title, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
