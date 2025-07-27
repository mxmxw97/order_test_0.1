// DOM 元素
const cartList = document.getElementById('cartList');
const totalPriceDom = document.getElementById('totalPrice');
const submitOrderBtn = document.getElementById('submitOrder');
const boxFeeDom = document.getElementById('boxFee');
const deliveryFeeDom = document.getElementById('deliveryFee');

// 页面加载后初始化
window.onload = function() {
  renderCartItems();
  highlightCurrentNav();
};

// 渲染购物车列表
function renderCartItems() {
  cartList.innerHTML = '';
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cartData.length === 0) {
    cartList.innerHTML = `
      <div class="empty-cart">
        <p>购物车为空</p>
        <a href="order_food.html" class="btn">去点餐</a>
      </div>
    `;
    submitOrderBtn.disabled = true;
    return;
  }
  
  let totalPrice = 0;
  cartData.forEach((item, index) => {
    const price = parseFloat(item.price.replace('¥', ''));
    item.quantity = item.quantity || 1;
    
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.img}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
      </div>
      <div class="quantity-btn">
        <button onclick="changeQuantity(${index}, -1)">-1</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${index}, +1)">+1</button>
        <span class="item-total">¥${(price * item.quantity).toFixed(2)}</span>
        <button onclick="removeItem(${index})" class="remove-btn">删除</button>
      </div>
    `;
    cartList.appendChild(li);
    totalPrice += price * item.quantity;
  });
  
  updateTotalPrice(totalPrice);
  submitOrderBtn.disabled = false;
}

// 更改数量
function changeQuantity(index, delta) {
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cartData[index];
  
  if (item) {
    item.quantity = (item.quantity || 1) + delta;
    if (item.quantity <= 0) cartData.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartData));
    renderCartItems();
  }
}

// 删除菜品
function removeItem(index) {
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  cartData.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartData));
  renderCartItems();
}

// 清空购物车
function clearCart() {
  if (confirm('确定要清空购物车吗？')) {
    localStorage.removeItem('cart');
    renderCartItems();
  }
}

// 更新总价
function updateTotalPrice(basePrice) {
  const boxFee = 0;
  const deliveryFee = basePrice > 0 ? 5 : 0;
  const total = basePrice + boxFee + deliveryFee;
  
  totalPriceDom.textContent = `¥${total.toFixed(2)}`;
  boxFeeDom.textContent = `¥${boxFee.toFixed(2)}`;
  deliveryFeeDom.textContent = `¥${deliveryFee.toFixed(2)}`;
}

// 提交订单（前端模拟，无后端交互）
function submitOrder() {
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cartData.length === 0) {
    alert('购物车为空，无法提交订单');
    return;
  }
  
  // 1. 显示加载状态
  submitOrderBtn.disabled = true;
  submitOrderBtn.textContent = '提交中...';
  
  // 2. 模拟订单数据（等效于后端应接收的数据结构）
  const orderData = {
    orderId: 'ORD_' + Date.now(), // 订单编号（时间戳生成）
    createTime: new Date().toLocaleString(), // 订单时间
    totalPrice: totalPriceDom.textContent, // 总价
    boxFee: boxFeeDom.textContent,
    deliveryFee: deliveryFeeDom.textContent,
    items: cartData.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      description: item.description
    })),
    status: '已提交' // 模拟订单状态
  };
  
  // 3. 本地存储模拟"保存订单"（替代后端数据库）
  const historyOrders = JSON.parse(localStorage.getItem('historyOrders')) || [];
  historyOrders.push(orderData);
  localStorage.setItem('historyOrders', JSON.stringify(historyOrders));
  
  // 4. 模拟网络延迟（1秒后完成）
  setTimeout(() => {
    // 5. 清空购物车
    localStorage.removeItem('cart');
    
    // 6. 恢复按钮状态并跳转至主页
    alert(`订单提交成功！\n订单编号：${orderData.orderId}\n总价：${orderData.totalPrice}`);
    window.location.href = 'index.html'; // 跳转到主页
  }, 1000);
}

// 高亮当前页导航
function highlightCurrentNav() {
  const navLinks = document.querySelectorAll('.bottom-nav a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === 'orders.html') {
      link.classList.add('active');
    }
  });
}