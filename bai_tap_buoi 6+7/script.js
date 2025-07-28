document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử DOM
    const studentForm = document.getElementById('student-form');
    const studentList = document.getElementById('student-list');
    const notification = document.getElementById('notification');
    const studentIndexInput = document.getElementById('student-index');

    // Nút và tiêu đề form
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const formTitle = document.getElementById('form-title');

    // Dữ liệu sinh viên (khởi tạo từ các bản ghi có sẵn trong HTML)
    let students = [
        { ma_sv: 'SV001', ho_ten: 'Nguyễn Văn An', email: 'an.nv@example.com', ngay_sinh: '', gioi_tinh: 'Nam', ghi_chu: 'Sinh viên năm nhất.' },
        { ma_sv: 'SV002', ho_ten: 'Trần Thị Bình', email: 'binh.tt@example.com', ngay_sinh: '', gioi_tinh: 'Nữ', ghi_chu: '' },
        { ma_sv: 'SV003', ho_ten: 'Lê Hoàng Cường', email: 'cuong.lh@example.com', ngay_sinh: '', gioi_tinh: 'Nam', ghi_chu: '' }
    ];

    // Hàm hiển thị thông báo
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `alert alert-${type}`;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000); // Ẩn sau 3 giây
    }

    // Hàm render lại bảng
    function renderTable() {
        studentList.innerHTML = ''; // Xóa bảng cũ
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${student.ma_sv}</td>
                <td>${student.ho_ten}</td>
                <td>${student.email}</td>
                <td>${student.gioi_tinh}</td>
                <td>
                    <button class="btn-action btn-edit" data-index="${index}">
                        <i class="bi bi-pencil-square"></i>Sửa
                    </button>
                    <button class="btn-action btn-delete" data-index="${index}">
                        <i class="bi bi-trash"></i>Xóa
                    </button>
                </td>
            `;
            studentList.appendChild(row);
        });
    }

    // Hàm reset form về trạng thái ban đầu
    function resetForm() {
        studentForm.reset();
        studentIndexInput.value = '';
        btnText.textContent = 'Thêm sinh viên';
        submitBtn.classList.remove('btn-update');
        submitBtn.querySelector('i').className = 'bi bi-person-plus me-2';
        formTitle.textContent = 'Thêm Sinh viên mới';
        document.getElementById('ma_sv').disabled = false;
        document.getElementById('ghi_chu').value = ''; // Xóa cả ghi chú
    }
    
    // Xử lý sự kiện submit form (Thêm và Cập nhật)
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Lấy dữ liệu từ form
        const studentData = {
            ma_sv: document.getElementById('ma_sv').value.trim(),
            ho_ten: document.getElementById('ho_ten').value.trim(),
            email: document.getElementById('email').value.trim(),
            ngay_sinh: document.getElementById('ngay_sinh').value,
            gioi_tinh: document.querySelector('input[name="gioi_tinh"]:checked').value,
            ghi_chu: document.getElementById('ghi_chu').value.trim() // Lấy dữ liệu ghi chú
        };

        // Kiểm tra dữ liệu đầu vào (Validation)
        if (!studentData.ma_sv || !studentData.ho_ten || !studentData.email) {
            showNotification('Vui lòng điền đầy đủ Mã sinh viên, Họ và tên, và Email.', 'danger');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(studentData.email)) {
            showNotification('Định dạng email không hợp lệ.', 'danger');
            return;
        }

        const editIndex = studentIndexInput.value;

        if (editIndex !== '') { // Chế độ Cập nhật
            students[editIndex] = studentData;
            showNotification('Cập nhật thông tin sinh viên thành công!', 'success');
        } else { // Chế độ Thêm mới
            // Kiểm tra mã SV trùng lặp
            if (students.some(s => s.ma_sv === studentData.ma_sv)) {
                showNotification('Mã sinh viên đã tồn tại.', 'danger');
                return;
            }
            students.push(studentData);
            showNotification('Thêm sinh viên mới thành công!', 'success');
        }

        renderTable();
        resetForm();
    });

    // Xử lý sự kiện click trên bảng (Sửa và Xóa)
    studentList.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        const index = target.dataset.index;

        if (target.classList.contains('btn-delete')) {
            // Xóa sinh viên
            students.splice(index, 1);
            showNotification('Đã xóa sinh viên thành công.', 'warning');
            renderTable();
            resetForm(); // Reset form nếu đang ở chế độ sửa sinh viên vừa bị xóa
        }

        if (target.classList.contains('btn-edit')) {
            // Đưa dữ liệu lên form để sửa
            const student = students[index];
            document.getElementById('ma_sv').value = student.ma_sv;
            document.getElementById('ma_sv').disabled = true;
            document.getElementById('ho_ten').value = student.ho_ten;
            document.getElementById('email').value = student.email;
            document.getElementById('ngay_sinh').value = student.ngay_sinh;
            document.querySelector(`input[name="gioi_tinh"][value="${student.gioi_tinh}"]`).checked = true;
            document.getElementById('ghi_chu').value = student.ghi_chu || ''; // Hiển thị ghi chú
            
            // Chuyển form sang chế độ cập nhật
            studentIndexInput.value = index;
            btnText.textContent = 'Cập nhật';
            submitBtn.classList.add('btn-update');
            submitBtn.querySelector('i').className = 'bi bi-check-circle me-2';
            formTitle.textContent = 'Cập nhật thông tin Sinh viên';
            window.scrollTo(0, 0); // Cuộn lên đầu trang
        }
    });

    // Render bảng lần đầu khi tải trang
    // Không cần gọi renderTable() nữa vì dữ liệu đã có sẵn trong HTML
    // Các sự kiện click vẫn hoạt động nhờ event delegation
});