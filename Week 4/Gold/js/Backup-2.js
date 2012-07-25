/* Gawain Bracy II
    Week 3
    05/17/12
    MiU 1205
*/
var parseCollegeForm = function(data) {
    // Uses form data here...
    console.log(data);
};

// Wait until the DOM is ready.
$(document).bind('pageinit', function(){
    var rcform = $('#recordcollege'),
        rcerrorslink = $("#rcerrorslink");
        rcform.validate({
            invalidHandler: function(form, validator) {},
                /*rcerrorslink.click();
                var html = " ";
                for(var key in validator.submitted){
                    var label = $('label[for^="'+ key +'"]').not('[generated]');
                    var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                    var fieldName = legend.legnth ? legend.text() : label.text();
                    html += "<li>" + fieldName + "</li>";
                };
                $("#recordcollegeerrors ul").html(html);
            },
            */
            submitHandler: function() {
                var data = rcform.serializeArray();
                parseCollegeForm(data);
            }
        })
});
// Style field highlight
function styleField (name){
         
    var field = document.getElementById(name);
    field.style.backgroundColor = "yellow";
    return field;
};
 
function unstyleField (name){
         
    var field = document.getElementById(name);
    field.style.backgroundColor = "white";
    return field;
};

// Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function()
{

//getElementById function
function ne (x) {
    var theElement = document.getElementById(x);
    return theElement;
};

// variable defaults
var gpaRanges = ["--Choose Your GPA--","A: 4.0 - 3.5", "B: 3.4 - 2.5", "C: 2.4 - 1.5", "D: 1.4 - 1.0", "F: 0.9 - 0.0"],
    sexValue,
    sizeValue,
    autoFillData,
    getImage,
    json,
    makeItemLinks,
    editItem,
    deleteItem,
    displayLink,
    save,
    validate,
    parseCollegeForm,
    rcform,
    errMsg = ne('errors');


// Create select field element and populate with options.
    function makeElement () {
        var formTag = document.getElementsByTagName("form"), // formTag is an array of all the form tags.
            selectLi = ne("select"),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "groups");
        for(var i = 0, j = gpaRanges.length; i < j; i++){
            var makeOption = document.createElement('option');
            var optText = gpaRanges[i];
            makeOption.setAttribute("value",optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        };
        selectLi.appendChild(makeSelect);
    };
    makeElement();

//Find Value of selected radio button
    function getSelectedRadio () {
        var radio = document.forms[0].sex;
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked){
                sexValue = radio[i].value;
            };
        };
    };

