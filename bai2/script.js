// Đợi cho toàn bộ cấu trúc HTML được tải xong rồi mới chạy script
document.addEventListener('DOMContentLoaded', function() {
    
    // --- KIỂM TRA CÁC THÀNH PHẦN QUAN TRỌNG ---
    if (typeof transactions === 'undefined') {
        console.error("LỖI: Tệp data.js chưa được tải hoặc biến 'transactions' không tồn tại.");
        return;
    }

    const tableBody = document.querySelector('.data-table tbody');
    if (!tableBody) {
        console.error("LỖI: Không tìm thấy phần tử 'tbody' của bảng.");
        return;
    }

    // --- LẤY CÁC ĐỐI TƯỢNG DOM KHÁC ---
    const modal = document.getElementById('addTransactionModal');
    const addTransactionForm = document.getElementById('addTransactionForm');
    const openModalBtn = document.querySelector('.btn-add');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.btn-cancel');

    // Form fields and error message elements
    const customerInput = document.getElementById('customerName');
    const employeeInput = document.getElementById('employeeName');
    const amountInput = document.getElementById('amount');
    const customerError = document.getElementById('customer-error');
    const employeeError = document.getElementById('employee-error');
    const amountError = document.getElementById('amount-error');

    // === CÁC HÀM XỬ LÝ ===

    /**
     * Hiển thị dữ liệu từ mảng transactions lên bảng HTML
     */
    function renderTable() {
        tableBody.innerHTML = ''; // Xóa dữ liệu cũ

        transactions.forEach(tx => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><button class="btn-select-row">×</button></td>
                <td class="action-buttons">
                    <button class="btn-view"><i class="fas fa-eye"></i></button>
                    <button class="btn-edit"><i class="fas fa-pencil-alt"></i></button>
                    <button class="btn-delete"><i class="fas fa-trash"></i></button>
                </td>
                <td>${tx.id}</td>
                <td>${tx.customer}</td>
                <td>${tx.employee}</td>
                <td>${tx.amount}</td>
                <td>${tx.date}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    /**
     * Xóa các thông báo lỗi trong form
     */
    function clearFormErrors() {
        customerError.textContent = '';
        employeeError.textContent = '';
        amountError.textContent = '';
    }

    /**
     * Mở pop-up (modal)
     */
    function openModal() {
        if(modal) modal.style.display = 'flex';
    }

    /**
     * Đóng pop-up và xóa dữ liệu đã nhập
     */
    function closeModal() {
        if(modal) modal.style.display = 'none';
        addTransactionForm.reset();
        clearFormErrors();
    }
    
    /**
     * Xử lý việc thêm giao dịch mới
     */
    function handleAddTransaction(event) {
        event.preventDefault(); // Ngăn trang tải lại
        clearFormErrors();

        const customer = customerInput.value.trim();
        const employee = employeeInput.value.trim();
        const amount = amountInput.value.trim();
        let isValid = true;

        // Validation logic
        if (customer === '') {
            customerError.textContent = 'Vui lòng nhập tên khách hàng.';
            isValid = false;
        } else if (customer.length > 30) {
            customerError.textContent = 'Tên khách hàng không được quá 30 ký tự.';
            isValid = false;
        }

        if (employee === '') {
            employeeError.textContent = 'Vui lòng nhập tên nhân viên.';
            isValid = false;
        } else if (employee.length > 30) {
            employeeError.textContent = 'Tên nhân viên không được quá 30 ký tự.';
            isValid = false;
        }

        if (amount === '') {
            amountError.textContent = 'Vui lòng nhập số tiền.';
            isValid = false;
        }
        
        if (!isValid) return;

        // Tạo bản ghi mới
        const newId = transactions.length > 0 ? Math.max(...transactions.map(tx => tx.id)) + 1 : 1;
        const newDate = new Date();
        const formattedDate = `${newDate.getDate()} Tháng ${newDate.getMonth() + 1} ${newDate.getFullYear()} ${newDate.getHours()}:${String(newDate.getMinutes()).padStart(2, '0')}`;
        
        const newTransaction = {
            id: newId,
            customer: customer,
            employee: employee,
            amount: amount,
            date: formattedDate
        };

        transactions.unshift(newTransaction); // Thêm vào đầu mảng
        renderTable(); // Cập nhật lại bảng
        closeModal(); // Đóng pop-up
    }

    // === GÁN CÁC SỰ KIỆN ===
    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (addTransactionForm) addTransactionForm.addEventListener('submit', handleAddTransaction);

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
    
    // === KHỞI TẠO ===
    // Hiển thị bảng ngay khi trang được tải
    renderTable();
});