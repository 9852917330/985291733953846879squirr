# Cập nhật IELTSquirrel bằng điện thoại

Bản này thay nút nghe ở Speaking Part 1 và Part 3 bằng 604 file Ava US riêng, đặt ngay dưới từng câu hỏi. Audio Speaking Part 2 hiện có được giữ nguyên.

## Chuẩn bị

Tải và giải nén **IELTSquirrel_v109_web_files.zip** trên điện thoại. Tải thêm bốn file **speaking-qa-01.zip** đến **speaking-qa-04.zip**; **không giải nén bốn file audio**. Dùng trình duyệt điện thoại ở chế độ “Trang web cho máy tính” nếu GitHub ẩn nút thao tác.

## Đưa lên GitHub

1. Mở kho `https://github.com/9852917330/985291733953846879squirr` ở nhánh đang xuất bản trang.
2. Vào **Add file → Create new file**. Đặt tên đúng `.github/workflows/install-speaking-audio.yml`. Dán toàn bộ nội dung file `install-speaking-audio.yml` trong gói web, rồi **Commit changes**.
3. Quay về thư mục gốc của kho, chọn **Add file → Upload files**. Chọn cả bốn file `speaking-qa-01.zip` đến `speaking-qa-04.zip`, rồi **Commit changes**. Không giải nén và không đổi tên các ZIP. Mỗi ZIP đều dưới giới hạn tải lên bằng trình duyệt.
4. Mở tab **Actions → Install IELTSquirrel speaking audio**, đợi lượt chạy màu xanh. Quy trình sẽ giải nén 604 MP3 vào `audio/ava-us/qa/`, commit chúng và xóa bốn ZIP trên kho.
5. **Sau khi** Actions chạy xong, tải sáu file ở gốc gói web lên thư mục gốc của kho: `index.html`, `sw.js`, `manifest.webmanifest`, `manifest-v109.webmanifest`, `speaking-part-1.html`, `speaking-part-3.html`. Commit đè file cũ. Lượt commit này cũng kích hoạt bản xuất bản GitHub Pages.
6. Đợi trang xuất bản, mở lại Speaking Part 1 hoặc Part 3 và làm mới trang. Mỗi câu hỏi có một thanh Play ngay dưới câu hỏi.

Nếu Actions báo lỗi quyền ghi, vào **Settings → Actions → General → Workflow permissions**, chọn quyền **Read and write** rồi chạy lại workflow. Nếu kho dùng nhánh xuất bản khác nhánh mặc định, hãy thực hiện các bước trên đúng nhánh đang xuất bản.

Giữ nguyên thư mục `audio/ava-us/` của Part 2; gói cập nhật này không thay file Part 2.
