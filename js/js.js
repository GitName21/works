// ——————————封装——————————
function noScroll(){	//禁止屏幕滚动
	document.body.style.overflow = 'hidden';
	// 或通过添加CSS类（推荐）
	document.body.classList.add('no-scroll'); /* CSS: .no-scroll { overflow: hidden; } */
}
function scroll(){	//恢复屏幕滚动
	// 恢复滚动
	document.body.style.overflow = 'auto';
	// 或
	document.body.classList.remove('no-scroll');
}

let mask = document.querySelector(".mask");
function maskShow(){	//弹起遮罩
	noScroll();
	mask.style.cssText = "display: block";
	
	mask.animate([	//遮罩动画
		{
			opacity: 0
		},{
			opacity: 1
		},
	],{
		duration:300,
		fill:'forwards'
	})
}
function maskHide(){	//关闭遮罩
	scroll();
	mask.animate([	//遮罩动画
		{
			opacity: 1
		},{
			opacity: 0
		},
	],{
		duration:300,
		fill:'forwards'
	})
	// 设置一个定时器
	var myVar = setTimeout(function () {
		mask.style.cssText = "display: none";
		clearTimeout(myVar);
	}, 200);
	
}





//——————————特效——————————

let mobile_navbar_btn = document.querySelector(".mobile-navbar ul");	//移动端导航展开按钮

let mobile_navbar_btn1 = document.querySelector(".mobile-navbar ul>li:first-child");	//移动端导航展开结构-上横线
let mobile_navbar_btn2 = document.querySelector(".mobile-navbar ul>li:nth-child(2)");	//移动端导航展开结构-中横线
let mobile_navbar_btn3 = document.querySelector(".mobile-navbar ul>li:last-child");		//移动端导航展开结构-下横线

let navbar_list = document.querySelector(".navbar-list");	//导航列表
let navbar_person = document.querySelector(".navbar-person");	//个人

let navbar_wrap = document.querySelector(".navbar-wrap");	//导航栏模块
let navbar_wrap_hight = navbar_wrap.offsetHeight;	//导航栏模块

const mobilePerBtn =document.querySelector('.mobile-per-btn');	// 移动简历顶部固定按钮

let close = true;	//移动端导航栏关闭：关闭

