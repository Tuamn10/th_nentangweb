// src/App.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import Notification from "./Notification";

function App() {
  const [students, setStudents] = useState([
    { ma_sv: "SV001", ho_ten: "Nguyễn Văn An", email: "an.nv@example.com", ngay_sinh: "", gioi_tinh: "Nam", ghi_chu: "Sinh viên năm nhất." },
    { ma_sv: "SV002", ho_ten: "Trần Thị Bình", email: "binh.tt@example.com", ngay_sinh: "", gioi_tinh: "Nữ", ghi_chu: "" },
    { ma_sv: "SV003", ho_ten: "Lê Hoàng Cường", email: "cuong.lh@example.com", ngay_sinh: "", gioi_tinh: "Nam", ghi_chu: "" }
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addStudent = (student) => {
    if (students.some(s => s.ma_sv === student.ma_sv)) {
      showNotification("Mã sinh viên đã tồn tại.", "danger");
      return false;
    }
    setStudents([...students, student]);
    showNotification("Thêm sinh viên mới thành công!", "success");
    return true;
  };

  const updateStudent = (student) => {
    const updated = [...students];
    updated[editingIndex] = student;
    setStudents(updated);
    showNotification("Cập nhật thông tin sinh viên thành công!", "success");
    setEditingIndex(null);
  };

  const deleteStudent = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
    showNotification("Đã xóa sinh viên thành công.", "warning");
    setEditingIndex(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="bi bi-people-fill me-2"></i>Quản lý Sinh viên
          </a>
        </div>
      </nav>

      <div className="container-fluid container-main">
        {notification && (
          <Notification message={notification.message} type={notification.type} />
        )}

        <div className="row g-4">
          <div className="col-lg-5">
            <StudentForm
              onAdd={addStudent}
              onUpdate={updateStudent}
              editingStudent={editingIndex !== null ? students[editingIndex] : null}
              cancelEdit={() => setEditingIndex(null)}
            />
          </div>
          <div className="col-lg-7">
            <StudentTable
              students={students}
              onEdit={(index) => setEditingIndex(index)}
              onDelete={deleteStudent}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
