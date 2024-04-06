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

async function crawlPage(baseURL, currentURL, pages){
  const currentUrlObj = new URL(currentURL)
  const baseUrlObj = new URL(baseURL)
  if (baseUrlObj.hostname != currentUrlObj.hostname){
    return pages
  }
  const normalizedCurrentURL = normalizeURL(currentURL)
  if (pages[normalizedCurrentURL]>0){
    pages[normalizedCurrentURL]++
    return pages
  }
  pages[normalizedCurrentURL] = 1
  let htmlBody = ''
  try{
    console.log(`Fetching ${currentURL}`)
    const response = await fetch(currentURL)
    if (response.status>=400){
      console.log(`Client error with statuscode ${response.status}`)
      return pages
    }

    const contentType = response.headers.get('content-type')
    if (!contentType.includes('text/html')){
      console.log(`Got non-html response ${contentType}`)
      return pages
    }
    htmlBody = await response.text()
  }catch(err){
  console.log(err.message)
  }
  const urls = getURLsFromHTML(htmlBody, baseURL)
    for (const url of urls){
      pages = await crawlPage(baseURL, url, pages)
    }
    return pages
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}
