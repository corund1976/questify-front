export function getCookie(name) {
  console.log('redux/user/helper.js function "getCookie(name)"');
  console.log('document.cookie', document.cookie);

  const results = document.cookie
    .match('(^|;) ?' + name + '=([^;]*)(;|$)');

  console.log('results', results);

  if (results)
    return unescape(results[2]);
  else
    return null;
}

export async function getUserIP() {
  try {
    console.log('redux/user/helper.js function "getUserIP"');

    const response = await fetch(
      "https://www.cloudflare.com/cdn-cgi/trace",
      { mode: "cors" }
    );

    const text = await response.text();
    const textStringWithIP = text
      .trim()
      .split('\n')
      .filter(item => item.includes('ip'))[0];
    const ip = textStringWithIP
      .slice(textStringWithIP.indexOf('=') + 1);

    return ip;
  } catch (error) {
    return false;
  }
}
