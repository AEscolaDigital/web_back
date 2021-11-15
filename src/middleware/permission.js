const School = require("../models/School");
const User = require("../models/User")

async function getUser(req) {

    const { user_id, role } = req

    if (role == 'ROLE_ADMIN') {
        const school = await School.findOne({
            where:{
                id: user_id,
            },
            include: {
                association: 'role'
            }
        })

        return school

    } else {

        const user = await User.findOne({
            where:{
                id: user_id,
            },
            include: {
                association: 'role'
            }
        })

        return user
    }

}


function is(roles) {

    const roleAuthorized = async (req, res, next) => {
        
        const user = await getUser(req);

        const userRoles = [user.role].map((role) => role.name);
        const existsRoles = userRoles.some((r) => roles.includes(r));

        if (existsRoles) {
            return next();
        }

        return res.status(401).json({ message: "Não tem autorização, para essa rota" });
    }

    return roleAuthorized;

}

module.exports = is;