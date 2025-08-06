import bcrypt from 'bcrypt';

// this function will hash the password while registering the user
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

// this function will check and comapre the passwword given buy the user with the actual hash

export const comparePasswords = async (
    plain: string,
    hashed: string
): Promise<boolean> => {
    return await bcrypt.compare(plain, hashed);
}