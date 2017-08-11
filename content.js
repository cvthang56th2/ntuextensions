chrome.runtime.sendMessage({ todo: "showPageAction" });


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Kiểm tra điểm linh tinh
  if (request.todo == "kiemtraDiem") {
    if ($('center > h3').text() === "BẢNG ĐIỂM CHI TIẾT CÁC MÔN HỌC") {
      // Chỉ hiện cột kết quả và cột điểm trung bình học kỳ lên 1 lần
      if ($('.headKetQua').length === 0) {

        // Kiểm tra ĐẬU, THI LẠI hay Tạch môn học
        var col = "<td class=\"headKetQua\" width=" + "40" + " align=" + "center>Kết quả" + "</td>";

        var table = $('table tbody > .rowheader');

        table.append(col);

        var test = $('tbody > .roweven td:nth-child(9) > span');

        // Các hàng lẻ
        for (var i = 0; i < test.length; i++) {
          var dtk = parseFloat($('tbody > .roweven:eq(' + i + ') > td:eq(8) > span').text());
          if (dtk >= 0 && dtk < 1.7) {
            $('tbody > .roweven:eq(' + i + ')').append('<td style=\"color: red; font-weight: bold; text-align: center\">Tạch</td>');
          } else if (dtk === 1.7) {
            $('tbody > .roweven:eq(' + i + ')').append('<td style=\"color: #42f462; font-weight: bold; text-align: center\">Mém chết</td>');
          } else {
            $('tbody > .roweven:eq(' + i + ')').append('<td style=\"color: green; font-weight: bold; text-align: center\">Ngon</td>');
          }
        }

        // Các hàng chẳn
        var test1 = $('tbody > .rowold td:nth-child(9) > span');
        for (var i = 0; i < test1.length; i++) {
          var dtk = parseFloat($('tbody > .rowold:eq(' + i + ') > td:eq(8) > span').text());
          if (dtk >= 0 && dtk < 1.7) {
            $('tbody > .rowold:eq(' + i + ')').append('<td style=\"color: red; font-weight: bold; text-align: center\">Tạch</td>');
          } else if (dtk === 1.7) {
            $('tbody > .rowold:eq(' + i + ')').append('<td style=\"color: #42f462; font-weight: bold; text-align: center\">Mém chết</td>');
          } else {
            $('tbody > .rowold:eq(' + i + ')').append('<td style=\"color: green; font-weight: bold; text-align: center\">Ngon</td>');
          }

        }

        // Kiểm tra thi lại
        var soHangBang1 = $('tbody:eq(2) tr').length;
        for (var i = 1; i < soHangBang1; i++) {
          var dtk = parseFloat($('tbody:eq(2) > tr:eq(' + i + ') > td:eq(8) > span').text());
          var diemThiLai = $('tbody:eq(2) > tr:eq(' + i + ') > td:eq(6) > span').text();

          if (dtk >= 1.0 && dtk < 1.7) {
            if (diemThiLai === " ")
              $('tbody:eq(2) > tr:eq(' + i + ') > td:eq(9)').replaceWith('<span style=\"color: yellow; font-weight: bold; padding-left: 3px\">Còn hi vọng &#9733;</span>');
          }
        }
        // Tính điểm trung bình từng học kỳ
        var bang = $('tbody');
        for (var i = 2; i < bang.length; i = i + 2) {
          var tongdiem = 0;
          var tongTC = 0;
          var sohang = $('tbody:eq(' + i + ') tr').length;
          for (var j = 1; j < sohang; j++) {
            var soTC;
            if (($('tbody:eq(' + i + ') tr:eq(' + j + ') > td:eq(3) > span').text()) === "") {
              soTC = 0;
            } else {
              soTC = parseInt($('tbody:eq(' + i + ') tr:eq(' + j + ') > td:eq(3) > span').text());
            }
            var diem = parseFloat($('tbody:eq(' + i + ') tr:eq(' + j + ') > td:eq(8) > span').text());

            tongTC += soTC;
            tongdiem += diem * soTC;
          }
          var diemtbhk = tongdiem / tongTC;
          diemtbhk = Math.round(diemtbhk * 1000) / 1000;
          var xeploai = "";
          var iconXeploai = "";
          if (diemtbhk >= 0 && diemtbhk < 1) {
            xeploai = "Kém";
            iconXeploai = "<img src=\"http://icons.iconarchive.com/icons/rokey/popo-emotions/24/surrender-icon.png\" />";
          } else if (diemtbhk >= 1 && diemtbhk < 1.7) {
            xeploai = "Yếu";
            iconXeploai = "<img src=\"http://icons.iconarchive.com/icons/rokey/popo-emotions/24/oh-icon.png\" />";
          } else if (diemtbhk >= 1.7 && diemtbhk < 2.5) {
            xeploai = "Trung bình";
            iconXeploai = "<img src=\"http://icons.iconarchive.com/icons/rokey/popo-emotions/24/feel-good-icon.png\" />";
          } else if (diemtbhk >= 2.5 && diemtbhk < 3.2) {
            xeploai = "Khá";
            iconXeploai = "<img src=\"http://icons.iconarchive.com/icons/rokey/popo-emotions/24/look-down-icon.png\" />";
          } else if (diemtbhk >= 3.2 && diemtbhk < 3.6) {
            xeploai = "Giỏi";
            iconXeploai = "<img src=\"http://icons.iconarchive.com/icons/rokey/popo-emotions/24/big-smile-icon.png\" />";
          } else if (diemtbhk >= 3.6 && diemtbhk <= 4.0) {
            xeploai = "Xuất Sắc";
            iconXeploai = "<img src=\"http://icons.iconarchive.com/icons/rokey/popo-emotions/24/beauty-icon.png\" />";
          }
          //   console.log(tongTC);
          var str = "<tr style=\"\"><td colspan=\"10\" style=\"padding-bottom: 5px;text-align: center;background-color: #0083ff; color: white;\">Điểm trung bình học kỳ: <span style=\"font-weight: bold; color: pink\">" + diemtbhk +
            "</span> - Xếp loại: <span style=\"font-weight: bold; color: pink\">" + xeploai + " " + iconXeploai + "</span></td></tr>";
          $('tbody:eq(' + i + ')').append(str);
        }
      }
    } else {
      alert("Mời bạn chuyển sang Bảng điểm chi tiết!");
    }

  }
  // Tính điểm rổng kết
  else if (request.todo == "tinhDiemTong") {
    for (var table = $("#maincontent table tr"), n = $("#maincontent table tr").length, diem = 0, tc = 0, tc2 = 0, dtb = 0, i = 2; i <= n; i++)
      if (table.parent().find("tr:nth-child(" + i + ") td:nth-child(3) span").html() > 0 && "" != table.parent().find("tr:nth-child(" + i + ") td:nth-child(3) span").html()) {
        var diem_ = parseFloat(table.parent().find("tr:nth-child(" + i + ") td:nth-child(4) span").html()),
          tc_ = parseInt(table.parent().find("tr:nth-child(" + i + ") td:nth-child(3) span").html()),
          tc2_ = parseInt(table.parent().find("tr:nth-child(" + i + ") td:nth-child(3) span").html());

        diem_ >= 9 ? diem_ = 4 :
          diem_ >= 8.5 ? diem_ = 3.7 :
          diem_ >= 8 ? diem_ = 3.3 :
          diem_ >= 7 ? diem_ = 3 :
          diem_ >= 6.5 ? diem_ = 2.7 :
          diem_ >= 6 ? diem_ = 2.3 :
          diem_ >= 5.5 ? diem_ = 2 :
          diem_ >= 5 ? diem_ = 1.7 :
          diem_ > 0 && (tc_ = 0),
          diem += tc_ * diem_,
          tc += tc_,
          tc2 += tc2_
      }

    dtb = diem / tc;
    dtb = Math.round(dtb * 1000) / 1000;
    tc2 = tc2 - tc;
    var xeploai = "";
    if (dtb >= 0 && dtb < 1) {
      xeploai = "Kém";
    } else if (dtb >= 1 && dtb < 1.7) {
      xeploai = "Yếu";
    } else if (dtb >= 1.7 && dtb < 2.5) {
      xeploai = "Trung bình";
    } else if (dtb >= 2.5 && dtb < 3.2) {
      xeploai = "Khá";
    } else if (dtb >= 3.2 && dtb < 3.6) {
      xeploai = "Giỏi";
    } else if (dtb >= 3.6 && dtb <= 4.0) {
      xeploai = "Xuất Sắc";
    }
    var str = "Xin Chào " + $("#dividtt_hello")[0].innerText +
      "!\n- Điểm tích luỹ được làm tròn của bạn là: " + dtb +
      "\n- Xếp loại học lực: " + xeploai +
      "\n- Số tín chỉ bạn đã tích lũy được: " + tc +
      "\n- Số tín chỉ bạn đang nợ là: " + tc2 +
      "\nChúc bạn sớm ra trường! ahihi =)) \n\nCode by Song Thắng + Kiên :))!\n____________";
    var error = "Mời bạn chuyển sang tab Bảng điểm tổng hợp!";
    if (isNaN(dtb)) {
      alert(error);
    } else {
      alert(str);
    }
  }

});

chrome.storage.sync.get(['mssv', 'autologin'], function(budget) {
  $('#iduser').val(budget.mssv);
  if (budget.autologin)
    $("input[value='Đăng nhập']").click();

});