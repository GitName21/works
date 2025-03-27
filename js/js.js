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
mask.onclick = function(){
	maskHide();
}


//——————————特效——————————

let mobile_navbar_btn = document.querySelector(".mobile-navbar ul");	//移动端导航展开按钮

let mobile_navbar_btn1 = document.querySelector(".mobile-navbar ul>li:first-child");	//移动端导航展开结构
let mobile_navbar_btn2 = document.querySelector(".mobile-navbar ul>li:nth-child(2)");	//移动端导航展开结构
let mobile_navbar_btn3 = document.querySelector(".mobile-navbar ul>li:last-child");	//移动端导航展开结构

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
		
		navbar_list.animate([	//导航栏打开动画
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
		
		navbar_person.animate([	//头像打开动画
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
		
		navbar_list.animate([	//导航栏打开动画
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
		navbar_person.animate([	//头像打开动画
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
		var myVar = setTimeout(function () {
			navbar_list.style.cssText = "display: none";
			navbar_person.style.cssText = "display: none";
			
			clearTimeout(myVar);
		}, 200);
		
		close = true;
	}
}


// PC端简历
navbar_person.onclick = function(){
	maskShow();
}

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
