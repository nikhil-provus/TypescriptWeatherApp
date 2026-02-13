import type { AppConfig } from "../../utils/types";

export const weatherConfig: AppConfig = {
    API_KEY: import.meta.env.VITE_API_KEY,
    API_URL: import.meta.env.VITE_API_URL,
    LOCATION_URL: import.meta.env.VITE_LOCATION_URL,
    TIME_URL: import.meta.env.VITE_API_TIME_URL,
}