// 移动端导航栏
mobile_navbar_btn.onclick = function(){
	if(close){
		noScroll();
		
		// 按钮动画
		mobile_navbar_btn1.style.cssText = "transform: rotate(45deg) translateZ(0px);top: 0.39rem;";
		mobile_navbar_btn2.style.cssText = "transform: rotate(-45deg) translateZ(0px)";
		mobile_navbar_btn3.style.cssText = "opacity: 0";
		
		mobilePerBtn.style.cssText = "transform: translateX(5px) translateZ(0px);opacity: 0;visibility: hidden;";
		
		navbar_list.style.cssText = "display: flex";
		navbar_person.style.cssText = "display: flex";
		
		navbar_wrap.animate([	//导航栏打开动画
			{
				height: navbar_wrap_hight + 'px'
			},{
				height: '100vh'
			}
		],{
			duration:350,
			fill:'forwards'
		})
		
		navbar_list.animate([	//导航栏打开，菜单缓动动画
			{
				visibility: 'visible',
				transform: 'translateY(-1rem) translateZ(0px)',
				opacity: 0
			},{
				visibility: 'visible',
				transform: 'translateY(0rem) translateZ(0px)',
				opacity: 1
			},
		],{
			duration:300,
			fill:'forwards'
		})
		
		navbar_person.animate([	//头像打开缓动动画
			{
				visibility: 'visible',
				transform: 'translateY(-1rem) translateZ(0px)',
				opacity: 0
			},{
				visibility: 'visible',
				transform: 'translateY(0rem) translateZ(0px)',
				opacity: 1
			},
		],{
			duration:300,
			fill:'forwards'
		})
		
		close = false;
	}else{
		scroll();
		
		// 按钮动画
		mobile_navbar_btn1.style.cssText = "transform: rotate(0px) translateZ(0px);top: 0rem;";
		mobile_navbar_btn2.style.cssText = "transform: rotate(0) translateZ(0px)";
		mobile_navbar_btn3.style.cssText = "opacity: 1";
		
		mobilePerBtn.style.cssText = "transform: translateX(0px) translateZ(0px);opacity: 1;";
		
		navbar_wrap.animate([	//导航栏关闭动画
			{
				height: '100vh',
			},{
				height: '3.5rem',
			},{
				height: 'auto',
			}
		],{
			duration:300,
			fill:'forwards'
		})
		
		navbar_list.animate([	//导航栏关闭菜单缓动动画
			{
				visibility: 'visible',
				transform: 'translateY(0rem) translateZ(0px)',
				opacity: 1
			},{
				visibility: 'visible',
				transform: 'translateY(-1rem) translateZ(0px)',
				opacity: 0
			},
		],{
			duration:300,
			fill:'forwards'
		})
		navbar_person.animate([	//头像关闭缓动动画
			{
				visibility: 'visible',
				transform: 'translateY(0rem) translateZ(0px)',
				opacity: 1
			},{
				visibility: 'visible',
				transform: 'translateY(-1rem) translateZ(0px)',
				opacity: 0
			}
		],{
			duration:300,
			fill:'forwards'
		})
		
		// 设置一个定时器
		var myVar = setTimeout(function () {	//动画完全执行完后隐藏元素
			navbar_list.style.cssText = "display: none";
			navbar_person.style.cssText = "display: none";
			
			clearTimeout(myVar);
		}, 200);
		
		close = true;
	}
}
// PC窗口变化时触发
function mobileNavShow(e){
	// 不含滚动条的尺寸，根据文档模式判断
	const isCSS1Compat = (document.compatMode === "CSS1Compat");
	const element = isCSS1Compat ? document.documentElement : document.body;
	
	if(element.clientWidth >= 767){	//如果不是移动端执行
		console.log('移动端导航栏按钮没点击+已经不在移动端');
		scroll();
		
		// 按钮动画
		mobile_navbar_btn1.style.cssText = "transform: rotate(0px) translateZ(0px);top: 0rem;";
		mobile_navbar_btn2.style.cssText = "transform: rotate(0) translateZ(0px)";
		mobile_navbar_btn3.style.cssText = "opacity: 1";
		
		mobilePerBtn.style.cssText = "transform: translateX(0px) translateZ(0px);opacity: 1;";
		
		navbar_list.style.cssText = "display: flex;visibility: visible;transform: translateY(0rem) translateZ(0px);opacity: 1";
		navbar_person.style.cssText = "display: flex;visibility: visible;transform: translateY(0rem) translateZ(0px);opacity: 1";
		navbar_wrap.animate([	//导航栏关闭动画
			{
				height: '100vh',
			},{
				height: 'auto',
			}
		],{
			duration:0,
			fill:'forwards'
		})
		
		close = true;
	}else{
		navbar_list.style.cssText = "display: none;";
		navbar_person.style.cssText = "display: none;";
	}
}
// 防抖函数（延迟执行）
function debounce(func, delay = 250) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
// 绑定防抖后的 resize 处理函数
window.addEventListener('resize', debounce(mobileNavShow));


// PC端简历
navbar_person_head = document.querySelector('.navbar-person-head');
const biographical_notes = document.querySelector('.biographical-notes-wrap');
navbar_person_head.onclick = function(){
	// 判断是否是移动端
	// 不含滚动条的尺寸，根据文档模式判断
	const isCSS1Compat = (document.compatMode === "CSS1Compat");
	const element = isCSS1Compat ? document.documentElement : document.body;
	
	if(element.clientWidth >= 767){	//如果不是移动端执行
		maskShow();
		
		biographical_notes.style.cssText = "display: flex";
		
		biographical_notes.animate([	//动画
			{
				opacity: 0,
				transform:'translate3d(0px,20px,0px)'
			},{
				opacity: 1,
				transform:'translate3d(0px,0px,0px)'
			},
		],{
			duration:300,
			fill:'forwards'
		})
	}

}
// 移动简历
const mobile_person_look = document.querySelector('.mobile-person-look');
// 给触发元素绑定点击事件
mobile_person_look.addEventListener('click', function(event) {
	maskShow();
	
	biographical_notes.style.cssText = "display: flex";
	
	biographical_notes.animate([	//动画
		{
			opacity: 0,
			transform:'translate3d(20px,0px,0px)'
		},{
			opacity: 1,
			transform:'translate3d(0px,0px,0px)'
		},
	],{
		duration:300,
		fill:'forwards'
	})
});
// 移动简历顶部固定按钮
// const mobilePerBtn =document.querySelector('.mobile-per-btn');
const mobilePerBtn1 =document.querySelector('.mobile-per-btn-1');
const mobilePerBtn2 =document.querySelector('.mobile-per-btn-2');
const mobilePerBtn3 =document.querySelector('.mobile-per-btn-3');
const coverWrap =document.querySelector('.cover-wrap');
const main =document.querySelector('.main');
// let mobilePerBtn
mobilePerBtn.addEventListener('click', function(){
	// 顶部导航按钮动画
	mobilePerBtn1.animate([
		{
			left:'0.2rem',
		}
	],{
		duration:300,
		fill:'forwards'
	})
	mobilePerBtn2.animate([
		{
			left:'0.4rem',
		}
	],{
		duration:300,
		fill:'forwards'
	})
	mobilePerBtn3.animate([
		{
			left:'0.3rem',
		}
	],{
		duration:300,
		fill:'forwards'
	})
	
	maskShow();
	
	// 简历动画
	biographical_notes.style.cssText = "display: flex";
	
	// 内容跟随动画
	coverWrap.style.cssText = "transform: translate3d(-100px,0px,0px);transition: all 0.2s linear;";
	main.style.cssText = "transform: translate3d(-100px,0px,0px);transition: all 0.2s linear;";
	
	biographical_notes.animate([	//动画
		{
			opacity: 0,
			transform:'translate3d(20px,0px,0px)'
		},{
			opacity: 1,
			transform:'translate3d(0px,0px,0px)'
		},
	],{
		duration:300,
		fill:'forwards'
	})
})

