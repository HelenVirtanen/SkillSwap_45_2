interface CityData {
  cities: string[];
}

export const getCities = async () => {
  const response = await fetch('/db/cities.json');

  if (!response.ok) {
    throw new Error('Не удалось загрузить список городов');
  }

  const data: CityData = await response.json();
  return data.cities || [];
};
