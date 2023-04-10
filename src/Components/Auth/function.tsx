/**
 * Returns the strenght of the password.
 * A password must contain ATLEAST one Uppercase , one lowercase , one specialchar , one Number.
 * lenght of password must be 8 or above
 * @param user_password User password (must be string)
 * @returns Returns the strenght of the password.
 */
export const PasswordStrenght: any = (user_password: string) => {
    let strenght: number = 0;
    const Special_chars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const ownWeight: number = 20;
    if (/.*[a-z].*/.test(user_password)) {
        strenght = strenght + ownWeight;
    }
    if (/\d/.test(user_password)) {
        strenght = strenght + ownWeight;
    }
    if (/.*[A-Z].*/.test(user_password)) {
        strenght = strenght + ownWeight;
    }
    if (Special_chars.test(user_password)) {
        strenght = strenght + ownWeight;
    }
    if (user_password.length >= 8) {
        strenght = strenght + ownWeight;
    }
    /**
     * Returns the strenght of the password.
     */
    return strenght;
};
