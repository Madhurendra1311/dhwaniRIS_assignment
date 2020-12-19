const ids = ['one', 'two','three', 'four']
const defaultZindex = 1
const changedZindex = 3
function myFunction(id) {
    if(id == 'five'){
       for(let i = 0; i < ids.length; i++){
        document.getElementById(ids[i]).style.zIndex = defaultZindex;
       }
    }
    else{
        let element = document.querySelector('#' + id)
        let styles = getComputedStyle(element)
        if (styles.zIndex == defaultZindex) {
            document.getElementById(id).style.zIndex = changedZindex;
        }
        else {
            document.getElementById(id).style.zIndex = defaultZindex;
        }
    }
}