// 简历返回
const bioBack = document.querySelector('.bio-back div');
bioBack.addEventListener('click',(e) => {
	mask.animate([	//遮罩动画
		{
			opacity: 1
		},{
			opacity: 0
		},
	],{
		duration:300,
		fill:'forwards'
	})
	// 设置一个定时器
	var myVar = setTimeout(function () {
		mask.style.cssText = "display: none";
		clearTimeout(myVar);
	}, 200);
	// 简历关闭
	biographical_notes.animate([	//动画
		{
			opacity: 1,
			transform:'translate3d(0px,0px,0px)'
		},{
			opacity: 0,
			transform:'translate3d(20px,0px,0px)'
		}
	],{
		duration:300,
		fill:'forwards'
	})
	// 设置一个定时器
	var myVar_bio = setTimeout(function () {
		biographical_notes.style.cssText = "transform:translate3d(0px,0px,0px),display: none";
		clearTimeout(myVar_bio);
	}, 300);
	if(!close){	//解决与导航栏开关冲突问题
		document.body.style.overflow = 'hidden';
		// 或通过添加CSS类（推荐）
		document.body.classList.add('no-scroll'); /* CSS: .no-scroll { overflow: hidden; } */
	}
	
	// 顶部导航按钮动画
	mobilePerBtn1.animate([
		{
			left:'0rem',
		}
	],{
		duration:300,
		fill:'forwards'
	})
	mobilePerBtn2.animate([
		{
			left:'0rem',
		}
	],{
		duration:300,
		fill:'forwards'
	})
	mobilePerBtn3.animate([
		{
			left:'0rem',
		}
	],{
		duration:300,
		fill:'forwards'
	})
	if(close){
		scroll();
	}
	
	// 内容跟随动画
	coverWrap.style.cssText = "transform: translate3d(0px,0px,0px);transition: all 0.5s ease;";
	main.style.cssText = "transform: translate3d(0px,0px,0px);transition: all 0.5s ease;";
})

// 简历返回提示词的过渡动画
const bioBackTips = document.querySelector('.bio-back span');
let TipsScrollTopValue;
let TipsOpacity;
biographical_notes.addEventListener('scroll',function(){
	TipsScrollTopValue = biographical_notes.scrollTop; // 单位：像素（px）
	if(TipsScrollTopValue>=200){
		TipsScrollTopValue = 200;
	}
	// console.log(TipsScrollTopValue)
	TipsOpacity = TipsScrollTopValue / 200;
	
	bioBackTips.style.cssText = "opacity: " + TipsOpacity;
})



// 返回顶部
let top_wrap = document.querySelector('.top-wrap');
// 核心滚动函数（支持自定义速度）
function smoothScrollTop(duration = 800) {
    const start = window.pageYOffset || document.documentElement.scrollTop;
    const startTime = performance.now();

    function scrollStep(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 缓动函数（easeOutQuad）
        window.scrollTo(0, start - easeOutQuad(progress) * start);
        
        if (progress < 1) {
            requestAnimationFrame(scrollStep);
        }
    }

    // 缓动函数实现
    function easeOutQuad(t) {
        return t * (2 - t);
    }

    requestAnimationFrame(scrollStep);
}
// 点击事件绑定
top_wrap.addEventListener('click', () => {
    smoothScrollTop(1000); // 参数控制滚动时长（单位：毫秒）
});



