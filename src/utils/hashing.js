const { hash, compare, genSalt } = require('bcrypt');


const hashPassword = async (password) => {
    try {
        const salt = await genSalt(10);
        return await hash(password, salt);
    } catch (error) {
        console.error(error)
    }
}


const compareHashedPassword = async (plainPassword, hashPassword) => {
    try {
        return await compare(plainPassword, hashPassword)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    hashPassword,
    compareHashedPassword,
}