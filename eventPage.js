var contextMenuItems = {
    id: "budgetPlannerId",
    title: "BudgetPlanner",    
    contexts: ['selection']
}
chrome.contextMenus.removeAll().then(res =>{
    chrome.contextMenus.create(contextMenuItems)
})   

function isFloat(value) {
    return !isNaN(value) &&
            parseFloat(value) &&
            !isNaN(parseFloat(value))           
}

chrome.contextMenus.onClicked.addListener(function(selectedData) {
    if(selectedData.menuItemId === "budgetPlannerId" && 
       selectedData.selectionText) {

        if(isFloat(selectedData.selectionText)) {
            chrome.storage.sync.get(['totalAmount', 'limit'], function (budget) {
                let newTotal = 0
        
                if(budget.totalAmount) {
                    newTotal += budget.totalAmount
                }  
        
                newTotal += parseFloat(selectedData.selectionText)
                
                chrome.storage.sync.set({['totalAmount']: newTotal}, function() {
                     if(newTotal || parseFloat(selectedData.selectionText) > budget.limit) {
                        
                        var notif = {
                           type: "basic",
                           iconUrl: "images/warning.png",
                           title: "Limit exceeded",
                           message: "Uh Oh! You've reached your spending limit."
                        }

                        chrome.notifications.create("limitNotif", notif)
                     }   
                })
            })   
        }
    } 
})

chrome.storage.onChanged.addListener(function(changes, storage){
  chrome.action.setBadgeText({"text": changes.totalAmount.newValue.toString()})
})

