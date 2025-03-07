document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Vui lòng đăng nhập lại!');
        window.location.href = '/index.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:5276/api/SinhVien', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error('Không thể lấy thông tin sinh viên');
        }

        const data = await response.json();
        const student = data.$values[0];

        document.getElementById('student_id').textContent = student.maSinhVien;
        document.getElementById('student_name').textContent = student.tenSinhVien;
        document.getElementById('student_dob').textContent = student.ngaySinh;
        document.getElementById('student_gender').textContent = student.gioiTinh ? "Nam" : "Nữ";
        document.getElementById('student_phone').textContent = student.soDienThoai;
        document.getElementById('student_idcard').textContent = student.cmnd;
        document.getElementById('student_ethnicity').textContent = student.danToc;
    } catch (error) {
        console.error('Lỗi:', error.message);
    }
});
