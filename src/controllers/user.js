import { User } from "../models/user.js"
async function handleUserSignup(req, res) {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please provide all the required fields" })
        }
        await User.create({
            username, email, password
        })
        return res.redirect("/")
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Failed to create user" })

    }
}
async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body

        const loginUser = await User.findOne({
            email, password
        })
        if (!loginUser) {
            return res.status(401).render("login", { error: "Invalid credentials" })
        }
        return res.redirect("/")
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Failed to create user" })

    }
}
export {
    handleUserSignup,
    handleUserLogin
}