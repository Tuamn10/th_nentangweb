// Chờ cho toàn bộ nội dung trang được tải xong rồi mới thực thi mã JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // --- KHAI BÁO CÁC BIẾN TOÀN CỤC ---
    const tableBody = document.getElementById('employee-table-body');
    
    // Các phần tử của Modal
    const showModalBtn = document.getElementById('show-add-modal-btn');
    const modalOverlay = document.getElementById('addEmployeeModal');
    const closeModalBtn = modalOverlay.querySelector('.close-button');
    const cancelBtn = modalOverlay.querySelector('.cancel-btn');

    // Các phần tử của Form
    const addEmployeeForm = document.getElementById('add-employee-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const addressInput = document.getElementById('address');
    const phoneInput = document.getElementById('phone');

    // --- CÁC HÀM XỬ LÝ ---

    /**
     * Hàm dùng để hiển thị dữ liệu từ mảng `employees` (trong data.js) lên bảng HTML.
     */
    function renderTable() {
        tableBody.innerHTML = ''; // Xóa sạch dữ liệu cũ trong bảng
        
        employees.forEach(employee => {
            // Tạo một chuỗi HTML cho mỗi hàng của bảng
            const row = `
                <tr>
                    <td><input type="checkbox"></td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.address}</td>
                    <td>${employee.phone}</td>
                    <td>
                        <button class="action-icon edit"><i class="fas fa-pencil-alt"></i></button>
                        <button class="action-icon delete"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
            `;
            // Chèn hàng mới vào cuối tbody
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    /**
     * Hàm hiển thị thông báo lỗi cho một trường input cụ thể.
     * @param {HTMLElement} inputElement - Phần tử <input> hoặc <textarea> bị lỗi.
     * @param {string} message - Thông báo lỗi cần hiển thị.
     */
    function showError(inputElement, message) {
        const formGroup = inputElement.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        inputElement.classList.add('error'); // Thêm lớp 'error' để thay đổi viền input
        errorElement.textContent = message; // Hiển thị thông báo lỗi
    }

    /**
     * Hàm xóa tất cả các thông báo lỗi đang hiển thị trên form.
     */
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
        document.querySelectorAll('.form-group .error').forEach(input => input.classList.remove('error'));
    }

    /**
     * Hàm kiểm tra tính hợp lệ của dữ liệu trong form.
     * @returns {boolean} - Trả về `true` nếu tất cả dữ liệu hợp lệ, ngược lại trả về `false`.
     */
    function validateForm() {
        clearErrors(); // Xóa lỗi cũ trước khi kiểm tra
        let isValid = true;
        const phoneRegex = /^0\d{9}$/; // Biểu thức chính quy: Bắt đầu bằng 0, theo sau là 9 chữ số

        // 1. Kiểm tra trường Name không được bỏ trống
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Vui lòng nhập họ và tên.');
            isValid = false;
        }

        // 2. Kiểm tra trường Email không được bỏ trống
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Vui lòng nhập email.');
            isValid = false;
        }

        // 3. Kiểm tra trường Address không được bỏ trống
        if (addressInput.value.trim() === '') {
            showError(addressInput, 'Vui lòng nhập địa chỉ.');
            isValid = false;
        }

        // 4. Kiểm tra trường Phone
        const phoneValue = phoneInput.value.trim();
        if (phoneValue === '') {
            showError(phoneInput, 'Vui lòng nhập số điện thoại.');
            isValid = false;
        } else if (!phoneRegex.test(phoneValue)) {
            showError(phoneInput, 'Số điện thoại phải có 10 ký tự và bắt đầu bằng số 0.');
            isValid = false;
        }

        return isValid;
    }

    // Hàm để mở pop-up (modal)
    const openModal = () => {
        addEmployeeForm.reset(); // Xóa dữ liệu đã nhập trong form
        clearErrors(); // Xóa các thông báo lỗi cũ
        modalOverlay.classList.remove('hidden'); // Hiển thị modal
    };

    // Hàm để đóng pop-up (modal)
    const closeModal = () => {
        modalOverlay.classList.add('hidden'); // Ẩn modal
    };


    // --- GÁN CÁC SỰ KIỆN ---

    // Sự kiện khi người dùng gửi (submit) form
    addEmployeeForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form là tải lại trang

        // Nếu form hợp lệ thì thực hiện thêm nhân viên
        if (validateForm()) {
            // Tạo đối tượng nhân viên mới từ dữ liệu form
            const newEmployee = {
                id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1, // Tạo id mới
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                address: addressInput.value.trim(),
                phone: phoneInput.value.trim()
            };

            // Thêm nhân viên mới vào đầu mảng dữ liệu
            employees.unshift(newEmployee);

            // Cập nhật lại giao diện bảng
            renderTable();

            // Đóng pop-up sau khi thêm thành công
            closeModal();
        }
    });

    // Các sự kiện để mở và đóng modal
    showModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Đóng modal khi nhấn ra ngoài vùng nội dung
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Đóng modal khi nhấn phím 'Escape'
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    });

    // --- KHỞI CHẠY LẦN ĐẦU ---
    
    // Hiển thị dữ liệu lên bảng ngay khi trang được tải xong
    renderTable();
});