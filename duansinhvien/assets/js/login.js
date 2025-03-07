const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
//API đăng nhap
document.getElementById('form-login').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5276/api/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password: password })
        });

        if (!response.ok) {
            throw new Error('Đăng nhập thất bại');
        }

        const data = await response.json();
        const token = data.token;

        //Lưu token
        localStorage.setItem('token', token);

        const adminResponse = await fetch('http://localhost:5276/api/Admin/dashboard', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (adminResponse.ok) {
            window.location.href = '/admin.html';
        } else {
            window.location.href = '/welcome.html';
        }
    } catch (error) {
        alert(error.message);
    }
});

//Quên mật khẩu
document.getElementById('form-1').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    if (!email) {
        alert('Vui lòng nhập email!');
        return;
    }

    //  formData
    const formData = new FormData();
    formData.append('email', email);

    try {
        const response = await fetch('http://localhost:5276/api/SendMail/send-password', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            alert('Vui lòng kiểm tra email của bạn để nhận mật khẩu mới!');
        } else {
            alert(result.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Không thể kết nối đến server.');
    }
});
