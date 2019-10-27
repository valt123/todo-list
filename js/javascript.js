//Once document is loaded focus on the input field
$(document).ready(function() {
    $('#input').focus();
    isListEmpty()
});

var list = [];
//On submit click
$("#submit").click(function(){
  var toAdd = $('#input').val();

  //Focus back to input input and clear it after submit
  $('#input').focus();

  //Only add to list if input not empty
  if (toAdd != "")
  {
    list.push(toAdd + '\n'); //Adds written text to the list
  }
  listing(); //Update list
});

$("#empty").click(function(){
  list = [];
  listing();
})


//Submit if enter is pressed
$("#input").keyup(function(event){
  if(event.keyCode == 13){
    $("#submit").click();
  }
});

//Deletes element on double clicking
$(document).on('dblclick','li', function(){
  var id = $(this).attr("id");
  list.splice(id, 1); //Finds item from the list with id
  $(this).remove();
  listing(); //Update list after removal
});

//Makes the list that user sees
function listing()
{
  displayList = [] //List of items with list tags
  list.forEach(function(item, index)
  {
  //Adds <li> tags to the list item
  displayList.push('<li id="' + index + '">' + item + '</li>');
  });
  $('.list').html(displayList);
  isListEmpty();
}

//On clicking save button
$("#save").click(function(){
  var formattedList = "Tehtävä lista:" + '\n' + '\n';

  list.forEach(function(item, index)
  {
    var pos = item.indexOf("!");
    if (pos == -1)
    {
      var lineStr = "- ";
    }
    else
    {
      var lineStr = "";
      var subHeading = item.slice(1);
      item = subHeading;
    }
    //Puts list items to a string to get rid of commas
    formattedList += lineStr + item;
    console.log(formattedList)
  });

  //Saves list to a text file
  /* */
  var blob = new Blob([formattedList], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "todo.txt");
  /* */
});

//List drag and drop sorting
$(".list").sortable({
  stop: function( event, ui ) {
    var results = $(this).sortable('toArray');
    //Because sortable toArray only gives id of the element, had to do some hackeroonies
    results.forEach(function(item, index)
    {
      results[index] = list[item];
    })
    list = results;
    listing();
  }
})

//Checks if list is empty
function isListEmpty()
{
  //If list array is empty disable save and empty buttons
  if (list.length > 0)
  {
    $("#save").prop("disabled", false)
    $("#empty").prop("disabled", false)
  }
  else
  {
    $("#save").prop("disabled", true)
    $("#empty").prop("disabled", true)
  }
}
