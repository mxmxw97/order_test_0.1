// 菜品数据
const dishData = {
  "开胃凉菜": ["开胃凉菜1", "开胃凉菜2", "开胃凉菜3"],
  "热食主菜": ["热食主菜1", "热食主菜2", "热食主菜3"],
  "各种汤品": ["各种汤品1", "各种汤品2", "各种汤品3"],
  "花样主食": ["花样主食1", "花样主食2", "花样主食3"],
  "饮品甜点": ["饮品甜点1", "饮品甜点2", "饮品甜点3"],
  "午夜必点": ["午夜必点1", "午夜必点2", "午夜必点3"]
};
// 页面加载后初始化
window.onload = function() {
  // 绑定分类点击事件
  const categoryItems = document.querySelectorAll('.category-item');
  const dishList = document.getElementById('dishList');
  
  categoryItems.forEach(item => {
    item.addEventListener('click', function() {
      // 切换激活状态
      categoryItems.forEach(li => li.classList.remove('active'));
      this.classList.add('active');
      
      // 获取当前分类并渲染菜品
      const category = this.getAttribute('data-category');
      renderDishes(category);
    });
  });
  
  // 初始加载“开胃凉菜”
  renderDishes("开胃凉菜");
  
  // 检查购物车并显示图标
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  if (cartData.length > 0) {
    document.getElementById('cartIcon').style.display = 'flex';
  }

  // 高亮当前页导航
  highlightCurrentNav();
};
// 渲染菜品列表
function renderDishes(category) {
  const dishList = document.getElementById('dishList');
  dishList.innerHTML = '';
  
  const dishes = dishData[category];
  dishes.forEach((dishName, index) => {
    const li = document.createElement('li');
    const imgPath = `https://picsum.photos/seed/${dishName}/80/80`;
    
    li.innerHTML = `
      <div class="dish-img">
        <img src="${imgPath}" alt="${dishName}"> 
      </div>
      <div class="dish-info">
        <h3>${dishName}</h3>
        <p>菜品描述${index + 1}</p>
        <span>¥${(index + 1) * 10}</span>
        <button class="dish-btn" onclick="addToCart(this)">翻它</button>
      </div>
    `;
    dishList.appendChild(li);
  });
}
// 添加到购物车
function addToCart(btn) {
  document.getElementById('cartIcon').style.display = 'flex';
  
  const dishName = btn.parentNode.querySelector('h3').textContent;
  const price = btn.parentNode.querySelector('span').textContent;
  const description = btn.parentNode.querySelector('p').textContent;
  const imgElement = btn.closest('li').querySelector('.dish-img img');
  const img = imgElement ? imgElement.src : 'https://picsum.photos/seed/default/80/80';
  
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cartData.find(item => item.name === dishName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartData.push({
      name: dishName,
      price: price,
      description: description,
      img: img,
      quantity: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cartData));
  alert(`${dishName} 已加入购物车！`);
}
// 跳转到购物车
function goToCartPage() {
  window.location.href = 'cart.html';
}
// 高亮当前页导航
function highlightCurrentNav() {
  const currentUrl = window.location.href;
  const navLinks = document.querySelectorAll('.bottom-nav a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (currentUrl.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
}