// 移动端二维码弹窗
let cover_code = document.querySelector('.cover-code');

// 不包含滚动条的视口尺寸（兼容旧浏览器）
const clientWidth = document.documentElement.clientWidth;  // 如 1184px（减去滚动条16px）
const clientHeight = document.documentElement.clientHeight;
// console.log('屏幕宽'+clientWidth,'屏幕高'+clientHeight)

let mobile_code = document.querySelector('.mobile-code');
cover_code.addEventListener('click', () => {
	startTime = Date.now();
});
cover_code.addEventListener('click', (e) => {
	
	// 判断是否是移动端
	// 不含滚动条的尺寸，根据文档模式判断
	const isCSS1Compat = (document.compatMode === "CSS1Compat");
	const element = isCSS1Compat ? document.documentElement : document.body;
	
	if(element.clientWidth <= 767){	//如果是移动端执行
		if (Date.now() - startTime < 200) { // 判断点击时长
		  // 执行点击逻辑
			maskShow();
			
			mobile_code.style.cssText = "display: flex";
			
			mobile_code.animate([	//动画
				{
					opacity: 0,
					transform:'translate3d(0px,20px,0px)'
				},{
					opacity: 1,
					transform:'translate3d(0px,0px,0px)'
				},
			],{
				duration:300,
				fill:'forwards'
			})
		}
	}

  
});
// 二维码弹窗文案,微信浏览器与其它浏览器文案不一样
// 判断是否为微信浏览器
let mobile_code_cont = document.querySelector('.mobile-code div:last-child');
function isWechatBrowser() {
  // 通过用户代理关键词 "MicroMessenger" 检测
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') !== -1;
}
// 使用示例
if (isWechatBrowser()) {
  // console.log("当前运行在微信浏览器中");
  // 可在此触发微信相关逻辑（如隐藏下载按钮、提示用户用浏览器打开等）
  mobile_code_cont.innerHTML='长按扫描二维码';
} else {
  // console.log("当前不在微信浏览器中");
  mobile_code_cont.innerHTML = "长按保存二维码";
}

// 简历下载弹窗
const mobilePersonDownload = document.querySelector('.mobile-person-download');
const bioFooter = document.querySelector('.bio-footer');
const PersonDownloadWindow = document.querySelector('.PersonDownload-window');
mobilePersonDownload.addEventListener('click',function(){
	maskShow(); //遮罩弹起
	
	PersonDownloadWindow.style.cssText = "display: flex";
	
	PersonDownloadWindow.animate([	//动画
		{
			opacity: 0,
			transform:'translate3d(0px,20px,0px)'
		},{
			opacity: 1,
			transform:'translate3d(0px,0px,0px)'
		},
	],{
		duration:300,
		fill:'forwards'
	})
})
bioFooter.addEventListener('click',function(){
	alert('该链接已失效！');
})


// 关闭
mask.onclick = function(){
	maskHide();
	
	// 二维码关闭动画
	mobile_code.animate([	//动画
		{
			opacity: 1,
			transform:'translate3d(0px,0px,0px)'
		},{
			opacity: 0,
			transform:'translate3d(0px,20px,0px)'
		}
	],{
		duration:300,
		fill:'forwards'
	})
	// 设置一个定时器
	var myVar = setTimeout(function () {
		mobile_code.style.cssText = "transform:translate3d(0px,0px,0px),display: none";
		clearTimeout(myVar);
	}, 300);
	

	// 点击遮罩简历关闭
	// 简历关闭
	biographical_notes.animate([	//动画
		{
			opacity: 1,
			transform:'translate3d(0px,0px,0px)'
		},{
			opacity: 0,
			transform:'translate3d(0px,20px,0px)'
		}
	],{
		duration:300,
		fill:'forwards'
	})
	// 设置一个定时器
	var myVar_bio = setTimeout(function () {
		biographical_notes.style.cssText = "transform:translate3d(0px,0px,0px),display: none";
		clearTimeout(myVar_bio);
	}, 300);
	if(!close){	//解决与导航栏开关冲突问题
		document.body.style.overflow = 'hidden';
		// 或通过添加CSS类（推荐）
		document.body.classList.add('no-scroll'); /* CSS: .no-scroll { overflow: hidden; } */
	}
	
	// 下载弹窗关闭
	PersonDownloadWindow.animate([	//动画
		{
			opacity: 1,
			transform:'translate3d(0px,0px,0px)'
		},{
			opacity: 0,
			transform:'translate3d(0px,20px,0px)'
		}
	],{
		duration:300,
		fill:'forwards'
	})
	// 设置一个定时器
	var myPerDownload = setTimeout(function () {
		PersonDownloadWindow.style.cssText = "transform:translate3d(0px,0px,0px),display: none";
		clearTimeout(myPerDownload);
	}, 300);
}


