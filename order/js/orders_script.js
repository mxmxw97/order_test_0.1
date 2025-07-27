// 页面加载完成后执行
window.onload = function() {
  renderOrderList();
  highlightCurrentNav();
};

// 渲染订单列表
function renderOrderList() {
  const orderListDom = document.getElementById('orderList');
  const historyOrders = JSON.parse(localStorage.getItem('historyOrders')) || [];
  
  if (historyOrders.length === 0) {
    orderListDom.innerHTML = `
      <div class="empty-order">
        <p>暂无订单记录</p>
        <a href="order_food.html">去点餐</a>
      </div>
    `;
    return;
  }
  
  // 按时间倒序排列
  const sortedOrders = [...historyOrders].reverse();
  
  sortedOrders.forEach((order, index) => {
    const li = document.createElement('li');
    li.className = 'order-item';
    li.innerHTML = `
      <!-- 订单头部（可点击展开） -->
      <div class="order-header-card" onclick="toggleDetail(${index})">
        <div>
          <span>订单编号：${order.orderId.substring(0, 10)}...</span>
        </div>
        <div class="order-status">${order.status}</div>
      </div>
      
      <!-- 订单详情（默认隐藏） -->
      <div class="order-detail" id="detail-${index}">
        <p>提交时间：${order.createTime}</p>
        <p>菜品明细：</p>
        <ul class="dish-detail-list">
          ${order.items.map(dish => `
            <li class="dish-detail-item">
              <span>${dish.name} x ${dish.quantity}</span>
              <span>¥${(parseFloat(dish.price.replace('¥', '')) * dish.quantity).toFixed(2)}</span>
            </li>
          `).join('')}
        </ul>
        <p>餐盒费：${order.boxFee} | 配送费：${order.deliveryFee}</p>
        <p style="margin-top: 10px; font-weight: bold;">总计：${order.totalPrice}</p>
      </div>
    `;
    orderListDom.appendChild(li);
  });
}

// 切换订单详情显示/隐藏
function toggleDetail(index) {
  const detailDom = document.getElementById(`detail-${index}`);
  detailDom.classList.toggle('show');
}

// 高亮当前导航
function highlightCurrentNav() {
  const navLinks = document.querySelectorAll('.bottom-nav a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === 'orders.html') {
      link.classList.add('active');
    }
  });
}