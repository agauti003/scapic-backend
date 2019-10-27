/* eslint-disable no-param-reassign */
export default class Contoller {
  constructor(response) {
    this.response = response;
  }


  /**
       * common method for sending success response
       * @param {*} data
       */
  sendResponse(data) {
    this.response.status(200).json({ data });
  }

  /**
       * method for handling exceptions
       * @param {*} error
       */
  handleException(error) {
    // console.log(error);
    // masking db exceptions
    if (error.sql) {
      error.name = 'DbException';
    }

    switch (error.name) {
      case 'GeneralException':
        this.response.status(501).json({ error: error.message });
        break;
      case 'UnauthorizedException':
        this.response.status(401).json({ error: error.message });
        break;
      case 'NotFoundException':
        this.response.status(404).json({ error: error.message });
        break;
      case 'ConflictException':
        this.response.status(409).json({ error: error.message });
        break;
      case 'ValidationException':
        this.response.status(422).json({ error: error.message });
        break;
      case 'ForbiddenException':
        this.response.status(403).json({ error: error.message });
        break;
      case 'GraphQLError':
        this.response.status(400).json({ error: error.message });
        break;
      default:
        this.response.status(501).json({ error: 'unable to process request!, please try later' });
        break;
    }
  }
}
