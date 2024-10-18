import { readUser } from './readUser.js'
/* validates users creation, returns boolean and message*/
export function validateNewUser(email, username, password, cPassword, agreeToTerms) {
  if (username === '') {
    return { valid: false, message: 'Username must not be blank.' }
  }

  if (username.length > 30) {
    return { valid: false, message: 'Username must be less than 30 characters.' }
  }

  // Validate Email (minimum 5 characters, contains "@" and ".", and must be unique)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email.length < 5 || !emailRegex.test(email)) {
    return { valid: false, message: 'Invalid email format.' }
  }
  if (!readUser(email)) {
    return { valid: false, message: 'Email is already in use.' }
  }

  // Validate Password (8-20 characters, at least one uppercase and one lowercase)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
  if (!passwordRegex.test(password)) {
    return {
      valid: false,
      message:
        'Password must be 8-20 characters long, with at least one uppercase and one lowercase letter.'
    }
  }

  // Validate cPassword (must match password)
  if (password !== cPassword) {
    return { valid: false, message: 'Passwords do not match.' }
  }

  if (!agreeToTerms) {
    return { valid: false, message: 'Please agree to the terms and conditions.' }
  }

  // If all validations pass
  return { valid: true, message: 'Validation successful.' }
}
