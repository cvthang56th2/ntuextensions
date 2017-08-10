$(function() {
  var color = $('#fontColor').val();
  $('#fontColor').on("change paste keyup", function() {
    color = $(this).val();
  });
  $('#btnChange').click(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { todo: "changeColor", clickedColor: color })
    })
  });

  $('#btnKiemTra').click(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { todo: "kiemtraDiem" })
    })
  })

  $('#btnDiemTong').click(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { todo: "tinhDiemTong" })
    })
  });

  $('#linkDaoTao').click(function() {
    // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    //   chrome.tabs.sendMessage(tabs[0].id, { todo: "chuyenToiTrangDaoTao" })
    // })
    chrome.tabs.create({ 'url': 'http://daotao.ntu.edu.vn' })
  });

  chrome.storage.sync.get('mssv', function(budget) {
    $('#mssv').text(budget.mssv);
  })
})