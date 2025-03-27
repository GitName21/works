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
		document.body.style.overflow = 'hidden';
		// 或通过添加CSS类（推荐）
		document.body.classList.add('no-scroll'); /* CSS: .no-scroll { overflow: hidden; } */
		
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
		// 恢复滚动
		document.body.style.overflow = 'auto';
		// 或
		document.body.classList.remove('no-scroll');
		
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
