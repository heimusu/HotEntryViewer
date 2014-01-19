var getHotEntry;
var getLog;


getHotEntry = function() {
  return $.ajax({
    url: "http://feeds.feedburner.com/hatena/b/hotentry",
    dataType: "xml",
    success: function(data) {
      return $(data).find("item").each(function() {
        var title;
        title = $(this).find("title").text();
        return $(".feeds").append("<p>" + title + "</p>");
      });
    }
  });
};

getLog = function(){
    return $.ajax({
	url:"http://feeds.feedburner.com/hatena/b/hotentry",
	dataType:"xml",
	success:function(data){
	    return console.log(data);
	}
    });
};

$("button").on("click",function(){
    return getLog();
});

/*
$("button").on("click", function() {
  return getHotEntry();
});
*/
