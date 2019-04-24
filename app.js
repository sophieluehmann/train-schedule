




  // Initialize Firebase
var config = {
  apiKey: "AIzaSyDTap89S6zmxVoFPgMjPmJdv_7SOHEgiJA",
  authDomain: "train-time-e7233.firebaseapp.com",
  databaseURL: "https://train-time-e7233.firebaseio.com",
  storageBucket: "train-time-e7233.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var name = "";
var dest = "";
var startTime;
var freq;


$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    $("#tableBody").html();

    name=$("#trainName").val().trim();
    dest=$("#Destination").val().trim();
    startTime=$("#startTime").val().trim();
    freq=$("#Frequency").val().trim();

    console.log(startTime);

    database.ref().push({
        name: name,
        dest: dest,
        startTime: startTime,
        freq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
      });

})

database.ref().on("child_added", function(snapshot, prevChildKey) {

    console.log(prevChildKey);

    //var time = moment(snapshot.val().startTime);
    
    var start_time = moment(startTime, 'HH:mm a');
    var end_time = moment();
    var duration = moment.duration(end_time.diff(start_time));
    var minutes = duration.asMinutes();
    var until = freq - (minutes % freq);
    console.log(until);
    var nextArrive = end_time.add(until, 'minutes').format("HH:mm a");
    console.log(minutes);
    
    console.log(until);
    console.log(nextArrive);
    
    //var startTime=moment("12:16:59 am", "HH:mm:ss a");
    //var endTime=moment("06:12:07 pm", "HH:mm:ss a");
    //var duration = moment.duration(endTime.diff(startTime));
    //var timeSince = moment.duration(now.diff(time));
    //console.log(timeSince);
    
    var tableRow = $("<tr>");
    $("#tableBody").append(tableRow);

    var tableName = $("<td>");
    tableRow.append(tableName.text(snapshot.val().name));

    var tableDest = $("<td>");
    tableRow.append(tableDest.text(snapshot.val().dest));

    var tableFreq = $("<td>");
    tableRow.append(tableFreq.text(snapshot.val().freq));

    var tableTime = $("<td>");
    tableRow.append(tableTime.text(nextArrive));

    var tableUntil = $("<td>");
    tableRow.append(tableUntil.text(until));
    
})

