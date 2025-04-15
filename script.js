
const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

 let box_x = 0;
 let box_y = 0;
  const boxWidth = 50; 
  const boxHeight = 50;

 let guitar_x = 0;
 let guitar_y = 0;
 const guitarWidth = 20;
 const guitarHeight = 20;

let punktuSkaits = 0;
// izveido mainīgo, laika skaitīšanai
let taimeris = 30;
 let apturSpeli;

 const BoxImg = new Image();
 BoxImg.src = "box.png";      

 const GuitarImg = new Image();
 GuitarImg.src = "guitar.png";  

// izveido funkciju divu zīmējumu saskarei, divi attēlu mainīgie ar x un y
 function ImagesTouching(x1, y1, boxWidth, boxHeight, x2, y2, guitarWidth, guitarHeight ) {
        
   // pārāk tālu uz sāniem viens objekts no otra
  if (x1 >= x2 + guitarWidth || x1 + boxWidth <= x2) return false;   
  // pārāk zemu vai augstu viens objekts no otra, nesaskaras 
  if (y1 >= y2 + guitarHeight || y1 + boxHeight <= y2) return false; 
  //ja neizpildās iepriekšminētie nosacījumi nav patiesi,tad
  return true;                                                    
  }

  function MyKeyDownHandler(MyEvent) {
    if (MyEvent.keyCode == 37 && box_x > 0) {
      box_x = box_x - 10;
    }
    if (MyEvent.keyCode == 39 && box_x + boxWidth < myCanvas.width) {
        box_x = box_x + 10;
    }
}
addEventListener("keydown", MyKeyDownHandler);  


function Laukums () {
    // Notīra zīmēšanas laukumu
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);                 
// tūlīt pēc canvas notīrīšanas ievieto score uzrakstu ar stilu
    ctx.fillStyle= "purple";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 0, 20);    
     // ievieto taimera uzrakstu ar tādu pašu stilu kā punktu skaita uzrakstu tikai citām y koordinātām, izmantojot metodi, kas palīdzēs mainīt laiku.
                                     
    ctx.fillText("Time Remaining: " + Math.round(taimeris), 0, 45); 
// uzraksts, kas parādīsies, kad laiks būs beidzies
    if (taimeris <= 0) {                                         
          ctx.fillStyle= "red";
          ctx.font = "bold 50px Arial";                                  
          ctx.textAlign="center";
          ctx.fillText("Game Over", myCanvas.width / 2, myCanvas.height / 2);  
         
          ctx.textAlign="left";
          // aptur spēli
          clearInterval(apturSpeli);
                return;
          }

          taimeris -= 1 / 40;

          box_y = myCanvas.height - boxHeight;

            ctx.drawImage(boxAtt, box_x, box_y, boxWidth, boxHeight);

                            
            guitar_y = guitar_y + 3;
          if (guitar_y > myCanvas.height) {                               
              guitar_y= 0;  

              guitar_x = Math.random() * (myCanvas.width - guitar.width); 
              }   
          }

    ctx.drawImage(GuitarImg, guitar_x, guitar_y);                            

    if (ImagesTouching(box_x, box_y, BoxImg, guitar_x, guitar_y, GuitarImg)) {  
        score= score + 1;                                                  
        guitar_speed = guitar + 0.5;                                 
        guitar_x= -GuitarImg.width;                                            
        }
    } 
 var score = 0;
 var guitar = 3;
 var FPS = 40;                       
 var time_remaining = 20;

 function restart_game() {
   
     time_remaining = 20;
     score = 0;
     guitar = 3;
     }

 
 function Do_a_Frame () {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);                 

    ctx.fillStyle= "purple";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 0, 20);                              

    box_y = myCanvas.height - BoxImg.height;                              
    ctx.drawImage(BoxImg, box_x, box_y);                                  
    ctx.fillText("Time Remaining: " + Math.round(time_remaining), 0, 45); 

    if (time_remaining <= 0) {                                         
          ctx.fillStyle= "red";
          ctx.font = "bold 50px Arial";                                  
          ctx.textAlign="center";
          ctx.fillText("Game Over", myCanvas.width / 2, myCanvas.height / 2);  
          ctx.font = "bold 20px Arial";
          ctx.fillText("Press S to play again", myCanvas.width / 2, (myCanvas.height / 2)+50);
          ctx.textAlign="left";
          }
    else {
          time_remaining = time_remaining - 1/FPS;                       
         guitar = guitar_y + guitar_speed;                               

          if (guitar > myCanvas.height) {                               
              guitar_y= 0;                                                
              guitar_x= Math.random() * (myCanvas.width - GuitarImg.width); 
              }   
          }

    ctx.drawImage(GuitarImg, guitar_x, guitar_y);                            

    if (ImagesTouching(box_x, box_y, BoxImg, guitar_x, guitar_y, GuitarImg)) {  
        score= score + 1;                                                  
        guitar_speed = guitar + 0.5;                                 
        guitar_x= -GuitarImg.width;                                            
        }
    } 

 setInterval(Do_a_Frame, 1000/FPS);                                        

 

                    
 myCanvas.width = window.innerWidth - 20;                           
 myCanvas.height = window.innerHeight - 20;                         
