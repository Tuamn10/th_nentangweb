// src/StudentForm.jsx
import React, { useState, useEffect } from "react";

function StudentForm({ onAdd, onUpdate, editingStudent, cancelEdit }) {
  const [formData, setFormData] = useState({
    ma_sv: "",
    ho_ten: "",
    email: "",
    ngay_sinh: "",
    gioi_tinh: "Nam",
    ghi_chu: ""
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData({
        ma_sv: "",
        ho_ten: "",
        email: "",
        ngay_sinh: "",
        gioi_tinh: "Nam",
        ghi_chu: ""
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ma_sv, ho_ten, email } = formData;
    if (!ma_sv || !ho_ten || !email) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ.");
      return;
    }
    if (editingStudent) {
      onUpdate(formData);
    } else {
      if (onAdd(formData)) {
        setFormData({ ma_sv: "", ho_ten: "", email: "", ngay_sinh: "", gioi_tinh: "Nam", ghi_chu: "" });
      }
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">{editingStudent ? "Cập nhật thông tin Sinh viên" : "Thêm Sinh viên mới"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Mã sinh viên:</label>
          <input
            type="text"
            name="ma_sv"
            value={formData.ma_sv}
            onChange={handleChange}
            className="form-control"
            required
            disabled={!!editingStudent}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Họ và tên:</label>
          <input
            type="text"
            name="ho_ten"
            value={formData.ho_ten}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Ngày sinh:</label>
          <input
            type="date"
            name="ngay_sinh"
            value={formData.ngay_sinh}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Giới tính:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="gioi_tinh"
                value="Nam"
                checked={formData.gioi_tinh === "Nam"}
                onChange={handleChange}
              /> Nam
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gioi_tinh"
                value="Nữ"
                checked={formData.gioi_tinh === "Nữ"}
                onChange={handleChange}
              /> Nữ
            </label>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Ghi chú:</label>
          <textarea
            name="ghi_chu"
            value={formData.ghi_chu}
            onChange={handleChange}
            className="form-control"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className={`btn btn-submit ${editingStudent ? "btn-update" : ""}`}>
          <i className={`bi ${editingStudent ? "bi-check-circle me-2" : "bi-person-plus me-2"}`}></i>
          {editingStudent ? "Cập nhật" : "Thêm sinh viên"}
        </button>
        {editingStudent && (
          <button type="button" className="btn btn-secondary w-100 mt-2" onClick={cancelEdit}>
            Hủy
          </button>
        )}
      </form>
    </div>
  );
}

export default StudentForm;
