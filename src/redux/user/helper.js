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

    async function test() {
      let response = await fetch("https://www.cloudflare.com/cdn-cgi/trace", { mode: "cors" });
      let text = await response.text();
      console.log(text)
    }
    test()

    const response = await axios.get(
      'https://www.cloudflare.com/cdn-cgi/trace',
      { mode: "cors" }
    );

    console.log('redux/user/helper.js axios.get https://www.cloudflare.com/cdn-cgi/trace => ', response);
    const ip = await response.data
      .trim()
      .split('\n')
      .filter(item => item.includes('ip'))[0];

    const res = ip.slice(ip.indexOf('=') + 1);

    return res;
  } catch (error) {
    return false;
  }
}
