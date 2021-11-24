const cors = (req, res, next) => {
    res.set('access-control-allow-origin', '*')
    res.set('access-control-allow-methods', 'GET,PUT,POST,DELETE')
    res.set('access-control-allow-headers', '*')
    next()
}
  
module.exports = cors