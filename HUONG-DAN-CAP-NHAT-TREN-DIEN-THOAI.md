# IELTSquirrel v111 — cập nhật bằng điện thoại

Gói này thêm Speaking Practice sau Speaking Part 3, với toàn bộ giao diện bằng tiếng Anh. Có 1.000 câu hỏi, 40 chủ đề, các chế độ Random / IELTS / Topics / Scenarios và nút hiện, ẩn câu trả lời mẫu giống bản tham chiếu. Giữ đủ 8 Writing Templates và audio riêng cho từng câu hỏi Part 1, Part 3.

## 1. Cập nhật workflow trước

Mở kho https://github.com/9852917330/985291733953846879squirr bằng trình duyệt điện thoại. Bật “Trang web cho máy tính” nếu cần.

Mở file `.github/workflows/install-speaking-audio.yml`, sửa và thay toàn bộ nội dung bằng file `install-speaking-audio.yml` trong ZIP web này. Nếu chưa có, tạo file với đúng đường dẫn đó. Commit changes trên nhánh đang xuất bản website.

## 2. Cài audio Part 2

Tải cả 5 ZIP `speaking-part2-01.zip` đến `speaking-part2-05.zip` về điện thoại. Không giải nén hoặc đổi tên.

Tại thư mục gốc của kho GitHub, chọn Add file → Upload files. Chọn cả 5 ZIP rồi Commit changes một lần. Không tải vào thư mục .github hoặc thư mục audio.

Mở Actions → Install IELTSquirrel speaking audio, đợi lượt chạy thành công. Workflow tự tạo `audio/ava-us/`, giải nén đủ 222 MP3, commit chúng và xóa 5 ZIP đã xử lý. Nếu các ZIP đã được tải lên trước khi cập nhật YML, chọn Run workflow.

Giữ nguyên audio Part 1 và Part 3 đang có. Workflow mới cũng hỗ trợ lại bốn ZIP `speaking-qa-*.zip` trước đây nếu cần.

## 3. Cập nhật website sau khi audio đã cài xong

Giải nén `IELTSquirrel_v111_web_files.zip` trên điện thoại. Tải đè đúng 7 file này vào thư mục gốc của kho bằng Add file → Upload files:

- index.html
- sw.js
- manifest.webmanifest
- manifest-v111.webmanifest
- speaking-part-1.html
- speaking-part-3.html
- speaking-practice.html

Commit changes, đợi bản xuất bản hoàn thành rồi mở lại website. Commit web sau bước cài audio giúp GitHub Pages xuất bản kèm các MP3 mới.

Không tải nguyên ZIP web lên thay cho 7 file đã giải nén. Không cần tải file hướng dẫn hoặc PART2-AUDIO-SHA256.json lên website.

Nếu còn thấy giao diện cũ, tải lại trang với `index.html?v=111#speaking-practice`. Sau đó mở Part 2 và thử một bài thường cùng một Core Story.

Nếu workflow báo lỗi quyền ghi, kiểm tra Settings → Actions → General → Workflow permissions hoặc quy tắc bảo vệ nhánh của kho, rồi chạy lại sau khi quyền ghi phù hợp đã được bật.
