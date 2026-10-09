# Cập nhật IELTSquirrel v110 bằng điện thoại

Bản này khôi phục đủ 8 Writing Templates, đưa nội dung trực tiếp vào index.html và bỏ tên giọng đọc khỏi giao diện. Mỗi câu trả lời Speaking Part 1 và Part 3 vẫn có nút nghe riêng. Giữ nguyên audio Part 2.

## Nếu đã cài 604 audio từ bốn ZIP trước đó

1. Giải nén IELTSquirrel_v110_web_files.zip trên điện thoại.
2. Mở kho https://github.com/9852917330/985291733953846879squirr bằng trình duyệt, bật “Trang web cho máy tính” nếu cần.
3. Trên nhánh đang xuất bản, chọn Add file → Upload files tại thư mục gốc. Tải đè đủ 6 file: index.html, sw.js, manifest.webmanifest, manifest-v110.webmanifest, speaking-part-1.html, speaking-part-3.html. Không tải nguyên ZIP web.
4. Commit changes, đợi website xuất bản rồi mở lại trang với ?v=110#writing-templates sau tên index.html. Làm mới trang nếu vẫn thấy bản cũ.

Không cần tải lại audio đã cài. Writing Templates không còn cần file writing-templates-data.js bên ngoài.

## Nếu chưa cài audio Part 1 và Part 3

1. Tại thư mục gốc của kho, chọn Add file → Create new file. Đặt tên .github/workflows/install-speaking-audio.yml. Dán toàn bộ nội dung install-speaking-audio.yml trong gói này, rồi Commit changes.
2. Quay về thư mục gốc, chọn Add file → Upload files. Tải bốn ZIP speaking-qa-01.zip đến speaking-qa-04.zip đã nhận trước đó, rồi Commit changes. Không giải nén hoặc đổi tên bốn ZIP audio.
3. Vào Actions → Install IELTSquirrel speaking audio, đợi lượt chạy thành công. Workflow tự tạo thư mục audio/ava-us/qa/, giải nén MP3 và xóa các ZIP đã xử lý.
4. Sau đó tải 6 file web theo hướng dẫn phía trên để xuất bản bản cập nhật.

Nếu bốn ZIP đã có trên kho trước khi tạo YML, vào Actions → Install IELTSquirrel speaking audio → Run workflow.

Giữ nguyên các thư mục audio hiện có. Tên thư mục audio/ava-us/ là đường dẫn kỹ thuật để các nút nghe tìm đúng MP3; tên này không hiện thành ghi chú trên giao diện.
