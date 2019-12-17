export async function fetchAsync(func) {
    const response = await func();

    if (response.ok) {
        return await response.json();
    }

    throw new Error("Unexpected error!!!");
};

export function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomRate(state) {

  const newData={
    ...state,
    data: state.data.map(item => ({
      ...item
    })
  )}

  newData.data[generateRandom(0, 1000)]['rating'] = generateRandom(1, 10010);
  console.log('change rating');

  return newData;
};

export function sortData(data) {

  const newData={
    ...data,
    data: data.data.map(item => ({
      ...item
    })
  )}

  if(data.sort === 'ascending') {
    newData.data.sort(function (a, b) {
      return a.rating - b.rating;
    });
  } else if (data.sort === 'descending') {
    newData.data.sort(function (a, b) {
      return b.rating - a.rating;
    });
  }

  return newData;
}
