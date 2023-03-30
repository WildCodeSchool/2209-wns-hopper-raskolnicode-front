let api_url;

if (window.location.href.includes("staging.hopper2")) {
  api_url = "https://api-staging.hopper2.wns.wilders.dev";

} else if (window.location.href.includes("hopper2")) {
  api_url = "https://api.hopper2.wns.wilders.dev";
  
} else {
  api_url = "http://localhost:5000";
}

export const API_URL = api_url
