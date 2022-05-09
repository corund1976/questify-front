// import axios from 'axios';

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
      console.log(response);

      const text = await response.text();
      console.log(text);

      // fl = 132f109
      // h = www.cloudflare.com
      // ip = 77.120.232.132
      // ts = 1652123278.675
      // visit_scheme = https
      // uag = Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 101.0.4951.54 Safari / 537.36
      // colo = KBP
      // http = http / 2
      // loc = UA
      // tls = TLSv1.3
      // sni = plaintext
      // warp = off
      // gateway = off

      const ip = text
        .trim()
        .split('\n')
        .filter(item => item.includes('ip'))[0];

      console.log('ip', ip);

      // const res = ip.slice(ip.indexOf('=') + 1);
      // console.log('res', res);
      return text;
    }
    fetchCloudflare()
  } catch (error) {
    return false;
  }
}
