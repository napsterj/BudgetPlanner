const txtLimit = document.getElementById('txtLimit')
const btnLimit = document.getElementById('btnLimit')
const btnReset = document.getElementById('btnReset')

btnLimit.addEventListener('click', function() {
    let limit = txtLimit.value    
    chrome.storage.sync.set({['limit']: limit})
    txtLimit.value = ""
    close()
})

btnReset.addEventListener('click', function () {
    chrome.storage.sync.set({['totalAmount']: 0.00, ['limit']: 0})
    close()
})