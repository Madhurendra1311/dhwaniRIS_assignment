const defaultZindex = 1
const changedZindex = 3
function myFunction(id) {
    var element = document.querySelector('#' + id)
    var styles = getComputedStyle(element)
    if (styles.zIndex == defaultZindex) {
        document.getElementById(id).style.zIndex = changedZindex;
    }
    else {
        document.getElementById(id).style.zIndex = defaultZindex;
    }
}