let API_URL: string;
let CLOUDINARY_API_KEY: "669661143186997";
let CLOUDINARY_NAME: "dokjguwez";

if (window.location.href.includes("staging.hopper2")) {
  API_URL = "https://api-staging.hopper2.wns.wilders.dev";

} else if (window.location.href.includes("hopper2")) {
  API_URL = "https://api.hopper2.wns.wilders.dev";


} else {
  API_URL = "http://localhost:5000";

}


export { API_URL, CLOUDINARY_API_KEY, CLOUDINARY_NAME };


