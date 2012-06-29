/* Title: My First App (Assignment 4)
    Created By: Gawain Bracy II
    Date: 04/26/12
    VFW 1203
*/

$(function(){
    // Site Code

        /*function styleField (name){
         
    var field = document.getElementById(name);
    field.style.backgroundColor = "yellow";
    return field;
};
 
function unstyleField (name){
         
    var field = document.getElementById(name);
    field.style.backgroundColor = "white";
    return field;
};
*/
    
    $(document).bind('pageinit', function()
    {
        var projectForm = $("#projectForm"),
            rcerrorslink = $("#rcerrorslink");
        projectForm.validate(
        {
        //options to change behavior of validator
            invalidHandler: function(form, validator)
            {
                //error messages
                rcerrorslink.click();
                var html = " ";
                for(var key in validator.submitted){
                    var label = $('label[for^="'+ key +'"]').not('[generated]');
                    var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                    var fieldName = legend.legnth ? legend.text() : label.text();
                    html += "<li>" + fieldName + "</li>";
                };
                $("#recordcollegeerrors ul").html(html);
            },
            submitHandler: function()
            {
                //when valid form is submitted
                //store all data
                //target form
                var data = projectForm.serializeArray();
                //call function & pass data in
                parseProjectForm(data);
            }
        });
    });

    var parseProjectForm = function(data)
    {
        // uses form data here;
        console.log(data);
    };

 
// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
 
    //getElementById function
    function ne (x) {
        var theElement = document.getElementById(x);
        //var theElement = $();
        return theElement;
    };

    // Create select field element and populate with options.
    function makeElement () {
        //var formTag = document.getElementsByTagName("form"), // formTag is an array of all the form tags.
        var formTag = $("form"),
            selectLi = $("select"),
            makeSelect = $('select');
            makeSelect.setAttribute("id", "groups");
        // Populate with Options    
        for(var i = 0, j = gpaRanges.length; i < j; i++){
            //Create option for each string in array
            var makeOption = $('option');
            var optText = gpaRanges[i];
            makeOption.setAttribute("value",optText);
            // Put text somewhere
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        };
        selectLi.appendChild(makeSelect);
     }; 

     //Find Value of selected radio button
    function getSelectedRadio () {
        var radio = document.forms[0].sex,
            sexValue;
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

     //Turn nav links off / on
     function toggleControls(n){
       /* switch(n){
            case "on":
            ne("form").style.display = "none";
            ne("clear").style.display = "inline";
            ne("displayLink").style.display = "none";
            ne("addNew").style.display = "inline";
 
            break;
            case "off":
            ne("form").style.display = "block";
            ne("clear").style.display = "inline";
            ne("displayLink").style.display = "inline";
            ne("addNew").style.display = "none";
            ne("items").style.display = "none";
 
            break;
            default:
                return false;
        };*/
    };

  function saveData (key) {
        // If there is no key this means this is a brand new item and we need a brand new key
        if(!key){
         
        //Gather up all form filled values and store in object.
        var id   = Math.floor(Math.random()* 10000001);
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
        //write data from local storage to browser.
       
       /* var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        makeDiv.setAttribute("data-role", "content");
        makeDiv.setAttribute("data-theme", "d");
       */ 
        $('<div id="items" data-role="content" data-theme="d"');

        /*var makeDivPrimary = document.createElement("div");
            makeDivPrimary.setAttribute("class", "content-primary");
        */


        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        ne("items").style.display = "block";
        for (var i = 0, ls = localStorage.length; i < ls; i++) {
            var makeli = document.createElement('li');
            var linksli = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert string from local storage value back to an object by using JSON.parse()
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            getImage(obj.group[1], makeSubList);
            for(var b in obj){
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[b][0] + " " + obj[b][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksli);
            };
            makeItemLinks(localStorage.key(i), linksli); // Create our edit and delete links/buttons for each item in local storage.
        };
     }; 


});