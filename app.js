




  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDTap89S6zmxVoFPgMjPmJdv_7SOHEgiJA",
    authDomain: "train-time-e7233.firebaseapp.com",
    databaseURL: "https://train-time-e7233.firebaseio.com",
    projectId: "train-time-e7233",
    storageBucket: "train-time-e7233.appspot.com",
    messagingSenderId: "303131132155"
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
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

})

database.ref().on("child_added", function(snapshot, prevChildKey) {

    console.log(prevChildKey);

    var date = moment(snapshot.val().startDate);
    //var monthWorked = Math.abs(date.diff(moment(),"months"));

    var tableRow = $("<tr>");
    $("#tableBody").append(tableRow);

    var tableName = $("<td>");
    tableRow.append(tableName.text(snapshot.val().name));

    var tableRole = $("<td>");
    tableRow.append(tableRole.text(snapshot.val().dest));

    var tableDate = $("<td>");
    tableRow.append(tableDate.text(snapshot.val().startTime));

    //var tableWork = $("<td>");
    //tableRow.append(tableWork.text(monthWorked));

    var tableRate = $("<td>");
    tableRow.append(tableRate.text(snapshot.val().freq));

   //var tableBill = $("<td>");
    //tableRow.append(tableBill.text(monthWorked*snapshot.val().rate));

    console.log(snapshot.val());
    console.log(snapshot.val().name)
    
})

