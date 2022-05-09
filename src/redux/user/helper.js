import axios from 'axios';

export function get_cookie(cookie_name) {
  console.log('redux/user/helper.js function "get_cookie(cookie_name)" => cookie_name=', cookie_name);

  var results = document.cookie.match(
    '(^|;) ?' + cookie_name + '=([^;]*)(;|$)',
  );
  console.log('redux/user/helper.js function "get_cookie(cookie_name)" => results=', results);
  if (results)
    return unescape(results[2]);
  else
    return null;
}

export async function getUserIP() {
  try {
    console.log('redux/user/helper.js getUserIP');

    async function fetchCloudflare() {
      const response = await fetch("https://www.cloudflare.com/cdn-cgi/trace", { mode: "cors" });
      console.log('redux/user/helper.js axios.get https://www.cloudflare.com/cdn-cgi/trace => response.ip', response.ip);


      const ip = await response.data
        .trim()
        .split('\n')
        .filter(item => item.includes('ip'))[0];

      console.log('redux/user/helper.js axios.get https://www.cloudflare.com/cdn-cgi/trace => ', ip);


      const res = ip.slice(ip.indexOf('=') + 1);
      console.log('redux/user/helper.js axios.get https://www.cloudflare.com/cdn-cgi/trace => ', res);
      return res;
    }
    fetchCloudflare()
  } catch (error) {
    return false;
  }
}
