export const sleep = async (seconds: number = 0): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
