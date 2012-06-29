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
});