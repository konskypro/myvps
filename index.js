const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.urlencoded({ extended: true }));

let posts = [
  { name: "Admin", text: "Chào mừng đến với mạng xã hội mini!", time: "Vừa xong" },
  { name: "Shop Acc Game", text: "Hôm nay có acc mới giá rẻ 🔥", time: "5 phút trước" }
];

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MiniBook</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:Arial;background:#f0f2f5;color:#050505}
.topbar{
  height:56px;background:white;display:flex;align-items:center;
  justify-content:space-between;padding:0 14px;box-shadow:0 1px 4px #ccc;
  position:sticky;top:0;z-index:10
}
.logo{font-size:28px;font-weight:bold;color:#1877f2}
.search{background:#f0f2f5;border:0;border-radius:20px;padding:11px;width:45%}
.avatar{background:#1877f2;color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-weight:bold}
.layout{max-width:1100px;margin:auto;display:grid;grid-template-columns:230px 1fr 260px;gap:18px;padding:18px}
.sidebar,.rightbar{position:sticky;top:75px;height:max-content}
.menu,.card{background:white;border-radius:12px;padding:14px;margin-bottom:14px;box-shadow:0 1px 3px #ddd}
.menu div{padding:10px;border-radius:8px;font-weight:bold}
.menu div:hover{background:#f0f2f5}
.story{display:flex;gap:10px;margin-bottom:14px}
.story div{flex:1;height:120px;background:linear-gradient(135deg,#1877f2,#42b72a);border-radius:14px;color:white;padding:10px;font-weight:bold;display:flex;align-items:end}
input,textarea{width:100%;border:1px solid #ddd;border-radius:20px;padding:12px;font-size:15px;background:#f0f2f5}
textarea{border-radius:14px;resize:none;margin-top:10px}
button{background:#1877f2;color:white;border:0;border-radius:10px;padding:12px;width:100%;font-size:16px;font-weight:bold;margin-top:10px}
.post-head{display:flex;gap:10px;align-items:center}
.pic{width:42px;height:42px;border-radius:50%;background:#1877f2;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold}
.name{font-weight:bold}
.time{font-size:13px;color:#65676b}
.text{font-size:17px;margin:14px 0;line-height:1.4}
.actions{display:flex;border-top:1px solid #eee;padding-top:10px;color:#65676b;font-weight:bold}
.actions div{flex:1;text-align:center}
@media(max-width:800px){
  .layout{display:block;padding:10px}
  .sidebar,.rightbar{display:none}
  .search{width:55%}
}
</style>
</head>
<body>

<div class="topbar">
  <div class="logo">MiniBook</div>
  <input class="search" placeholder="Tìm kiếm trên MiniBook">
  <div class="avatar">K</div>
</div>

<div class="layout">
  <div class="sidebar">
    <div class="menu">
      <div>👤 Trang cá nhân</div>
      <div>👥 Bạn bè</div>
      <div>🛒 Shop Acc Game</div>
      <div>📢 Nhóm</div>
      <div>⚙️ Cài đặt</div>
    </div>
  </div>

  <main>
    <div class="story">
      <div>Tin của bạn</div>
      <div>Acc mới</div>
      <div>Khuyến mãi</div>
    </div>

    <div class="card">
      <form method="POST" action="/post">
        <input name="name" placeholder="Tên của bạn" required>
        <textarea name="text" rows="3" placeholder="Bạn đang nghĩ gì?" required></textarea>
        <button type="submit">Đăng bài</button>
      </form>
    </div>

    ${posts.map(p => `
      <div class="card">
        <div class="post-head">
          <div class="pic">${p.name[0]}</div>
          <div>
            <div class="name">${p.name}</div>
            <div class="time">${p.time}</div>
          </div>
        </div>
        <div class="text">${p.text}</div>
        <div class="actions">
          <div>👍 Thích</div>
          <div>💬 Bình luận</div>
          <div>↗️ Chia sẻ</div>
        </div>
      </div>
    `).reverse().join("")}
  </main>

  <div class="rightbar">
    <div class="card">
      <b>Liên hệ shop</b><br><br>
      Telegram/Zalo: sửa ở đây
    </div>
    <div class="card">
      <b>Gợi ý</b><br><br>
      Đăng acc game, bài viết, thông báo khuyến mãi.
    </div>
  </div>
</div>

</body>
</html>
  `);
});

app.post("/post", (req, res) => {
  posts.push({
    name: req.body.name,
    text: req.body.text,
    time: "Vừa xong"
  });
  res.redirect("/");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("MiniBook running on port " + PORT);
});
