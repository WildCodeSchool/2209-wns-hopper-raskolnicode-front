let API_URL: string;
let CLOUDINARY_APP_KEY: string;

if (window.location.href.includes("staging.hopper2")) {
  API_URL = "https://api-staging.hopper2.wns.wilders.dev";
  CLOUDINARY_APP_KEY = "eee";

} else if (window.location.href.includes("hopper2")) {
  API_URL = "https://api.hopper2.wns.wilders.dev";
  CLOUDINARY_APP_KEY = "ee";
} else {
  API_URL = "http://localhost:5000";
  CLOUDINARY_APP_KEY = "eee";
}


export { API_URL, CLOUDINARY_APP_KEY };

