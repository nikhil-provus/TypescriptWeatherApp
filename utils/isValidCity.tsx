//const isValidCity = (city: string) => city.trim().length > 0 && !/\d/.test(city) ;
const isValidCity = (city: string): boolean => {
    const newCity = city.trim();
    if (newCity === "") return false;
    const chars = /^[a-zA-Z\s]+$/;

    return chars.test(newCity);
};
export default isValidCity;
