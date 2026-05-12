const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "shopkun_secret_key",
  resave: false,
  saveUninitialized: false
}));

let users = [];
let posts = [
  { name: "ShopKun", text: "Chào mừng đến ShopKun Social!", time: "Vừa xong" }
];

function checkLogin(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

app.get("/register", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="vi">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Đăng ký ShopKun</title>
<style>
body{margin:0;font-family:Arial;background:#f0f2f5}
.box{max-width:400px;margin:60px auto;background:white;padding:25px;border-radius:14px;box-shadow:0 2px 8px #ccc}
h1{text-align:center;color:#1877f2}
input,button{width:100%;padding:13px;margin:8px 0;border-radius:8px;border:1px solid #ddd;font-size:16px}
button{background:#1877f2;color:white;border:0;font-weight:bold}
a{color:#1877f2;text-decoration:none}
.social{background:#111827;margin-top:10px}
</style>
</head>
<body>
<div class="box">
<h1>ShopKun</h1>
<h2>Đăng ký</h2>
<form method="POST" action="/register">
<input name="username" placeholder="Tên đăng nhập" required>
<input name="password" type="password" placeholder="Mật khẩu" required>
<button type="submit">Tạo tài khoản</button>
</form>
<button class="social">Đăng ký bằng Google</button>
<button class="social">Đăng ký bằng Facebook</button>
<p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
</div>
</body>
</html>
`);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.send("Tên đăng nhập đã tồn tại. <a href='/register'>Quay lại</a>");
  }

  const hash = await bcrypt.hash(password, 10);
  users.push({ username, password: hash });

  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="vi">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Đăng nhập ShopKun</title>
<style>
body{margin:0;font-family:Arial;background:#f0f2f5}
.box{max-width:400px;margin:60px auto;background:white;padding:25px;border-radius:14px;box-shadow:0 2px 8px #ccc}
h1{text-align:center;color:#1877f2}
input,button{width:100%;padding:13px;margin:8px 0;border-radius:8px;border:1px solid #ddd;font-size:16px}
button{background:#1877f2;color:white;border:0;font-weight:bold}
a{color:#1877f2;text-decoration:none}
.social{background:#111827;margin-top:10px}
</style>
</head>
<body>
<div class="box">
<h1>ShopKun</h1>
<h2>Đăng nhập</h2>
<form method="POST" action="/login">
<input name="username" placeholder="Tên đăng nhập" required>
<input name="password" type="password" placeholder="Mật khẩu" required>
<button type="submit">Đăng nhập</button>
</form>
<button class="social">Đăng nhập bằng Google</button>
<button class="social">Đăng nhập bằng Facebook</button>
<p>Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
</div>
</body>
</html>
`);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) return res.send("Sai tài khoản. <a href='/login'>Thử lại</a>");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.send("Sai mật khẩu. <a href='/login'>Thử lại</a>");

  req.session.user = username;
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/", checkLogin, (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ShopKun</title>
<style>
body{margin:0;font-family:Arial;background:#f0f2f5;color:#050505}
.topbar{height:56px;background:white;display:flex;align-items:center;justify-content:space-between;padding:0 14px;box-shadow:0 1px 4px #ccc;position:sticky;top:0}
.logo{font-size:28px;font-weight:bold;color:#1877f2}
.avatar{background:#1877f2;color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-weight:bold}
.layout{max-width:800px;margin:auto;padding:15px}
.card{background:white;border-radius:12px;padding:14px;margin-bottom:14px;box-shadow:0 1px 3px #ddd}
input,textarea{width:100%;border:1px solid #ddd;border-radius:14px;padding:12px;font-size:15px;background:#f0f2f5}
textarea{resize:none;margin-top:10px}
button{background:#1877f2;color:white;border:0;border-radius:10px;padding:12px;width:100%;font-size:16px;font-weight:bold;margin-top:10px}
.name{font-weight:bold;color:#1877f2}
.time{font-size:13px;color:#65676b}
.text{font-size:17px;margin:14px 0}
.logout{color:#1877f2;text-decoration:none;font-weight:bold}
</style>
</head>
<body>

<div class="topbar">
  <div class="logo">ShopKun</div>
  <div>Xin chào, ${req.session.user} <a class="logout" href="/logout">Đăng xuất</a></div>
</div>

<div class="layout">
  <div class="card">
    <form method="POST" action="/post">
      <textarea name="text" rows="3" placeholder="Bạn đang nghĩ gì?" required></textarea>
      <button type="submit">Đăng bài</button>
    </form>
  </div>

  ${posts.map(p => `
    <div class="card">
      <div class="name">${p.name}</div>
      <div class="time">${p.time}</div>
      <div class="text">${p.text}</div>
      <div>👍 Thích &nbsp; 💬 Bình luận &nbsp; ↗️ Chia sẻ</div>
    </div>
  `).reverse().join("")}
</div>

</body>
</html>
`);
});

app.post("/post", checkLogin, (req, res) => {
  posts.push({
    name: req.session.user,
    text: req.body.text,
    time: "Vừa xong"
  });
  res.redirect("/");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("ShopKun running on port " + PORT);
});
