function dueDateCalculator (submitDate, turnaroundTime) {

    var submitDay = submitDate[0];
    var submitHour = submitDate[1];
    var submitMinute = submitDate[2];
    var workingHourStart = 9;
    var workingHourEnd = 17;
    var workingHours = workingHourEnd-workingHourStart;
    var workingDays = [1,2,3,4,5]
    var validTime = '';
    var dueDate = ['','',''];
    
    for (var workingDayCounter = 1; workingDayCounter <= workingDays.length; workingDayCounter++) {
        if (submitDay === workingDays[workingDayCounter]) {
            if (submitHour >= workingHourStart && submitHour <= workingHourEnd) {
                if (submitHour === workingHourEnd && submitMinute > 0) {
                    validTime = false;
                } 
                else {
                    validTime = true;
                }
            }
            break;
        } else {
            validTime = false;
        } 
    }

    if (validTime === false) {
        dueDate = 'Invalid submit date!'
    }

    if (validTime) {
        
        dueDate[0] = submitDay + Math.floor(turnaroundTime / workingHours);  

        dueDate[1] = submitHour + (turnaroundTime % workingHours);
        if (dueDate[1] > workingHourEnd) {
            dueDate[1] = workingHourStart + (turnaroundTime % workingHours);
            dueDate[0]++; 
        }
        if (dueDate[1] === workingHourEnd && submitMinute > 0) {
            dueDate[1] = dueDate[1] - workingHourEnd + workingHourStart;
            dueDate[0]++; 
                
        } 
        if (dueDate[0] > workingDays[workingDays.length - 1]) {
            dueDate[0] = dueDate[0] % workingDays[workingDays.length - 1];
        }

        dueDate[2] = submitMinute;
    
        var dayNames = {
            '1' : 'Monday',
            '2' : 'Tuesday',
            '3' : 'Wednesday',
            '4' : 'Thursday',
            '5' : 'Friday'
        }

        var dayNamesObjectKeys = Object.keys(dayNames);

        for (var dayCounter = 0; dayCounter <= workingDays.length; dayCounter++) {
            if (dueDate[0] === parseInt(dayNamesObjectKeys[dayCounter])) {
                dueDate[0] = dayNames[dayCounter+1];
                break;
            }
            
        }
    }
    console.log(dueDate);
}

dueDateCalculator([new Date().getDay(), new Date().getHours(), new Date().getMinutes()], 16);
