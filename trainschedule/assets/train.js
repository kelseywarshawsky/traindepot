        var config = {
            apiKey: "AIzaSyAnTg41Dpc6V0iFrVSKOEihYBFA5LqW1CE",
            authDomain: "trainschedule-431f2.firebaseapp.com",
            databaseURL: "https://trainschedule-431f2.firebaseio.com",
            projectId: "trainschedule-431f2",
            storageBucket: "",
            messagingSenderId: "887531661083"
        };
        firebase.initializeApp(config);
        var database = firebase.database();

        var name = "";
        var destination = "";
        var firstTime = "";
        var frequency = 0;


        $("#submit").on("click", function (event) {
            event.preventDefault();
            destination = $("#destination-input").val().trim();
            firstTime = $("#time-input").val().trim();
            frequency = $("#frequency-input").val().trim();
            name = $("#name-input").val().trim();

            database.ref().push({
                name: name,
                destination: destination,
                frequency: frequency,
                firstTime: firstTime,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        });
        database.ref().orderByChild("dateAdded").limitToLast(20).on("child_added", function (snapshot) {
            var sv = snapshot.val();
            console.log(sv.name);
            console.log(sv.destination);
            console.log(sv.frequency);
            console.log(sv.firstTime);

            var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "days");
            console.log("TIME CONVERTED: " + firstTimeConverted);

            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            var timeRemaining = diffTime % sv.frequency;
            console.log(timeRemaining);

            var minTilTrain = sv.frequency - timeRemaining;
            console.log("MINUTES TILL TRAIN: " + minTilTrain);

            var nextTrain = moment().add(minTilTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
        
            $("#nameResult-input").prepend(sv.name + "<br>");
            $("#destResult-input").prepend(sv.destination + "<br>");
            $("#freqResult-input").prepend(sv.frequency + "<br>");
            $("#minResult-input").prepend(minTilTrain + "<br>");
            $("#nextResult-input").prepend(moment(nextTrain).format("HH:mm") + "<br>");
            



        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });