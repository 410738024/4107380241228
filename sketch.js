var colors = "c739ab-f532a7-9a85cc-e96868-305cc4".split("-").map(a=>"#"+a)
var colors_r = "aaaaaa-bbbbbb-cccccc-dddddd-eeeeee".split("-").map(a=>"#"+a)
var clr,clr_r
//+++++++++++資料集設定+++++++++++++
var positionListX =[]  //所有花的X軸位置，List串列，array陣列
var positionListY =[]  //所有花的Y軸位置
var clrList=[]      //所有花瓣顏色
var clr_r_List = []  //所有花圓心顏色
var clr_r_r_List =[]
var sizeList =[]  //所有花的大小
//---------------------------

//+++++++++++複製貼上+++++++++++++
let handpose;
let video; //攝影機取得影像，放影像資料
let predictions = [];
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX16,pointerY16,d
let pointerX14,pointerY14,pointerX10,pointerY10
function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var j=0;j<10;j++){  
    positionListX.push(random(width))
    positionListY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
    push() 
      translate(positionListX[j],positionListY[j]) 
      clr = clrList[j]
      clr_r = clr_r_List[j]
      drawFlower(clr,clr_r,sizeList[j]) 
    pop()
    }
			//取得攝影機開始執行
			video = createCapture(VIDEO);//取得攝影機的影像並把畫面放到video
			video.size(width, height);
      handpose = ml5.handpose(video, modelReady);
			handpose.on("predict", (results) => { 
					predictions = results;
			});
			video.hide();
}
function modelReady() {
  console.log("start");
}
function draw() {  //攝影機反向
  translate(width, 0);
  scale(-1, 1);
	background(255); 
	image(video,0,0,width,height);
	d= dist(pointerX8,pointerY8,pointerX16,pointerY16)
	for(var j=0;j<positionListX.length;j++){   
	r_Flower(clrList[j], clr_r_List[j],sizeList[j],positionListX[j],positionListY[j])
  }
		drawKeypoints(); //取得手指位置
   }
function drawFlower(clr,clr_r,size=1){  
  push()
    scale(size)    
    fill(255)	
	ellipse(350,150,150,130) //臉
	ellipse(320,50, 25, 140); //耳朵
	ellipse(370,50, 25, 140); //耳朵	
	ellipse(370,200, 200, 200); //身體
	ellipse(450,270,30,30) //尾巴	
	fill(0)	
	ellipse(325,130, 10, 20); //眼睛
	ellipse(370,130, 10, 20); //眼睛
	rect(250,155,50,5,5)//鬍鬚
	rect(250,145,50,5,5)//鬍鬚	
	rect(400,155,50,5,5)//鬍鬚	
	rect(400,145,50,5,5)//鬍鬚	
	fill("#D44654")	
	rect(345,155,5,10,10)//鼻子
	fill("#F2A1C8")
	ellipse(315,150,20,10) //腮紅
	ellipse(380,150,20,10) //腮紅	
	ellipse(320,50,15,90); //耳朵
	ellipse(370,50,15,90); //耳朵	
	fill("#F8F7D5")	
	ellipse(350,230,80,80); //花蕊	
	fill("#FAEB7E")	
	ellipse(350,230,20,20); //花蕊	
	fill(clr)		
	ellipse(350,200,20,40); //花瓣	
	ellipse(350,260,20,40); //花瓣
	ellipse(322,230,40,20); //花瓣	
	ellipse(378,230,40,20); //花瓣
	ellipseMode(CORNER)
    for(var i =0 ;i<5;i++){
	fill("#F27713") //紅蘿蔔
	ellipse(-80,105,40,100); //紅蘿蔔
	fill("#90F56F")
	ellipse(-70,45,20,40); //葉
	ellipse(-90,45,20,40); //葉
	fill("#77C722")		
	ellipse(-80,45,20,40); //葉
  rotate(PI/1.5)
 }
  pop()    
}
function mousePressed(){
positionListX.push(mouseX) 
positionListY.push(mouseY)
clrList.push(colors[int(random(colors.length))])
clr_r_List.push(colors_r[int(random(colors_r.length))])
sizeList.push(random(0.5,1.5))
let data_length = positionListX.length
push() 
  translate(positionListX[data_length-1],positionListY[data_length-1]) 
  clr = clrList[data_length-1]
  clr_r = clr_r_List[data_length-1]
  drawFlower(clr,clr_r,sizeList[data_length-1]) 
pop()
}
//畫出第8 16 20點
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      if (j == 8) {			
				pointerX8 = map(keypoint[0],0,640,0,width) 
				pointerY8 = map(keypoint[1],0,480,0,height)
        pointerZ8 = map(keypoint[2],0,480,0,height)
        console.log(pointerZ8)
        if(pointerZ8<-40)
        {
          R_draw(pointerX8,pointerY8)
        }
				ellipse(pointerX8, pointerY8, 30, 30);
      } 
			else
      if (j == 16) {   
				fill(255,0,0)
        pointerX16 = map(keypoint[0],0,640,0,width)
        pointerY16 = map(keypoint[1],0,480,0,height)
        ellipse(pointerX16, pointerY16, 30, 30);
      } 
			if (j == 20) {   
				fill(255,0,0)
        pointerX20 = map(keypoint[0],0,640,0,width)
        pointerY20 = map(keypoint[1],0,480,0,height)
        ellipse(pointerX20, pointerY20, 30, 30);
      } 
			else
      if (j == 14) { 
        pointerX14 = keypoint[0];
        pointerY14 =  keypoint[1];
      } else
      if (j == 10) { 
        pointerX10 = keypoint[0];
        pointerY10 =  keypoint[1];
     }
   }
  }
}
	function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
			push()
				translate(F_x,F_y);
				if(pointerY14<pointerY16){  
					drawFlower(F_clr,F_clr_r,map(d,0,500,F_size-1.2,F_size+1.3)) 
				}else
				{rotate(frameCount/20)
					drawFlower(F_clr,F_clr_r,F_size)}
			pop()
}
	function R_draw(handX,handY){
		positionListX.push(handX) 
		positionListY.push(handY)
		clrList.push(colors[int(random(colors.length))])
		clr_r_List.push(colors_r[int(random(colors_r.length))])
		sizeList.push(random(0.5,1.5))
		let data_length = positionListX.length
		push() 
			translate(positionListX[data_length-2],positionListY[data_length-2]) 
			clr = clrList[data_length-2]
			clr_r = clr_r_List[data_length-2]
			drawFlower(clr,clr_r,sizeList[data_length-2]) 
		pop()
}