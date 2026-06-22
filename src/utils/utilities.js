const getHeaderToken = (request) => {
  return request.headers.authorization ? 
  request.headers.authorization.split(" ")[1]: null
};
module.exports = {
  getHeaderToken,
};
