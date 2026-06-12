const roll = Math.floor(Math.random() * 32);

const headerImage = document.getElementById("HeadImg");
if(roll == 0){
    headerImage.src = "Images/GroenTim.png"
} else{
    headerImage.src = "Images/ZwartTim.png"
}