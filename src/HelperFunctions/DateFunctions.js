// gets date in NewYork format as UTC-3
// converts it to local Date by adding or subtracting hours
function getLocalDate(date) {
    // formatted based on New York timezone
    // const formatted = date + " " + "GMT-5"
    const formatted = `${date} GMT-5`

    const localDate = new Date(formatted)
    const splitted = localDate.toString().split(" ")

    // eg. 28 Feb 2022 - 08:00:00 
    return splitted[2] + " " + splitted[1] + " " + splitted[3] + " - " + splitted[4]
}
export {
    getLocalDate,
}