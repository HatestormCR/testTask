//получает данные с API
export async function fetchAsync(func) {
  const response = await func();

  if (response.ok) {
      return await response.json();
  }

  throw new Error("Unexpected error!!!");
};

//возвращает рандомное число в диапазоне
export function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//копирует массив данных из state и присваевает рандомному юзеру рандомный рейтинг
export function randomRate(state) {

  const newData={
    ...state,
    data: state.data.map(item => ({
      ...item
    })
  )};

  const length = newData.data.length;
  //ипользую length, чтобы избежать ошибки если число будет больше, чем кол-во элементов массива
  newData.data[generateRandom(0, length)]['rating'] = generateRandom(1, 10010);
  console.log('change rating');

  return newData;
};

//сортирует данные по убыванию или возрастанию
export function sortData(data) {
  const newData={
    ...data,
    data: data.data.map(item => ({
      ...item
    })
  )};

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
