/* eslint-disable no-console */
import Controller from './Controller';

const axios = require('axios');

const Url = 'https://s3.ap-south-1.amazonaws.com/scapic-others/Models';

export default class GatewayController extends Controller {
  get3dObjects(request, response) {
    const { modelName, categoryName, objectName } = request.params;
    const url = `${Url}/${categoryName}/${modelName}/${objectName}`;
    axios.get(url)
      .then((resp) => {
        response.send(resp.data);
      });
  }
}