// 侧边栏滚动动画
const side_li = document.querySelectorAll('.side-wrap ul li');
let side_index = 0;
// // 方法一for
// for(let i=0;i<side_li.length;i++){
// 	side_li[i].index = i;	//将i重新赋值给元素的下标
	
// 	side_li[i].addEventListener('click',function(e){			//(e)=> 箭头函数没有自己的 this 绑定,改用function()
// 		// 添加当前点击元素的焦点样式
// 		this.classList.add("side-focus");
// 		// console.log('当前下标' + this.index)
// 		for (let j = 0; j < side_li.length; j++) {
// 			if (j !== this.index) { // 判断索引是否与当前点击元素的索引不同
// 				side_li[j].classList.remove("side-focus");
// 			}
// 		}
		
// 	})
// }

// 方法二foreach———————菜单点击实现焦点
side_li.forEach((element, index) => {
    element.addEventListener('click', function() {
		side_index = index;
		// console.log('点击元素的索引是：' +side_index)
		
        // 移除所有元素的样式
        side_li.forEach(el => el.classList.remove("side-focus"));
        // 添加当前元素的样式
        this.classList.add("side-focus");
		
		const main_title = document.querySelectorAll('.main-title')[side_index];
		const rect = main_title.getBoundingClientRect();
		const absoluteTop = rect.top + window.scrollY;
		// console.log('绝对 Y 坐标:', absoluteTop);
		// console.log('当前面板式：', main_title);

		  //平滑滚动到指定位置
		  window.scrollTo({
			top: absoluteTop-80,
			behavior: 'smooth'
		  });
		
		// console.log( '当前点击的元素对应的面板Y坐标是：' + rect.top);
		
    });
});

const side_up = document.querySelector('.side-up');
const side_next = document.querySelector('.side-next');

side_up.addEventListener('click',function(){
	side_index--;
	if(side_index < 0){
		side_index = side_li.length-1;
	}
	// 移除所有元素的样式
	side_li.forEach(el => el.classList.remove("side-focus"));
	side_li[side_index].classList.add("side-focus");
	
	// 滚动
	const main_title = document.querySelectorAll('.main-title')[side_index];
	const rect = main_title.getBoundingClientRect();
	const absoluteTop = rect.top + window.scrollY;
	// console.log('绝对 Y 坐标:', absoluteTop);
	// console.log('当前面板式：', main_title);
	
	  //平滑滚动到指定位置
	  window.scrollTo({
		top: absoluteTop-80,
		behavior: 'smooth'
	  });
})

side_next.addEventListener('click',function(){
    // 增加索引，如果超过最大值则回到 0
    // side_index = (side_index + 1) % side_li.length; // ✅ 用取模运算循环
	side_index++;
	if(side_index >= side_li.length){
		side_index = 0;
	}
    // 移除所有元素的样式
    side_li.forEach(el => el.classList.remove("side-focus"));
    side_li[side_index].classList.add("side-focus");
	
	// 滚动
	const main_title = document.querySelectorAll('.main-title')[side_index];
	const rect = main_title.getBoundingClientRect();
	const absoluteTop = rect.top + window.scrollY;
	// console.log('绝对 Y 坐标:', absoluteTop);
	// console.log('当前面板式：', main_title);
	
	  //平滑滚动到指定位置
	  window.scrollTo({
		top: absoluteTop-80,
		behavior: 'smooth'
	  });
})

// 滚动高亮
// 修复变量名（关键！）
let isScrolling = false; // ✅ 统一变量名
let lastScrollY = 0;     // ✅ 新增：记录上次滚动位置

