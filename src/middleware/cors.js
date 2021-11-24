const cors = (req, res, next) => {
    res.set('access-control-allow-origin', 'https://condescending-lewin-aa5404.netlify.app/')
    res.set('access-control-allow-methods', '*')
    res.set('access-control-allow-headers', '*')
    next()
  }
  
module.exports = cors