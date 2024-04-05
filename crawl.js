const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function getURLsFromHTML(htmlBody, baseURL){
  const urls = []
  const dom = new JSDOM(htmlBody)
  const linkList = dom.window.document.querySelectorAll('a')
  for (const link of linkList){
    if (link.href.startsWith("/")){
      try{
        urls.push(new URL(link.href, baseURL).href)
      }catch(err){
        console.log(`${err.message}: ${link.href}`)
      }
    } else{
      try{
        urls.push(new URL(link.href).href)
      } catch(err){
        console.log(`${err.message}: ${link.href}`)
      }
    }
  }
  return urls
}

function normalizeURL(url) {
  if (url.endsWith('/')){
    url = url.slice(0,-1)
  }
  const urlObj = new URL(url.toLocaleLowerCase('en-US'));
  const normalizedUrl = `${urlObj.host}${urlObj.pathname}`
  return normalizedUrl
}

module.exports = {
  normalizeURL,
  getURLsFromHTML
}
