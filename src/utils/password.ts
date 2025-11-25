import bcrypt from "bcryptjs";

export async function saltAndHashPassword(password: string): Promise<string> {
    const salt = 10;

    return await bcrypt.hash(password, salt);
}