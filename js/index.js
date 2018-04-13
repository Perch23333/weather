/*
* @Author: Administrator
* @Date:   2018-03-31 09:06:20
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-11 20:15:48
*/
// var weather;
// $.ajax({
// 	url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
// 	dataType: "jsonp",
// 	type:"get",
// 	success:function(obj){
		
// 		weather=obj.data.weather;
// 		console.log(weather);
// 	}
// });

var city;
//请求各个城市数据
$.ajax({
	url:'https://www.toutiao.com/stream/widget/local_weather/city/',
	dataType:'jsonp',
	type:'get',
	success:function(o){
		//console.log(o);
		city = o.data;
		//console.log(city);
		render(city);
	}	
})
function render(city){
	//渲染城市
	for(var m in city){
		//console.log(m);
		var city1=document.querySelector(".city1");
		var h1=document.createElement("div");
		var cityList = document.createElement("div");
		cityList.className = 'city_box';
		h1.className="hot_city";
		h1.innerHTML=m;
		var city1=document.querySelector(".city1");
		city1.appendChild(h1);	

		for(var n in city[m]){
			//console.log(n);
			var oDiv =  document.createElement('div');
			oDiv.className='chengshi';
			oDiv.innerHTML = n;
			cityList.appendChild(oDiv);
		}
		city1.appendChild(cityList);
		}		
	}
// 渲染数据函数
// 		 函数名
function updata(weather){
	// 城市名称
	var city_name=document.querySelector(".city");
	city_name.innerHTML=weather.city_name + '市';
	// 当前温度
	var temperature=document.querySelector(".temperature");
	temperature.innerHTML=weather.current_temperature+"°";
	// 当前天气状况
	var condition=document.querySelector(".condition");
	condition.innerHTML=weather.current_condition;

	// 今日最高温
	var condition=document.querySelector("#dat_high_temperature");
	dat_high_temperature.innerHTML=weather.dat_high_temperature;
	// 今日最低温
	var condition=document.querySelector("#dat_low_temperature");
	dat_low_temperature.innerHTML=weather.dat_low_temperature+"°";
	// 今日天气状况
	var condition=document.querySelector("#dat_condition");
	dat_condition.innerHTML=weather.dat_condition; 
	// 今日icon
	var dat_weather_icon_id=document.querySelector("#dat_weather_icon_id");
	dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png)`;

	// 明日最高温
	var condition=document.querySelector("#tomorrow_high_temperature");
	tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
	// 明日最低温
	var condition=document.querySelector("#tomorrow_low_temperature");
	tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature+"°";
	// 明日天气状况
	var condition=document.querySelector("#tomorrow_condition");
	tomorrow_condition.innerHTML=weather.tomorrow_condition;
	// 明日icon
	var dat_weather_icon_id=document.querySelector("#tomorrow_weather_icon_id");
	tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png)`;
	// 数组类型的对象
	// 
//24小时天气情况
	var str="";

	weather.hourly_forecast.forEach((item,index)=>{
		//console.log(item,index);
		str=str+`
			<div class="now">
				<h2 class="now_time">${item.hour}:00</h2>
				<div class="now_icon" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
				<h3 class="now_temp">${item.temperature}°</h3>
	    	</div>
		`
	})
	$(".wrap").html(str);

	var str="";
//近期天气情况
	weather.forecast_list.forEach((item,index)=>{
		//console.log(item,index);
		str=str+`
			<div class="content">
				<div class="content_date">
					${item.date.slice(5, 7)}/${item.date.slice(8)}
				</div>
				<div class="content_weatherH">${item.condition}</div>
				<div class="content_picH" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
				<div class=" content_hight">${item.high_temperature}°</div>
				<div class="content_low">${item.low_temperature}°</div>
				<div class="content_picL" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
				<div class="content_weatherL">${item.condition}</div>
				<div class="content_window">${item.wind_direction}</div>
				<div class="content_level">${item.wind_level}级</div>
			</div>
		`
	})
	$(".wrap1").html(str);
}
// 函数：
// 请求各城市天气情况
function AJAX(str){
	var url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
	$.ajax({
		url:url1,
		dataType:"jsonp",
		type:"get",
		success:function(obj){
			// 获取数据
			var weather=obj.data.weather;
		//	console.log(weather);
			// 渲染数据
			updata(weather);
			// 让城市盒子显示
			$(".location").css({"display":"none"});
			$(".hide").addClass("block");
		}
	})
}
	

// 页面加载完成以后执行
window.onload=function(){
	//updata();//
	$(".chengshi").on("click",function(){
		var cityh=this.innerHTML;
		AJAX(cityh);
	})

   // 点击城市名时，城市页面出现
   $(".city").on("click",function(){
      $(".location").css({"display":"block"});
   })
   
   // 当input获取焦点后，按钮的内容变确认
   $("input").on("focus",function(){
       $(".sousuo_text").html("确认");
   })


   // 操作按钮  分为确认与取消
   var button=document.querySelector(".sousuo_text");
   button.onclick=function(){
      var text=button.innerHTML;

      // 判断
      if(text=="取消"){
         $(".location").css({"display":"none"});
      }
      else{
         var str1=document.querySelector("input").value;

         for(var i in city){
           for(var j in city[i]){
             if(str1==j || str1 == j +'市'){
                AJAX(j);
                return;
             }
			 else{
				 $(".sousuo_text").html("取消");
				 document.querySelector("input").value = '';
			 }
           }
         }
         alert("没有该城市天气");
      }
   }
	
}
	