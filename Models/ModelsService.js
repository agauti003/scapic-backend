import { mySqlClient } from './mysql.client';
import formatCategories from '../Helpers/ModelsFormat';

export default class Models {
  async getModels(args, callback) {
    const upperLimit = parseInt(args.page, 10) - 3;
    const lowerLimit = parseInt(args.page, 10) + 3;
    const Query = `select
                (select count(*) from categories) as total_page,
                categories.name as category_name,
                models.name as models_name,
                models.obj,
                models.mtl,
                models.thumb
            from
                categories
            inner join models on
                categories.id = models.category_id
            where categories.id > ${upperLimit} and categories.id < ${lowerLimit} `;

    mySqlClient.query(Query, async (error, results) => {
      if (error) {
        callback(error, null);
      } else if (results) {
        const resultData = await formatCategories(results);
        callback(null, resultData);
      }
    });
  }
}
