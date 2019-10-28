/* eslint-disable no-plusplus */
export default async function formatCategories(payload) {
  const resultData = {
    categories: [],
    totalCategories: payload[0].total_categories ? payload[0].total_categories : 0,
  };
  for (let index = 0; index < payload.length; index++) {
    const temp = payload
      .filter(res => res.category_name === payload[index].category_name);
    resultData.categories.push({
      name: temp[0].category_name,
      models: temp.map(elem => ({
        name: elem.models_name,
        obj: elem.obj,
        mtl: elem.mtl,
        thumb: elem.thumb,
      })),
    });
    index += temp.length - 1;
  }
  return resultData;
}
