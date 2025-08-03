$(document).ready(function() {


    function renderTable() {
        const tableBody = $('.data-table tbody');
        tableBody.empty();


        if (employees.length === 0) {
            const emptyRow = `<tr><td colspan="7" style="text-align:center;">Không có dữ liệu</td></tr>`;
            tableBody.append(emptyRow);
            return;
        }


        employees.forEach(employee => {
            const statusHtml = employee.hoat_dong 
                ? '<span class="status-active"><i class="fa-solid fa-check"></i></span>' 
                : '<span class="status-inactive"><i class="fa-solid fa-xmark"></i></span>';

            const rowHtml = `
                <tr>
                    <td><button class="dropdown-toggle"><i class="fa-solid fa-caret-down"></i></button></td>
                    <td>
                        <button class="btn-icon btn-view"><i class="fa-solid fa-eye"></i></button>
                        <button class="btn-icon btn-edit"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn-icon btn-delete"><i class="fa-solid fa-trash"></i></button>
                    </td>
                    <td>${employee.id}</td>
                    <td>${employee.ten}</td>
                    <td>${employee.ho_dem}</td>
                    <td>${employee.dia_chi}</td>
                    <td>${statusHtml}</td>
                </tr>
            `;
            tableBody.append(rowHtml);
        });
    }


    const modal = $('#add-employee-modal');

    $('.btn.btn-primary').on('click', function() {
        modal.addClass('show');
    });

    $('.modal-close-btn, .btn-cancel').on('click', function() {
        closeAndResetModal();
    });

    modal.on('click', function(event) {
        if ($(event.target).is(modal)) {
            closeAndResetModal();
        }
    });

    function closeAndResetModal() {
        modal.removeClass('show');
        $('#add-form')[0].reset();
        $('.error-message').text('');
    }


    $('#add-form').on('submit', function(event) {
        event.preventDefault();

        $('.error-message').text('');
        let isValid = true;

        const ten = $('#ten').val().trim();
        const hoDem = $('#ho-dem').val().trim();
        const diaChi = $('#dia-chi').val().trim();

        if (ten === '') {
            $('#ten').next('.error-message').text('Tên không được để trống.');
            isValid = false;
        } else if (ten.length > 15) {
            $('#ten').next('.error-message').text('Tên không được quá 15 ký tự.');
            isValid = false;
        }

        if (hoDem === '') {
            $('#ho-dem').next('.error-message').text('Họ đệm không được để trống.');
            isValid = false;
        } else if (hoDem.length > 20) {
            $('#ho-dem').next('.error-message').text('Họ đệm không được quá 20 ký tự.');
            isValid = false;
        }

        if (diaChi === '') {
            $('#dia-chi').next('.error-message').text('Địa chỉ không được để trống.');
            isValid = false;
        } else if (diaChi.length > 50) {
            $('#dia-chi').next('.error-message').text('Địa chỉ không được quá 50 ký tự.');
            isValid = false;
        }

        if (isValid) {
            const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
            
            const newEmployee = {
                id: newId,
                ten: ten,
                ho_dem: hoDem,
                dia_chi: diaChi,
                hoat_dong: true
            };

            employees.push(newEmployee);
            alert('Thêm nhân viên thành công!');
            

            renderTable(); 

            closeAndResetModal();
        }
    });


    renderTable();
});