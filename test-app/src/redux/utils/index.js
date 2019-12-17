export function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomRateAndSort(state) {

  const newData={
    ...state,
    data: state.data.map(item => ({
      ...item
    })
  )}

  newData.data[generateRandom(0, 1000)]['rating'] = generateRandom(1, 10010);
  console.log('change rating');

  if(state.sort === 'ascending') {
    newData.data.sort(function (a, b) {
      return a.rating - b.rating;
    });
  } else if (state.sort === 'descending') {
    newData.data.sort(function (a, b) {
      return b.rating - a.rating;
    });
  }

  return newData;
};

// export function sortData(data, type) {
//   const newData=
//     data.map(item => ({
//       ...item
//     })
//   )
//
//   if(type === 'ascending') {
//     const sortItems = newData.sort(function (a, b) {
//       return a.rating - b.rating;
//     });
//
//     return sortItems;
//   } else {
//     const sortItems = newData.sort(function (a, b) {
//       return a.rating + b.rating;
//     });
//
//     return sortItems;
//   }
// }