// 滚动事件监听（优化防抖逻辑）
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const isScrollingFast = Math.abs(currentScrollY - lastScrollY) > 50; // ⚡ 判断是否快速滑动
  
  // 如果是快速滑动，立即响应（不防抖）
  if (isScrollingFast) {
    updateActiveMenu();
    lastScrollY = currentScrollY;
    return;
  }

  // 普通滚动仍用防抖
  if (isScrolling) return;
  isScrolling = true;
  setTimeout(() => {
    updateActiveMenu();
	scrollShow();       // 3. 实际执行任务
	// mobilePerBtnS();
	ProgressBar();
	
    isScrolling = false;
    lastScrollY = currentScrollY;
  }, 30); // ⚡ 缩短防抖间隔至 30ms
  

  
});

//进度条 
const progressBar = document.querySelector('.progressBar');
let progressBarWidth;	//进度条宽度
let webScrollHeight;

window.addEventListener('DOMContentLoaded', () => {
  const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  const webHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);	//获取网页的高度
  const windowHeight = window.innerHeight;	// 视口高度（不含滚动条）
  webScrollHeight = webHeight - windowHeight;	//网页滚动区域高度 = 获取网页的高度-视口高度
  // console.log("网页高度:", webHeight);
  // console.log("网页滚动区域高度:", webScrollHeight);
  
  progressBarWidth = (scrollY / webScrollHeight) * 100;
  progressBar.style.cssText = "width:" + progressBarWidth + "%";
});

function ProgressBar(){
	const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
	
	// 解决移动端浏览器滚动时搜索框收入导致浏览器可视高度变化
	const webHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);	//获取网页的高度
	const windowHeight = window.innerHeight;	// 视口高度（不含滚动条）
	webScrollHeight = webHeight - windowHeight;	//网页滚动区域高度 = 获取网页的高度-视口高度
	
	// console.log("网页滚动了:", window.scrollY);
	progressBarWidth = (scrollY / webScrollHeight) * 100;
	// console.log("进度条宽度应该是:", progressBarWidth);
	
	progressBar.style.cssText = "width:" + progressBarWidth + "%";
}



// 更新高亮函数（优化判断逻辑）
function updateActiveMenu() {
  const sections = document.querySelectorAll('.main-title');
  let closestIndex = -1;
  let minDistance = Infinity;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const distanceToCenter = Math.abs(rect.top - window.innerHeight * 0.5); // ✅ 中心点优先级
	
    if (distanceToCenter < minDistance) {
      minDistance = distanceToCenter;
      closestIndex = index;
    }
  });

  if (closestIndex !== -1) {
    side_li.forEach((li, index) => {
      li.classList.toggle('side-focus', index === closestIndex); // ✅ 立即切换
	  side_index = closestIndex;
    });
  }
}

// 滚动提示函数（修复函数名）
function scrollShow() {
	const sideWrap = document.querySelector('.side-wrap');
  if (window.scrollY > 100) {
    // console.log('已滚动超过 100px'); // ✅ 改用日志输出
    // 或更新 DOM 元素提示（非阻塞）
	sideWrap.animate([
		{
			opacity:1,
			right:'0.5rem'
		}
	],{
		duration:300,
		fill:'forwards'
	})
  }else{
	  sideWrap.animate([
	  	{
	  		opacity:0,
			right:'0rem'
	  	}
	  ],{
	  	duration:300,
	  	fill:'forwards'
	  })
  }
}



// 菜单栏
const navbarList = document.querySelectorAll('.navbar-list li');	//获取li元素
let listIndex = 0;	//保存索引

