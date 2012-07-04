$(document).ready(function() {
    // Site Code...
    var parseProjectForm = function(data) {
    // Uses form data here...
    console.log(data);
    };
    $(document).bind('pageinit', function(){
        var projectForm = $("#projectForm"),
            rcerrorslink = $("#rcerrorslink");
        projectForm.validate(
        {
        //options to change behavior of validator
            invalidHandler: function(form, validator){
                //error messages
                rcerrorslink.bind();
                var html = " ";
                for(var key in validator.submitted){
                    var label = $('label[for^="'+ key +'"]').not('[generated]');
                    var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                    var fieldName = legend.length ? legend.text() : label.text();
                    html += "<li>" + fieldName + "</li>";
                };
                $("#recordCollegeErrors ul").html(html);
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
    // Style field highlight     
    $('input').focus(function(){
        $(this).addClass('curFocus');
    });

    $('input').blur(function(){
        $(this).removeClass('curFocus');
    });

    // variable defaults
   var sexValue,
       sizeValue,
       json;

    //getElementById function
    function ne (x) {
        var theElement = $(x);
        return theElement;
};

    // Create select field element and populate with options.
    var gpaRanges = ["--Choose Your GPA--","A: 4.0 - 3.5", "B: 3.4 - 2.5", "C: 2.4 - 1.5", "D: 1.4 - 1.0", "F: 0.9 - 0.0"];       
    

    //obj is the list of option values
    function obj (){
        var create = '<select id="groups">';
        for(var i = 0, j = gpaRanges.length; i < j; i++)
        {
            create += '<option value="'+gpaRanges[i]+'">'+gpaRanges[i]+'</option>';
        }
        create += '</select>';
        $('#select').append(create);
};
    obj();

    //Find Value of selected radio button
    function getSelectedRadio () {
        var radio = $('#projectForm input.sex');
        for (var i = 0, j = radio.length; i < j; i++) {
            if (radio[i].checked){
                sexValue = radio[i].val;
            };
        };
    };

//Find Value of selected checkbox
    function getCheckbox () {
        var checkbox = $('#projectForm input.pop');
        for (var i = 0, j = checkbox.length; i < j; i++) {
            if (checkbox[i].checked){
                sizeValue = checkbox[i].val;
            };
        };
    };

    function saveData (key) {
    
        // If there is no key this means this is a brand new item and we need a brand new key
        if(!key){
         
        //Gather up all form filled values and store in object.
        var id   = Math.floor(Math.random()* 10000001);
        }
        /*Remove Weird Data that creates keys for file directories
        else if(key === "A-Z" || "a-z")
        {
            //delete weird data and move on
            localStorage.removeItem(this.key);
        */
        else{
            // Set the id to the existing key that we're editing so that it will save over the data
            //The key is the same key that's been passed along from the editSubmit event handler
            //to the validate function, and then passed here, into the storeData function.
            id = key;
        };
        //Object properties contain array with the form label and input value.
        getSelectedRadio();
        getCheckbox();
        var item        = {};
            item.fname  = ["First Name:", $('fname').val];
            item.lname  = ["Last Name:", $('lname').val];
            item.email  = ["Email:", $('email').val];
            item.sex    = ["Sex:", sexValue];
            item.group  = ["Group:", $('groups').val];
            item.pop    = ["Campus Size:", sizeValue];
            item.interests =["Interests:", $('comments').val];
             
        //Save data into local storage; Use stringify to convert object to string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Information Saved!");
    };

    var submit = $("input#submit").click(function() {
        saveData();
    });

    //Auto Populate Local Storage
    function autoFillData () {
        // The actual actual JSON OBJECT data required for this to work is coming from out JSON.js file which is loaded to out HTML page.
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
        var makeDiv = $('<div></div>');
        makeDiv.attr("id", "items");
        makeDiv.attr("data-role", "content");
        makeDiv.attr("data-theme", "d");

        var makeDivPrimary = $("<div></div>");
        makeDivPrimary.attr("class", "content-primary");

        var makeList = $('<ul></ul>');
        makeList.attr("id", "one");
        makeList.attr("data-role", "listview");
        makeList.attr("data-filter", "true");
        makeList.attr("data-inset", "true");

        makeDiv.append(makeList);
        makeDivPrimary.append(makeList);
        $.body.append(makeDiv);
        $("items").style.display = "block";
        for (var i = 0, ls = localStorage.length; i < ls; i++) {
            var makeli = document.createElement('li');
            makeli.attr("id", "two");
            var linksli = document.createElement('li');
            linksLi.attr("id", "three");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert string from local storage value back to an object by using JSON.parse()
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeSubList.attr("href", "#");
            makeSubList.attr("id", "four");
            
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

    $("#displayLink").click(function(){
        autoFillData();
    });
});
