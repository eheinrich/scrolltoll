function renderTotal(views) {
  var dollars = views * 0.50;
  document.getElementById('status').textContent = dollars.toFixed(2);
}

function buildPaymentTable(){
  chrome.storage.sync.get({pastPayments: []}, function(value){
    var table = document.getElementById('payments')
    var tableLength = 5;

    var startInx = value.pastPayments.length - 1;
    if (startInx === -1) {
      startInx = 0
    }
    var endInx = value.pastPayments.length - tableLength - 1;
    if (endInx < 0){
      endInx = 0
    }
    var displayThese = [];
    for (var i = startInx; i >= endInx; i--) {
      displayThese.push(value.pastPayments[i])
    }

    for (var i = 0; i < displayThese.length - 1; i++) {
      var row = table.insertRow(i + 1);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      cell0.innerHTML = displayThese[i][1];
      cell1.innerHTML = '$5.00';
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

