// export const BASE_URL = "http://localhost:5000"

// export const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const BASE_URL = import.meta.env.VITE_SERVER_URL;
console.log("VITE_SERVER_URL:", import.meta.env.VITE_SERVER_URL);
const url = `${import.meta.env.VITE_SERVER_URL}/api/user/login`;
console.log("Hitting URL:", url);


