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

async function crawlPage(baseURL){
  try{
    const response = await fetch(baseURL)
    if (response.status>=400){
      throw new Error(`Client error with statuscode ${response.status}`)
    }
    const contentType = response.headers.get('content-type')
    if (!contentType.includes('text/html')){
      console.log(`Got non-html response ${contentType}`)
    }
    console.log(await response.text())
}catch(err){
  console.log(err.message)
}
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}
