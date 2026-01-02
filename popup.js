let totalSpending = document.getElementById('totalSpending')
let currentLimit = document.getElementById('currentLimit')
let txtNewAmount = document.getElementById('newAmount')
const btnAdd = document.getElementById('btnAddAmount')

chrome.storage.sync.get(['totalAmount', 'limit'], function(budget) {      
    console.log(budget)      
    totalSpending.textContent = budget.totalAmount
    txtNewAmount.textContent = ""    
    currentLimit.textContent = budget.limit
})

btnAdd.addEventListener('click', function() {        
   chrome.storage.sync.get(['totalAmount', 'limit'], function(budget) {
        let newTotal = 0
        
        if(budget.totalAmount){
            newTotal += budget.totalAmount       
        }
        let currentAmount = parseFloat(txtNewAmount.value)
        newTotal += currentAmount

        chrome.storage.sync.set({['totalAmount'] : newTotal}, function (){
            if(currentAmount && newTotal > budget.limit){
                let notif = {
                        type: "basic",
                        iconUrl: "images/warning.png",
                        title: "Limit exceeded",
                        message: "Uh Oh! You've reached your spending limit."
                }
                chrome.notifications.create("limitNotif", notif)    
            }
        })
        totalSpending.textContent = newTotal.toFixed(2)   
        txtNewAmount.value = ""
   })
})