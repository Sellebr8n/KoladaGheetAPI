function findGroups(type) {
  
    const url = `http://api.kolada.se/v2/${type}_groups?`;
    let response = UrlFetchApp.fetch(url);
    let json = JSON.parse(response);
    let groupsArray = [];
    for (let group of json.values){
      for (let member of group.members) {
        groupsArray.push([group.title, member.member_title,member.member_id ])
      }
    }
    return groupsArray
  }
  
  function getParsedJson(object) {
    
    const baseUrl = "http://api.kolada.se/v2/data/"
      let kpi = `kpi/${object.kpi_id}`
      let municipality = `municipality/${object.mun_id}`
      let year = object.years ? `/year/${object.years}` : "";
      let url = `${baseUrl}${kpi}/${municipality}${year}`
    Logger.log(url)
    const response = UrlFetchApp.fetch(url)
      let parsedJSON = JSON.parse(response);
    
    printResults(parsedJSON, object)
  
  }