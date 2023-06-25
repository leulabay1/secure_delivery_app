const jwt= require('jsonwebtoken');
module.exports= (req,res,next)=>{
    const token = req.headers.access_token;
    if(!token) return res.status(401).send();

    try {
        const decodeUser = jwt.verify(token, process.env.SECRET_KEY);
        req.user= decodeUser;
    } catch (error) {
        res.status(401).send()
    }

    return next();
}