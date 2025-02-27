const verifyRol = (rol) => (req, res, next) => {
    try {
        const { user } = req;
        if (!user || !user.role) {
            return res.status(403).json({ error: "User role not found" });
        }

        const rolesByUser = user.role;
        const checkValueRol = rol.some((rolSingle) => rolesByUser.includes(rolSingle));

        if (!checkValueRol) {
            return res.status(403).json({ error: "Access denied" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = verifyRol;
