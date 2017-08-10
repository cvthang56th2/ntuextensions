$(function() {
  chrome.storage.sync.get(['mssv', 'autologin'], function(budget) {
    $('#mssv').val(budget.mssv);
    $('#chk_autologin').prop('checked', budget.autologin);
  });

  $('#savemssv').click(function() {
    var autologin = $('#chk_autologin').is(':checked');

    var mssv = $('#mssv').val();
    if (mssv) {
      chrome.storage.sync.set({ 'autologin': autologin });
      chrome.storage.sync.set({ 'mssv': mssv }, function() {
        var notifOptions = {
          type: 'basic',
          iconUrl: 'icon48.png',
          title: 'Cập nhật thông tin sinh viên',
          message: "Các thiết lập đã được lưu"
        };
        chrome.notifications.create('limitNotif', notifOptions);
      });
    }
  });

  $('#clearAll').click(function() {
    chrome.storage.sync.set({ 'mssv': '', 'autologin': false }, function() {
      var notifOptions = {
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'Thông báo cập nhật',
        message: "Tất cả thông tin đã được xóa!"
      };
      chrome.notifications.create('limitNotif', notifOptions);
    });
  });
});