//Find Value of selected checkbox
    function getCheckbox () {
        var checkbox = document.forms[0].pop;
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked){
                sizeValue = checkbox[i].value;
            };
        };
    };

    function toggleControls(n){
        /*switch(n){
            case "on":
            ne("recordcollege").style.display = "none";
            ne("clear").style.display = "inline";
            ne("displayLink").style.display = "none";
            ne("addNew").style.display = "inline";
 
            break;
            case "off":
            ne("recordcollege").style.display = "block";
            ne("clear").style.display = "inline";
            ne("displayLink").style.display = "inline";
            ne("addNew").style.display = "none";
            ne("items").style.display = "none";
 
            break;
            default:
                return false;
        };
        */
    };
    function saveData (key) {
    
        // If there is no key this means this is a brand new item and we need a brand new key
        if(!key){
         
        //Gather up all form filled values and store in object.
        var id   = Math.floor(Math.random()* 10000001);
        }
        //Remove Weird Data that creates keys for file directories
        else if(key === "A-Z" || "a-z")
        {
            //delete weird data and move on
            localStorage.removeItem(this.key);
        }else{
            // Set the id to the existing key that we're editing so that it will save over the data
            //The key is the same key that's been passed along from the editSubmit event handler
            //to the validate function, and then passed here, into the storeData function.
            id = key;
        };
        //Object properties contain array with the form label and input value.
        getSelectedRadio();
        getCheckbox();
        var item        = {};
            item.fname  = ["First Name:", ne('fname').value];
            item.lname  = ["Last Name:", ne('lname').value];
            item.email  = ["Email:", ne('email').value];
            item.sex    = ["Sex:", sexValue];
            item.group  = ["Group:", ne('groups').value];
            item.pop    = ["Campus Size:", sizeValue];
            item.interests =["Interests:", ne('comments').value];
             
        //Save data into local storage; Use stringify to convert object to string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Information Saved!");
    };

    //Auto Populate Local Storage
    function autoFillData () {
        // The actual actual JSON OBJECT data required for this to work is coming from out JSON. js file which is loaded to out HTML page.
        // Store the JSON Object into local storage.
        for(var c in json){
            var id   = Math.floor(Math.random()* 10000001);
            localStorage.setItem(id, JSON.stringify(json[c]));
        };
    };

    function getData () {
        toggleControls("on");
        if (localStorage.length === 0) {
            alert("There is no data in Local Storage so default data was added.");
            autoFillData();
        };
        //displayLink(localStorage); // build the data to display on the list page
        $.mobile.changePage('#displaydata'); // go to page to display list
    };
        //write data from local storage to browser.
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        makeDiv.setAttribute("data-role", "content");
        makeDiv.setAttribute("data-theme", "d");

        var makeDivPrimary = document.createElement("div");
        makeDivPrimary.setAttribute("class", "content-primary");

        var makeList = document.createElement('ul');
        makeList.setAttribute("id", "one");
        makeList.setAttribute("data-role", "listview");
        makeList.setAttribute("data-filter", "true");
        makeList.setAttribute("data-inset", "true");

        makeDiv.appendChild(makeList);
        makeDivPrimary.appendChild(makeList);
        document.body.appendChild(makeDiv);
        ne("items").style.display = "block";
        for (var i = 0, ls = localStorage.length; i < ls; i++) {
            var makeli = document.createElement('li');
            makeli.setAttribute("id", "two");
            var linksli = document.createElement('li');
            linksLi.setAttribute("id", "three");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert string from local storage value back to an object by using JSON.parse()
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeSubList.setAttribute("href", "#");
            makeSubList.setAttribute("id", "four");
            
            makeli.appendChild(makeSubList);
            
            getImage(obj.group[1], makeSubList);
            for(var b in obj){
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[b][0] + " " + obj[b][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksli);
            };
            makeItemLinks(localStorage.key(i), linksli ); // Create our edit and delete links/buttons for each item in local storage.
        };
    // get the image for the right category being displayed
    function getImage (iconName, makeSubList) {
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        var setSrc = newImg.setAttribute('src', "images/icons"+ iconName +".png");
        imageLi.appendChild(newImg);
      
     };
      
    //Make Item Links
    //Create the edit and delete links for each stored item when displayed.
    function makeItemLinks (key, linksli) {
        //Edit single item link
        var editLink = document.createElement("a");
            editLink.href = '#';
        editLink.key = key;
        var editText = "Edit Information";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksli.appendChild(editLink);
 
        //Add line break
        var breakTag = document.createElement('br');
        linksli.appendChild(breakTag);
 
        var deleteLink = document.createElement('a');
            deleteLink.href = '#';
        deleteLink.key = key;
        var deleteText = "Delete Information";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = "Delete Text";
        linksli.appendChild(deleteLink);
 
    };
 
    function editItem () {
        //Grab data from our item from local storage
        var value = localStorage.getItem(this.key);
        var obj = JSON.parse(value);
 
        //show form
        //toggleControls("off");
 
        //Populate the form fields with current localStorage values.
        ne('fname').value = obj.fname[1];
        ne('lname').value = obj.lname[1];
        ne('email').value = obj.email[1];
        var radios = document.forms[0].sex;
        for(var i = 0; i < radios.length; i++){
            if (radios[i].value == "male" && obj.sex[1] == "male"){
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "female" && obj.sex[1] == "female"){
                radios[i].setAttribute("checked", "checked");
            };
        };
        ne('groups').value = obj.group[1];
 
        var check = document.forms[1].pop;
        for (var a = 0, c = check.length; i < c; i++) {
            if(check[i].value == "Small" && obj.pop[1] == "Small") {
                ne('small').setAttribute("checked", "checked");
            }else if(check[i].value == "Medium" && obj.pop[1] == "Medium") {
                ne('medium').setAttribute("checked", "checked");
            }else if(check[i].value == "Large" && obj.pop[1] == "Large") {
                ne('large').setAttribute("checked", "checked");
            };
        };
        ne('comments').value = obj.interests[1];
         // Remove the initial listener from the input 'submit' button.
        save.removeEventListener('click', saveData);
 
        // Change submit button value to edit button
        ne('submit').value = "Edit Information";
        var editSubmit = ne('submit');
        //Save the key value established in this function as a property of the editSumbit event
        //so we can use that value when we save the data we edited.
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    };
 
    function deleteItem () {
        var ask = confirm("Are you sure you want to delete thins information?");
        if (ask) {
            localStorage.removeItem(this.key);
            alert("Information successfully deleted.");
            window.location.reload();
        } else{
            alert("Information was not deleted.");
        };
    };
 
    function clearLocal () {
        if (localStorage.length === 0){
            alert("There is no data to clear.");
        }else{
            localStorage.clear();
            alert("All data is deleted.");
            window.location.reload();
            return false;
        };
    };

