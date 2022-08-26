export const confirmEmailLink = (userId: number) => {
    return `https://www.arkstrades.com/user/confirm/${userId}`
};


export const forgotPasswordLink = (userId: number) => {
    return `https://www.arkstrades.com/user/resetpassword/${userId}`
};