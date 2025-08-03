$(function() {

    if (typeof transactions === 'undefined') {
        console.error("LỖI: Tệp data.js chưa được tải hoặc biến 'transactions' không tồn tại.");
        return;
    }

    const $tableBody = $('.data-table tbody');
    if ($tableBody.length === 0) {
        console.error("LỖI: Không tìm thấy phần tử 'tbody' của bảng.");
        return;
    }


    const $modal = $('#addTransactionModal');
    const $addTransactionForm = $('#addTransactionForm');
    const $openModalBtn = $('.btn-add');
    const $closeModalBtn = $('.close-modal');
    const $cancelBtn = $('.btn-cancel');


    const $customerInput = $('#customerName');
    const $employeeInput = $('#employeeName');
    const $amountInput = $('#amount');
    const $customerError = $('#customer-error');
    const $employeeError = $('#employee-error');
    const $amountError = $('#amount-error');

    function renderTable() {
        $tableBody.empty(); 

        $.each(transactions, function(index, tx) {
            const row = `
                <tr>
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
                </tr>
            `;
            $tableBody.append(row);
        });
    }


    function clearFormErrors() {
        $customerError.text('');
        $employeeError.text('');
        $amountError.text('');
    }


    function openModal() {
        $modal.css('display', 'flex');
    }


    function closeModal() {
        $modal.hide();
        $addTransactionForm[0].reset();
        clearFormErrors();
    }


    function handleAddTransaction(event) {
        event.preventDefault();
        clearFormErrors();

        const customer = $customerInput.val().trim();
        const employee = $employeeInput.val().trim();
        const amount = $amountInput.val().trim();
        let isValid = true;

        // Validation logic
        if (customer === '') {
            $customerError.text('Vui lòng nhập tên khách hàng.');
            isValid = false;
        } else if (customer.length > 30) {
            $customerError.text('Tên khách hàng không được quá 30 ký tự.');
            isValid = false;
        }

        if (employee === '') {
            $employeeError.text('Vui lòng nhập tên nhân viên.');
            isValid = false;
        } else if (employee.length > 30) {
            $employeeError.text('Tên nhân viên không được quá 30 ký tự.');
            isValid = false;
        }

        if (amount === '') {
            $amountError.text('Vui lòng nhập số tiền.');
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

        transactions.unshift(newTransaction);
        renderTable();
        closeModal();
    }

    $openModalBtn.on('click', openModal);
    $closeModalBtn.on('click', closeModal);
    $cancelBtn.on('click', closeModal);
    $addTransactionForm.on('submit', handleAddTransaction);

    $(window).on('click', function(event) {
        if ($(event.target).is($modal)) {
            closeModal();
        }
    });

    renderTable();
});