navbarList.forEach((item,index)=>{	//遍历所有li，item:li元素，index引索
	item.addEventListener('click',function(){	//点击li执行
		listIndex = index;	//赋值索引
		
		// 恢复滚动
		scroll();
		
		// console.log('出发')
		
		mobilePerBtn.style.cssText = "transform: translate3d(0px,0px,0px);opacity: 1;";	//显示移动端顶部简历按钮
		
		// 滚动
		const main_title = document.querySelectorAll('.main-title')[listIndex];
		const rect = main_title.getBoundingClientRect();
		const absoluteTop = rect.top + window.scrollY;
		// console.log('绝对 Y 坐标:', absoluteTop);
		// console.log('当前面板式：', main_title);
		
		//平滑滚动到指定位置
		window.scrollTo({
			top: absoluteTop-80,
			behavior: 'smooth'
		});
		
		// 移动端关闭导航
		// 按钮动画
		// 判断是否是移动端
		// 不含滚动条的尺寸，根据文档模式判断
		const isCSS1Compat = (document.compatMode === "CSS1Compat");
		const element = isCSS1Compat ? document.documentElement : document.body;
		
		if(element.clientWidth <= 767){	//如果是移动端执行
			mobile_navbar_btn1.style.cssText = "transform: rotate(0) translateZ(0px);top: 0rem;";
			mobile_navbar_btn2.style.cssText = "transform: rotate(0) translateZ(0px)";
			mobile_navbar_btn3.style.cssText = "opacity: 1";
			
			navbar_wrap.animate([	//导航栏关闭动画
				{
					height: '100vh',
				},{
					height: '3.5rem',
				},{
					height: 'auto',
				}
			],{
				duration:300,
				fill:'forwards'
			})
			
			navbar_list.animate([	//导航栏关闭菜单缓动动画
				{
					visibility: 'visible',
					transform: 'translateY(0rem) translateZ(0px)',
					opacity: 1
				},{
					visibility: 'visible',
					transform: 'translateY(-1rem) translateZ(0px)',
					opacity: 0
				},
			],{
				duration:300,
				fill:'forwards'
			})
			navbar_person.animate([	//头像关闭缓动动画
				{
					visibility: 'visible',
					transform: 'translateY(0rem) translateZ(0px)',
					opacity: 1
				},{
					visibility: 'visible',
					transform: 'translateY(-1rem) translateZ(0px)',
					opacity: 0
				}
			],{
				duration:300,
				fill:'forwards'
			})
			
			// 设置一个定时器
			var myVar = setTimeout(function () {	//动画完全执行完后隐藏元素
				navbar_list.style.cssText = "display: none";
				navbar_person.style.cssText = "display: none";
				
				clearTimeout(myVar);
			}, 200);
			
			close = true;
		
		}

	})
})

// 移动端顶部简历按钮开关
function mobilePerBtnS(){
	if(window.scrollY<600){
		mobilePerBtn.style.cssText = "transform: translateX(5px) translateZ(0px);opacity: 0;visibility: hidden;";
	}else{
		  
		mobilePerBtn.style.cssText = "transform: translateX(0px) translateZ(0px);opacity: 1;";
	}
}
// if(window.scrollY<600){
// 	mobilePerBtn.style.cssText = "transform: translateX(5px) translateZ(0);opacity: 0;visibility: hidden;transition: all 0s ease;";
// }else{
// 	mobilePerBtn.style.cssText = "transform: translateX(0) translateZ(0);opacity: 1;";
// }


// // 3d区域轮播图_____________我写的
// const Page = document.querySelectorAll('.d-spwer-page>li');
// const spwer = document.querySelector('.main-content-3d-3d-spwer');
// const spwerDiv = document.querySelectorAll('.main-content-3d-3d-spwer div');
// let pageNow = 0;
// let TdLeft = 0;
// let isDragging = false;
// let startX,endX,moveX;


// Page.forEach((page,index) => {	//点击
// 	page.addEventListener('click',function(){
		
// 		pageNow = index;
// 		// console.log(pageNow);
		
// 		TdLeft = pageNow*100;
// 		// console.log(TdLeft);
		
// 		spwer.style.cssText = "left:" + -TdLeft + "%";
		
// 		Page.forEach(el => {
// 			el.style.cssText = "background-color: #fff;";
// 		})
		
// 		this.style.cssText = "background-color: #da840c;";
// 	})
// })
// // 滑动
// spwer.addEventListener('touchstart',function(e){
// 	startX = e.touches[0].clientX;
// 	// console.log('按下坐标：' + startX)
	
// 	isDragging = false;
// })

// spwer.addEventListener('touchmove',function(e){
// 	moveX = e.touches[0].clientX - startX;
// 	// console.log('移动了：' + moveX)
	
// 	spwer.style.cssText = "left:" + moveX + "px";
// })

// spwer.addEventListener('touchend',function(e){
	
	
// 	moveX = e.changedTouches[0].clientX - startX;
	
// 	// console.log('松开了,共移动：' + moveX)
	
// 	if(moveX<20){
// 		pageNow++;
		
// 		if(pageNow >= 1){
// 			pageNow = 1;
// 		}
		
// 		TdLeft = pageNow*100;
// 		spwer.style.cssText = "left:" + -TdLeft + "%";
// 	}
// 	if(moveX>20){
// 		pageNow--;
		
