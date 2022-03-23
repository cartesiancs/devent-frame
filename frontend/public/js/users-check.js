function switchValidMessage(form, boolean) {
    if (boolean) {
        form.classList.add("is-valid")
        form.classList.remove("is-invalid")
    } else {
        form.classList.add("is-invalid")
        form.classList.remove("is-valid")
    }
}

function checkId() {
    let form_id = document.querySelector("#Username");
    let pattern_spc = /[^\w]/;
    
    if (pattern_spc.test(String(form_id.value)) == true || form_id.value == '' ) {
        switchValidMessage(form_id, false)
    } else {
        switchValidMessage(form_id, true)
    }
}

function checkPassword() {
    let form_pw = document.querySelector("#Password");
    
    if (form_pw.value.length < 8) {
        switchValidMessage(form_pw, false)
    } else {
        switchValidMessage(form_pw, true)
    }
}

function checkEmail() {
    let form_email = document.querySelector("#Email");
    let patten_eml = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    
    if (patten_eml.test(String(form_email.value)) == false) {
        switchValidMessage(form_email, false)
    } else {
        switchValidMessage(form_email, true)
    }
}