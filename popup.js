function renderTotal(views) {
  var dollars = views * 0.50;
  document.getElementById('status').textContent = dollars.toFixed(2);
}

function buildPaymentTable(){
  chrome.storage.sync.get({pastPayments: []}, function(value){
    var table = document.getElementById('payments')
    var tableLength = 5;
    var displayThese = value.pastPayments;
    displayThese = displayThese.reverse().slice(0, tableLength);
    for (var i = 0; i < displayThese.length; i++) {
      var row = table.insertRow(i + 1);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      cell0.innerHTML = displayThese[i][1];
      cell1.innerHTML = '$1.00';
      cell2.innerHTML = 'SFSafeHouse';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var viewCount = 0;
  chrome.storage.sync.get({viewCount: 0}, function(value){
    viewCount = value.viewCount;
    renderTotal(viewCount);
    buildPaymentTable();
  })
});
