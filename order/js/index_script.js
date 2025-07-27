// 页面加载时初始化
window.onload = function() {
  console.log('首页加载完成');
  // 检查购物车数据，显示/隐藏购物车图标
  checkCartData();
  // 高亮当前页面的底部导航
  highlightCurrentNav();
};

// 检查购物车数据
function checkCartData() {
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const cartIcon = document.getElementById('cartIcon');
  if (cartData.length > 0) {
    cartIcon.style.display = 'flex';
  } else {
    cartIcon.style.display = 'none';
  }
}

// 高亮当前页面的底部导航
function highlightCurrentNav() {
  const currentUrl = window.location.href;
  const navLinks = document.querySelectorAll('.bottom-nav a');
  
  navLinks.forEach(link => {
    // 移除所有激活状态
    link.classList.remove('active');
    // 给当前页面链接添加激活状态
    if (currentUrl.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
}

// 跳转到购物车页面
function goToCartPage() {
  window.location.href = 'cart.html';
  console.log('跳转到购物车页面');
}