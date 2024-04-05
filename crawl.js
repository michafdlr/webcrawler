function normalizeURL(url) {
  if (url.endsWith('/')){
    url = url.slice(0,-1)
  }
  const urlObj = new URL(url.toLocaleLowerCase('en-US'));
  const normalizedUrl = `${urlObj.host}${urlObj.pathname}`
  return normalizedUrl
}

module.exports = {
  normalizeURL
}
