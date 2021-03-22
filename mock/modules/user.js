const mewsList = {
  token: 'ZnNkZmRzZjFmc2RmZHNmMWZzZGZkc2YxZnNkZmRzZjFmc2RmZHNmMWZzZGZkc2YxZnNkZmRzZjFmc2RmZHNmMWZzZGZkc2YxZnNkZmRzZjFmc2RmZHNmMWZzZGZkc2YxZnNkZmRzZjFmc2RmZHNmMWZzZGZkc2Yx'
}

module.exports = {
  'get|/getUserInfo': {
    statusCode: 0,
    message: 'success',
    data: mewsList
  },
  'get|/refres_token': {
    statusCode: 0,
    message: 'success',
    data: mewsList
  }
}
