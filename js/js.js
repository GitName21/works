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

let close = true;	//移动端导航栏关闭：关闭

// 移动端导航栏
mobile_navbar_btn.onclick = function(){
	if(close){
		noScroll();
		
		// 按钮动画
		mobile_navbar_btn1.style.cssText = "transform: rotate(45deg);top: 0.39rem;";
		mobile_navbar_btn2.style.cssText = "transform: rotate(-45deg)";
		mobile_navbar_btn3.style.cssText = "opacity: 0";
		
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
				transform: 'translateY(-1rem)',
				opacity: 0
			},{
				visibility: 'visible',
				transform: 'translateY(0rem)',
				opacity: 1
			},
		],{
			duration:300,
			fill:'forwards'
		})
		
		navbar_person.animate([	//头像打开缓动动画
			{
				visibility: 'visible',
				transform: 'translateY(-1rem)',
				opacity: 0
			},{
				visibility: 'visible',
				transform: 'translateY(0rem)',
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
		mobile_navbar_btn1.style.cssText = "transform: rotate(0);top: 0rem;";
		mobile_navbar_btn2.style.cssText = "transform: rotate(0)";
		mobile_navbar_btn3.style.cssText = "opacity: 1";
		
		navbar_wrap.animate([	//导航栏打开动画
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
				transform: 'translateY(0rem)',
				opacity: 1
			},{
				visibility: 'visible',
				transform: 'translateY(-1rem)',
				opacity: 0
			},
		],{
			duration:300,
			fill:'forwards'
		})
		navbar_person.animate([	//头像关闭缓动动画
			{
				visibility: 'visible',
				transform: 'translateY(0rem)',
				opacity: 1
			},{
				visibility: 'visible',
				transform: 'translateY(-1rem)',
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


// PC端简历
navbar_person_head = document.querySelector('.navbar-person-head');
const biographical_notes = document.querySelector('.biographical-notes-wrap');
navbar_person_head.onclick = function(){
	maskShow();
	
	biographical_notes.style.cssText = "display: flex";
	
	biographical_notes.animate([	//动画
		{
			opacity: 0,
			transform:'translate3d(0,20px,0)'
		},{
			opacity: 1,
			transform:'translate3d(0,0,0)'
		},
	],{
		duration:300,
		fill:'forwards'
	})
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
			transform:'translate3d(0,20px,0)'
		},{
			opacity: 1,
			transform:'translate3d(0,0,0)'
		},
	],{
		duration:300,
		fill:'forwards'
	})
});

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
cover_code.addEventListener('touchstart', () => {
	startTime = Date.now();
});
cover_code.addEventListener('touchend', (e) => {
  if (Date.now() - startTime < 200) { // 判断点击时长
    // 执行点击逻辑
	maskShow();
	
	mobile_code.style.cssText = "display: flex";
	
	mobile_code.animate([	//动画
		{
			opacity: 0,
			transform:'translate3d(0,20px,0)'
		},{
			opacity: 1,
			transform:'translate3d(0,0,0)'
		},
	],{
		duration:300,
		fill:'forwards'
	})
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
  console.log("当前运行在微信浏览器中");
  // 可在此触发微信相关逻辑（如隐藏下载按钮、提示用户用浏览器打开等）
  mobile_code_cont.innerHTML='长按扫描二维码';
} else {
  console.log("当前不在微信浏览器中");
  mobile_code_cont.innerHTML = "长按保存二维码";
}

// 关闭
mask.onclick = function(){
	maskHide();
	
	// 二维码关闭动画
	mobile_code.animate([	//动画
		{
			opacity: 1,
			transform:'translate3d(0,0,0)'
		},{
			opacity: 0,
			transform:'translate3d(0,20px,0)'
		}
	],{
		duration:300,
		fill:'forwards'
	})
	// 设置一个定时器
	var myVar = setTimeout(function () {
		mobile_code.style.cssText = "transform:translate3d(0,0,0),display: none";
		clearTimeout(myVar);
	}, 300);
	
	// 简历关闭
	biographical_notes.animate([	//动画
		{
			opacity: 1,
			transform:'translate3d(0,0,0)'
		},{
			opacity: 0,
			transform:'translate3d(0,20px,0)'
		}
	],{
		duration:300,
		fill:'forwards'
	})
	// 设置一个定时器
	var myVar_bio = setTimeout(function () {
		biographical_notes.style.cssText = "transform:translate3d(0,0,0),display: none";
		clearTimeout(myVar_bio);
	}, 300);
	if(!close){	//解决已导航栏开关冲突问题
		document.body.style.overflow = 'hidden';
		// 或通过添加CSS类（推荐）
		document.body.classList.add('no-scroll'); /* CSS: .no-scroll { overflow: hidden; } */
	}
	
}