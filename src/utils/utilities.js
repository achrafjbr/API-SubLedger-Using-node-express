const getHeaderToken = (request) => {
  return request.headers.authorization.split(" ")[1];
};

module.exports = {
  getHeaderToken,
};
