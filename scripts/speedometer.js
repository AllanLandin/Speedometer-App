const speedElem = document.querySelector("#speed");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
let watchID = null
let currentRide = null

startBtn.addEventListener("click", handleStart);
stopBtn.addEventListener("click", handleStop);

function handleStart(){
    if (watchID)
        return
    
    let options = {enableHighAccuracy: true}

    currentRide = createNewRide();
    watchID = navigator.geolocation.watchPosition(handleSuccess, handleError, options)

    startBtn.classList.add("d-none");
    stopBtn.classList.remove("d-none");

    function handleSuccess(position){
        addPosition(currentRide, position)
        let speed = position.coords.speed?
        (position.coords.speed * 3.6).toFixed(1): 0;
        speedElem.innerHTML= speed
    }
    function handleError(error){
        console.log(error)
    }
    
}
function handleStop(){
    if (!watchID)
        return
    navigator.geolocation.clearWatch(watchID)
    updateStopTime(currentRide)
    watchID = null
    currentRide = null
    startBtn.classList.remove("d-none");
    stopBtn.classList.add("d-none");
    speedElem.innerHTML = 0
    location.href = "index.html"
}

