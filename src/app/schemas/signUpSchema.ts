import { z } from 'zod'

export const usernameValidation = z.string().min(2, "Username must be min 2 Characters").max(20, "Username must be max 20 Characters")

export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email({message : "Invalid Email"}),
    password : z.string().min(4, {message : "Password must min 4 characters"})
})