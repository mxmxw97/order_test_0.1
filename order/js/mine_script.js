// 页面加载完成后执行
window.onload = function() {
  console.log('我的页面加载完成');
  // 高亮当前页面的底部导航
  highlightCurrentNav();
};

// 高亮当前页面对应的导航项
function highlightCurrentNav() {
  const navLinks = document.querySelectorAll('.bottom-nav a');
  navLinks.forEach(link => {
    // 移除所有导航项的激活状态
    link.classList.remove('active');
    // 给“我的”页面导航项添加激活状态
    if (link.getAttribute('href') === 'mine.html') {
      link.classList.add('active');
    }
  });
}