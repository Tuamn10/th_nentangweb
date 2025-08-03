$(function() {

    const $tableBody = $('#employee-table-body');
    
    const $showModalBtn = $('#show-add-modal-btn');
    const $modalOverlay = $('#addEmployeeModal');
    const $closeModalBtn = $modalOverlay.find('.close-button');
    const $cancelBtn = $modalOverlay.find('.cancel-btn');

    const $addEmployeeForm = $('#add-employee-form');
    const $nameInput = $('#name');
    const $emailInput = $('#email');
    const $addressInput = $('#address');
    const $phoneInput = $('#phone');


    function renderTable() {
        $tableBody.empty();
        

        $.each(employees, function(index, employee) {
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
            $tableBody.append(row);
        });
    }

    /**
     * 
     * @param {jQuery} $inputElement
     * @param {string} message
     */
    function showError($inputElement, message) {
        const $formGroup = $inputElement.parent();
        const $errorElement = $formGroup.find('.error-message');
        
        $inputElement.addClass('error');
        $errorElement.text(message);
    }


    function clearErrors() {
        $('.error-message').text('');
        $('.form-group .error').removeClass('error');
    }

    /**
     * Hàm kiểm tra tính hợp lệ của dữ liệu trong form.
     * @returns {boolean} 
     */
    function validateForm() {
        clearErrors();
        let isValid = true;
        const phoneRegex = /^0\d{9}$/;


        if ($nameInput.val().trim() === '') {
            showError($nameInput, 'Vui lòng nhập họ và tên.');
            isValid = false;
        }


        if ($emailInput.val().trim() === '') {
            showError($emailInput, 'Vui lòng nhập email.');
            isValid = false;
        }


        if ($addressInput.val().trim() === '') {
            showError($addressInput, 'Vui lòng nhập địa chỉ.');
            isValid = false;
        }


        const phoneValue = $phoneInput.val().trim();
        if (phoneValue === '') {
            showError($phoneInput, 'Vui lòng nhập số điện thoại.');
            isValid = false;
        } else if (!phoneRegex.test(phoneValue)) {
            showError($phoneInput, 'Số điện thoại phải có 10 ký tự và bắt đầu bằng số 0.');
            isValid = false;
        }

        return isValid;
    }


    const openModal = () => {
        $addEmployeeForm[0].reset(); 
        clearErrors();
        $modalOverlay.removeClass('hidden'); 
    };


    const closeModal = () => {
        $modalOverlay.addClass('hidden');
    };



    $addEmployeeForm.on('submit', function(event) {
        event.preventDefault();

        if (validateForm()) {
            const newEmployee = {
                id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
                name: $nameInput.val().trim(),
                email: $emailInput.val().trim(),
                address: $addressInput.val().trim(),
                phone: $phoneInput.val().trim()
            };

            employees.unshift(newEmployee);
            renderTable();
            closeModal();
        }
    });

    $showModalBtn.on('click', openModal);
    $closeModalBtn.on('click', closeModal);
    $cancelBtn.on('click', closeModal);
    

    $modalOverlay.on('click', (event) => {
        if ($(event.target).is($modalOverlay)) { 
            closeModal();
        }
    });
    
    $(document).on('keydown', (event) => {
        if (event.key === 'Escape' && !$modalOverlay.hasClass('hidden')) {
            closeModal();
        }
    });

    renderTable();
});