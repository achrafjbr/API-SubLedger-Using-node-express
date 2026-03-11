const getHeaderToken = (request) =>request.headers.Authorization.split(" ")[1];


module.exports = {
  getHeaderToken,
};
