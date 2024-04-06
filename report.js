function createReport(pages){
  console.log('\n\n###########\n\n')
  console.log('Report starting')
  let sortedPages = []
  for (const page in pages){
    console.log(page)
    sortedPages.push([page, pages[page]])
  }
  sortedPages.sort(function(a,b){
    return b[1]-a[1]
  })
  const sortedObj = {}
  let totalCount = 0
  for (const i in sortedPages){
    sortedObj[sortedPages[i][0]] = sortedPages[i][1]
    totalCount += sortedPages[i][1]
  }
  for (const page in sortedObj){
    console.log(`Found ${sortedObj[page]} internal links to ${page}`)
  }
  console.log(`\nFound a total of ${totalCount} internal links\n`)
  console.log('End of report!')
  console.log('###########')
}

module.exports = {
  createReport
}
