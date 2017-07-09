var urls = [
    'facebook.com',
    'instagram.com',
    'reddit.com'
]

function makePayment(){
  chrome.storage.sync.get({pastPayments: []}, function(value){
    var allPayments = value.pastPayments;
    var now = new Date(Date.now()).toLocaleString();
    allPayments.push([5, now]);
    chrome.storage.sync.set({pastPayments: allPayments});
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status === 'complete'){
        for (var i = 0; i < urls.length; i++) {
          if(tab.url.includes(urls[i])){
            console.log('BOOO! YOU ARE ON ' + urls[i]);
            chrome.storage.sync.get({viewCount: 0}, function(value){
                var newCount = value.viewCount + 1;
                chrome.storage.sync.set({viewCount: newCount});
                if(newCount % 10 === 0){
                  makePayment();
                }
            })
            break;
          }
        }
    }
});

