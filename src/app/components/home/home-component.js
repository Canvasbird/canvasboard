const experience = [
    {
      img: "../../../assets/home/blocks.png"
    },
    {
      img: "../../../assets/home/slider_img2.png"
    },
    {
      img: "../../../assets/home/slider_img3.png"
    }
  ];
  
  let currentItem = 0;
  
  const img = document.getElementById('image');
  
  window.addEventListener('DOMContentLoaded', function () {
    showExperience();
  })
  
  function showExperience() {
    setInterval(function () {
      if (currentItem === experience.length) {
        currentItem = 0;
      }
        const item = experience[currentItem];
        img.src = item.img;
        currentItem++;
        
      }, 3000);
  }
  