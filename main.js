const { argv } = require('node:process');
const { crawlPage } = require('./crawl');
const { createReport } = require('./report');

async function main(){
  if (argv.length > 3){
    throw new Error('Too many arguments given')
  }
  if (argv.length === 2){
    throw new Error('Not enough arguments given')
  }
  const baseURL = argv[2]
  console.log(`Start crawling at ${baseURL}`)

  const pages = await crawlPage(baseURL, baseURL, {})
  createReport(pages)
}

main()
