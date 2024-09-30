import bcrypt from 'bcrypt'

export default {
    registerService: async (password: string) => {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword
    },
    comparePassword: async (enteredPassword: string, savedPassword: string) => {
        return await bcrypt.compare(enteredPassword, savedPassword)
    }
}
