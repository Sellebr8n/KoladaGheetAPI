function getObjectWithArrays() {
  
    const kpis = findGroups("kpi");
    const mun = findGroups("municipality");
    
    const object = {
    kpi: kpis,
    mun: mun
    }
    
    
    return object
  }
  
  function getSpreadSheet() {
    
    const sheetID = "1NWSNmd8YKHXBFc9B6kHkK7HtQMj9SvYYNutJOP7KmZw"
    const spreadSheet = SpreadsheetApp.openById(sheetID);
  //  const sheet = spreadSheet.getSheetByName("AppResults")
    
    return spreadSheet
  }
  
  
   function printResults(parsedJSON, sidebarObject) {
  
    const sheet = getSpreadSheet().getSheetByName("AppResults")
    const ui = SpreadsheetApp.getUi();
   // const data = getParsedJson(sidebarObject); 
    let lastRow = sheet.getLastRow()
    
    Logger.log(lastRow)
    
    const presentThis = [];
    
    for (object of parsedJSON.values) {
      let printer = {}
      for(let value of object.values){
        printer.period = object.period;
        printer.count = value.count
        printer.gender = value.gender
        printer.status = value.status
        printer.value = value.value
      }
      presentThis.push([printer.value,printer.period,printer.status,printer.gender,sidebarObject.kpi_title,sidebarObject.mun_title,sidebarObject.kpi_category_title])
    }
    
    if(presentThis.length !== 0){
      sheet.getRange(lastRow+1, 1, presentThis.length, presentThis[0].length).setValues(presentThis)
    } else {
      ui.alert("Din sökning saknade resultat")
    }
    
  }
  
  function clearIt() {
    const sheet = getSpreadSheet().getSheetByName("AppResults")
    sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clear();
  }