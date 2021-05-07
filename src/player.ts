var canvas: HTMLCanvasElement = document.getElementById('jkonsInvader')?,
context = canvas?.getContext('2d');

make_base();

function make_base()
{
  let base_image = new Image();
  base_image.src = '../img/iro.png';
  base_image.onload = function(){
    context?.drawImage(base_image, 200, 200);
  }
}