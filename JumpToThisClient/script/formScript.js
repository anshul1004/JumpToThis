function createElemUtil(parent, id_, class_, type) {
    let parent_elem = document.getElementById(parent);
    let elem;

    switch (type) {
        case "div":
            elem = document.createElement("div");
            break;
        case "p":
            elem = document.createElement("p");
            break;
        case "button":
            elem = document.createElement("button");
            break;
        case "i":
            elem = document.createElement("i");
            break;
        case "input":
            elem = document.createElement("input");
            break;
        case "form":
            elem = document.createElement("form");
        break;
        case "label":
            elem = document.createElement("label");
        break;
        default:
            elem = document.createElement("div");
    }

    if (parent_elem != undefined) {
        parent_elem.append(elem);
    }

    elem.setAttribute("id", id_);
    elem.classList.add(class_);
    return elem;
}

var formIndex = 0;

function addCoursesForm() {
    coursesForm = document.getElementById("courses_form");
    
    if (coursesForm == undefined) {
        coursesForm = createElemUtil("container", "courses_form", "courses_form", "form");    
    }

    addCourseField(coursesForm);

    courseSubmitBtn = document.getElementById("course_submit_btn");
    
    if (courseSubmitBtn == undefined) {
        createElemUtil(coursesForm.id, "course_submit_btn", "course_submit", "input").type="submit";
    }

}

function addCourseField(coursesForm) {
    // form = createElemUtil("course_form", "courses_form", "courses_form", "form");

    formWrapper = createElemUtil(coursesForm.id, "form_wrapper", "form_wrapper", "div");

    courseInput = createElemUtil(formWrapper.id, "course_input_" + formIndex, "course_input", "div");

    ccFormInputBlock = createElemUtil(courseInput.id, "ccode_input_block_" + formIndex, "form_input_block", "div");
    ccodeLabel = createElemUtil(ccFormInputBlock.id, "ccode_label_" + formIndex, "form_input_label", "label");
    ccodeLabel.innerHTML = "Course Code";
    ccodeInput = createElemUtil(ccFormInputBlock.id, "ccode_input_" + formIndex, "form_input", "input");
    ccodeInput.type = "text";
    ccodeInput.setAttribute("maxLength", "20");
    ccodeInput.required = true;
    ccodeInput.placeholder = "Course code";

    tseatsFormInputBlock = createElemUtil(courseInput.id, "tseats_input_block_"+ formIndex, "form_input_block", "div");
    tseatsLabel = createElemUtil(tseatsFormInputBlock.id, "tseats_label_" + formIndex, "form_input_label", "label");
    tseatsLabel.innerHTML = "Total Seats";
    tseatsInput = createElemUtil(tseatsFormInputBlock.id, "tseats_input_" + formIndex, "form_input", "input");
    tseatsInput.setAttribute("maxLength", "3");
    tseatsInput.setAttribute("min", "0");
    tseatsInput.setAttribute("max", "3");
    tseatsInput.setAttribute("type", "number");
    tseatsInput.setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
    tseatsInput.required = true;
    tseatsInput.placeholder = "Total seats";

    cseatsFormInputBlock = createElemUtil(courseInput.id, "cseats_input_block_"+ formIndex, "form_input_block", "div");
    cseatsLabel = createElemUtil(cseatsFormInputBlock.id, "cseats_label_" + formIndex, "form_input_label", "label");
    cseatsLabel.innerHTML = "Current Availbale Seats";
    cseatsInput = createElemUtil(cseatsFormInputBlock.id, "cseats_input_" + formIndex, "form_input", "input");
    cseatsInput.setAttribute("maxLength", "3");
    cseatsInput.setAttribute("min", "0");
    cseatsInput.setAttribute("max", "3");
    cseatsInput.setAttribute("type", "number");
    cseatsInput.setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
    cseatsInput.required = true;
    cseatsInput.placeholder = "Current seats";

    colBtn = createElemUtil(courseInput.id, "col_btn" + formIndex, "collapsible", "button");
    colBtn.setAttribute("onClick", "toggleMoreDetails(this.id)");
    colBtn.type = "button";
    colBtn.innerHTML = "Add More Details";
    
    colBtnCntnt = createElemUtil(courseInput.id, "col_btn_cntnt" + formIndex, "content", "div");

    cnameFormInputBlock = createElemUtil(colBtnCntnt.id, "cname_input_block_"+ formIndex, "form_input_block", "div");
    cnameLabel = createElemUtil(cnameFormInputBlock.id, "cname_label_" + formIndex, "form_input_label", "label");
    cnameLabel.innerHTML = "Course Name";
    cnameInput = createElemUtil(cnameFormInputBlock.id, "cname_input_" + formIndex, "form_input", "input");
    cnameInput.type = "text";
    cnameInput.placeholder = "Course name";
    cnameInput.maxlength = "50";

    inameFormInputBlock = createElemUtil(colBtnCntnt.id, "iname_input_block_"+ formIndex, "form_input_block", "div");
    inameLabel = createElemUtil(inameFormInputBlock.id, "iname_label_" + formIndex, "form_input_label", "label");
    inameLabel.innerHTML = "Instructer Name";
    inameInput = createElemUtil(inameFormInputBlock.id, "iname_input_" + formIndex, "form_input", "input");
    inameInput.type = "text";
    inameInput.placeholder = "Instructer";
    inameInput.maxlength = "50";
    
    scheduleForm = createElemUtil(colBtnCntnt.id, "schedule_form_"+ formIndex, "schedule_form", "div");

    let days = ["M", "T", "W", "TH", "F", "S"];
    for (var i =0 ;i <days.length ; i++) {
        scheduleInputBlock = createElemUtil(scheduleForm.id, "schedule_input_block_"+ days[i] + "_" + formIndex, "schedule_input_block", "div");
        dayInputBlock = createElemUtil(scheduleInputBlock.id, "day_input_block_"+ days[i] + "_" + formIndex, "day_input_block", "div");
        createElemUtil(dayInputBlock.id, "day_input_txt"+ days[i] + "_" + formIndex, "day_input_txt", "p").innerHTML = days[i];
        createElemUtil(dayInputBlock.id, "day_input"+ days[i] + "_" + formIndex, "day_input", "input").type = "checkbox";
        dayTimeInput = createElemUtil(scheduleInputBlock.id, "day_time_input_"+ days[i] + "_" + formIndex, "day_time_input", "input");
        dayTimeInput.type = "text";
        dayTimeInput.setAttribute("placeholder", "HHMM-HHMM");
        dayTimeInput.setAttribute("maxlength", "9");
    }

    formIndex++;

    // createElemUtil(form.id, "course_submit_btn", "course_submit", "input").type="submit";

}

function toggleMoreDetails (id) {
    elem = document.getElementById(id);
    elem.classList.toggle("active");
    var content = elem.nextElementSibling;
    if (content.style.display === "flex") {
        content.style.display = "none";
    } else {
        content.style.display = "flex";
    }
}

// addCoursesForm();