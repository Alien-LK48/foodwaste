import usermodel from "../models/usermodel.js";
const isAdmin = (req, res, next) => {
    const { userid } = req.body
    usermodel.findById(userid)
        .then(user => {
            if (!user) {
                return res.json({
                    success: false,
                    message: 'User not found'
                })
            }
            if (!user.isAdmin) {
                return res.json({
                    success: false,
                    message: 'You do not have admin privileges'
                })
            }
            next()
        })
        .catch(error => {
            res.json({
                success: false,
                message: error.message
            })
        })
};

export default isAdmin;
