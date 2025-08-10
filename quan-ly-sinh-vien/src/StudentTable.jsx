// src/StudentTable.jsx
import React from "react";

function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <h1 className="table-title">Danh sách Sinh viên</h1>
      <table className="student-table table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Giới tính</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.ma_sv}</td>
              <td>{student.ho_ten}</td>
              <td>{student.email}</td>
              <td>{student.gioi_tinh}</td>
              <td>
                <button className="btn-action btn-edit" onClick={() => onEdit(index)}>
                  <i className="bi bi-pencil-square"></i>Sửa
                </button>
                <button className="btn-action btn-delete" onClick={() => onDelete(index)}>
                  <i className="bi bi-trash"></i>Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
