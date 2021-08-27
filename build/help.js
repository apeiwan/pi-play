const crossEnv=function (key, value) {
  return (process.platform === 'darwin' ? 'export' : 'set') + ' ' + key + '=' + value
};

module.exports={
  crossEnv
}
