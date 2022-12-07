export function showCurrentDate() {
    let currentDate = new Date();
    let dateFormatted = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
  
    ShowCurrentTime(dateFormatted)
    refresh()
}

function ShowCurrentTime(date) {
    let currentDate = new Date();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    let second = currentDate.getSeconds();
   
    document.querySelector('#time').innerHTML = `Data: ${date} - Hora: ${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;
}
function fixZero(time) {
    return time < 10 ? `0${time}` : time;
}
function refresh(){
    setInterval(showCurrentDate, 1000)
}