/*    $(document).ready(function () {
        var rcForm = $('#recordcollege');
        rcForm.validate({
            invalidHandler: function(form, validator) {},
            submitHandler: function() {
                var data = rcForm.serializeArray();
                parseCollegeForm(data);
            };
        });
*/

 
   function validate (data) {
        //Define the elements we want to check
        var getFname = ne('fname');
        var getLname = ne('lname');
        var getEmail = ne('email');
        var getGroup = ne('groups');
        var getInterests = ne('comments');
 
        // Reset error messages
        errMsg.innerHTML = " ";
        getFname.style.border = "1px solid black";
        getLname.style.border = "1px solid black";
        getEmail.style.border = "1px solid black";
        getGroup.style.border = "1px solid black";
        getInterests.style.border = "1px solid black";
         
 
        //Get Error Messages
        var messageAry = [];
         
        // First Name Validation
        if (getFname.value === ""){
            var fNameError = "Please enter a first name.";
            getFname.style.border = "1px solid red";
            messageAry.push(fNameError);
        };
 
        //Last Name Validation
        if (getLname.value === ""){
            var lNameError = "Please enter a last name.";
            getLname.style.border = "1px solid red";
            messageAry.push(lNameError);
        };
 
        //Email Validation
        var reg = /^\w+([\.]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$/;
            if(!(reg.exec(getEmail.value))){
                var emailError = "Please enter a valid email address.";
                getEmail.style.border = "1px solid red";
                messageAry.push(emailError);
        };
 
        //Gpa Validation
        if (getGroup.value === "--Choose Your GPA--"){
            var groupError = "Please select your GPA.";
            getGroup.style.border = "1px solid red";
            messageAry.push(groupError);
        };
         
        //Interests Validation
        if (getInterests.value === ""){
            var interestsError = "Please type your intrest(s).";
            getInterests.style.border = "1px solid red";
            messageAry.push(interestsError);
        };

        // If there are errors display them on screen
        if(messageAry.length >= 1){
            for (var i = 0, j = messageAry.length; i < j; i++) {
                var txt = document.createElement('li');
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            };
            data.preventDefault();
            return false;
        }else{
            //If all is ok save data. Send the key value (which came from the editData function).
            //Remember this key value was passed through the editSubmit event Listener as a property.
            saveData(this.key);
 
        };
    };

    // Submit Link & Submit Click Events
    var displayLink = ne("displayLink");
    displayLink.addEventListener("click", getData);

    var clearLink = ne("clear");
    clearLink.addEventListener("click", clearLocal);

    var save = ne("submit");
    save.addEventListener("click", saveData);
    //save.addEventListener("click", validate);
});