// 		if(pageNow <= 0){
// 			pageNow = 0;
// 		}
		
// 		TdLeft = pageNow*100;
// 		spwer.style.cssText = "left:" + -TdLeft + "%";
// 	}
	
// 	Page.forEach(el => {
// 		el.style.cssText = "background-color: #fff;";
// 	})
// 	Page[pageNow].style.cssText = "background-color: #da840c;";
// })

// AI修复
// 遍历所有轮播容器，为每个实例独立初始化
document.querySelectorAll('.main-content-3d-3d-spwer').forEach(spwer => {
  // 每个轮播的独立变量
  let pageNow = 0;
  let startX;
  let isDragging = false;
  let moveX;
  let moveEndX;
  let XValue;	//X方向偏移的值
  let XNumber;	//X方向偏移的解析浮点数

  const spwerDiv = spwer.children	//获取当前spwer下面的滑动块
  let spwerDivWidth;	//每个滑动块的宽度
	
  // 获取当前轮播对应的分页按钮（必须与轮播在同一父级下）
  const Pages = spwer.parentElement.querySelectorAll('.d-spwer-page > li');
  if (!Pages.length) return;

  // 点击分页切换（修正为当前轮播的分页）
  Pages.forEach((page, index) => {
    page.addEventListener('click', function() {
      pageNow = index;
	  spwerDivWidth = spwerDiv[pageNow].offsetWidth;	//获取当前div宽度
	  // console.log('div宽度：',spwerDivWidth)
      spwer.style.transform = `translateX(-${pageNow * spwerDivWidth}px)`;
      
      // 更新当前轮播的分页样式
      Pages.forEach(el => el.style.backgroundColor = '#fff');
      this.style.backgroundColor = '#090A07';
	  
	  // console.log(pageNow)
    });
  });

  // 触摸事件（绑定到当前轮播）
  spwer.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
	
	// 获取 left 值
	XValue = getTranslateX(spwer);	//获取X轴偏移量
	XNumber = parseFloat(XValue) || 0;	//解析浮点数
	// console.log('目前的左值是：' + XNumber)
    spwer.style.transition = 'all 0 linear'; // 拖动时禁用动画，这里不能使用spwer.style.transition = '0'，否则会导致下方触摸送开时动画时间为0
	
	e.preventDefault(); // 阻止默认滚动
  });

  spwer.addEventListener('touchmove', function(e) {

    if (!isDragging) return;
	
    moveX = e.touches[0].clientX - startX;
	moveX = XNumber + moveX;	//要加上当前左边偏移的值，否则会跳转到第一张，以为移动的时候距离是从0开始的
	// console.log('手指滑动了：' + moveX)
	
	spwer.style.transform = `translateX(${moveX}px)`;
    // spwer.style.left = `${moveX}px`;
  });

  spwer.addEventListener('touchend', function(e) {
	  // console.log('div有多少个：',spwerDiv.length)
    if (!isDragging) return;
    isDragging = false;
	
		moveEndX = e.changedTouches[0].clientX - startX;	//松开时一共移动了多少距离 = 松开时 - 按下时
		// console.log('松开了,共移动：' + moveEndX)
		
		if(moveEndX<-50){
			pageNow++;
			if(pageNow >= spwerDiv.length-1){	//长度和引索相差1:例如长度是3，引索就是2:0,1,2
				pageNow = spwerDiv.length-1;
			}
		}
		if(moveEndX>50){
			pageNow--;
			if(pageNow <= 0){
				pageNow = 0;
			}
		}
		spwer.style.transition = 'all 0.3s linear'; // 松开时启动动画'
		// console.log('当前引索是：' + pageNow)
		spwerDivWidth = spwerDiv[pageNow].offsetWidth;	//获取当前div宽度
		// console.log('鼠标松开当前div宽度是：' + spwerDivWidth)
		TdLeft = pageNow*spwerDivWidth;
		// spwer.style.cssText = "left:" + -TdLeft + "%";
		spwer.style.transform = `translateX(-${TdLeft}px)`;
		
		Pages.forEach(el => {
			el.style.cssText = "background-color: #fff;";
		})
		Pages[pageNow].style.cssText = "background-color: #090A07;";

  });
});

// 工具函数：获取 translateX 值
function getTranslateX(element) {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;
  if (transform === 'none') return 0;
  const matrix = new DOMMatrixReadOnly(transform);
  return matrix.m41;
}