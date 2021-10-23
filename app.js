const links = document.querySelectorAll('.data-changer');
const timeDivs = document.querySelectorAll('.time-div');


let stats;
async function getUserData(){
  const data = await fetch('data.json');
  const userData = await data.json();
  return userData;
}
getUserData().then(data => stats = data);


links.forEach(link => {
  link.addEventListener('click', (e) => {
    links.forEach(x => {
      x.classList.remove('active');
    });
    e.target.classList.add('active');
    let timespan = e.target.getAttribute('data-id');
    let previous = timespan == 'daily' ? 'Yesterday' : timespan == 'weekly' ? 'Last Week': 'Last Month';
    stats.forEach(stat => {
      timeDivs.forEach(time => {
        if(stat.title.toLowerCase() == time.getAttribute('data-id')){
          // console.log(stat.timeframes[timespan].current);
          let currentTime = stat.timeframes[timespan].current;
          let lastTime = stat.timeframes[timespan].previous;
          let hrC = currentTime === 1 ? 'hr':'hrs' ;
          let hrP = lastTime === 1 ? 'hr':'hrs' ;
          time.innerHTML = `
          <div class="activity-div">
          ${stat.title}
          <img src="/images/icon-ellipsis.svg" alt="">
          </div>
          <h2 class="time-taken"> ${currentTime}${hrC}</h2>
          <p class="previous-time">${previous} - ${lastTime}${hrP}</p>
          `;

        }
      })
    })
  })
})

function showStats(timeframe){

}