var list = [];
$("#submit").click(
function(){
  var toAdd = $('input[name=Test]').val();
  list.push(toAdd + '\n');
  //console.log(list)
  listing();
});

function listing()
{
  _list = []
  list.forEach(function(item, index, array) {
  _list.push('<li>' + item + '</li>');
  });
  $('.list').html(_list);
}

$("#save").click(
function(){
  var formattedList = "";
  list.forEach(function(item, index, array) {
    formattedList += "- " + item;
  });
  //console.log(formattedList)

  var blob = new Blob([formattedList], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "todo.txt");

});
