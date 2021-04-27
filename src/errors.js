/**
 * Display an error message.
 * @param err A object representing the error.
 * @param msg_404 A string to dispay if the error is due to a 404 status code
 */
function showMessage(err, msg_404) {
    if (err.isAxiosError) {
        console.log(`Error occured :\nresponse status = ${err.response.status}\nError message =`, err.response.data)
        if (err.response.status == 404) {
            console.log(`\n${msg_404}\n`)
        }
    } else {
        console.log(err)
    }
}


module.exports =  {
    showMessage,
}