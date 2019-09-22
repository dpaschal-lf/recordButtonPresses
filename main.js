var sequence = [];

var previousTime = null;
var recording = false;

$(document).ready( startUp );

function startUp(){
    addEventHandlers();
}

function addEventHandlers(){
    $("#display").click( addBeat );
    $("#play").click( startPlayback );
    $("#resetRecord").click( toggleRecording);
}

function addBeat(){
    if(!recording){
        return;
    }
    var now = Math.floor(window.performance.now());
    var timeOffset = now - previousTime;
    console.log('offset: '+timeOffset);
    previousTime = now;
    sequence.push(timeOffset);
}
function toggleRecording(){
    recording=!recording;
    if(recording){
        sequence = [];
        previousTime = Math.floor(window.performance.now());
    }
    $("#resetRecord").text( recording ? 'recording' : 'stopped' );
}

function startPlayback(){
    var currentSequence = sequence.slice();
    function playBeat(){
        
        currentSequence.shift();
        console.log('firing', currentSequence.length);
        pulseDisplay();
        if(currentSequence.length){
            setTimeout( playBeat, currentSequence[0]);  
        }
    }
    setTimeout( playBeat, currentSequence[0])
}

function pulseDisplay(){
    $("#display").addClass('active');
    setTimeout(function(){
        $("#display").removeClass('active');
    }, 30);
}