function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Custom Menu')
        .addItem('Sök!', 'printAPI')
        .addItem('Visa Interface', 'showSidebar')
        .addToUi();
  }
  
  function getOptionsToRange() {
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheet4")
  
    const kpis = findGroups("kpi");
    const mun = findGroups("municipality");
    
    const object = {
    kpi: kpis,
    mun: mun
    }
    
     
    sheet.getRange(3, 1, object.kpi.length, object.kpi[0].length).setValues(kpis)
    sheet.getRange(3, 6, object.mun.length, object.mun[0].length).setValues(mun)
  
    return object
  }
  
  function setDataForValidaition(cellRange, type) {
  
    const dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Options")
    const kpiDataRange = dataSheet.getRange(3, 1, dataSheet.getLastRow()-2, 1)
    const munDataRange = dataSheet.getRange(3, 3, dataSheet.getLastRow()-2, 1)
    
    setValidation("A2",kpiDataRange,"API Query Data");
    setValidation("B2",munDataRange,"API Query Data");
  
  }
  
  function setValidation(cellNotation, dataRange, sheet) {
    let ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet)
    let cell = SpreadsheetApp.getActive().getRange(cellNotation);
    let rule = SpreadsheetApp.newDataValidation().setAllowInvalid(false).requireValueInRange(dataRange).setHelpText("Välj ett alternativ ur listan, tack!").build();
    cell.setDataValidation(rule);
  }
  
  function showSidebar() {
    
    var template = HtmlService.createTemplateFromFile("sidebar").evaluate()
    
    var html = template
        .setTitle('QuerySideBar!')
        .setWidth(800)
        SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
        .showSidebar(html);
  }
  
  function sheetPrint(arrayOfArrays) {
  
    const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Test");
    ws.getRange(1, 1, arrayOfArrays.length, arrayOfArrays[0].length).setValues(arrayOfArrays)
  
  }
  
  
  