export const useGetUser = () => {
    const userString = window.localStorage.getItem("user");
    const user = JSON.parse(userString);
    return user.data;
}