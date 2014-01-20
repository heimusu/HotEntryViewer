var getHotEntry;
var getLog;
var getHotEntry2;

getHotEntry = function() {
  return $.ajax({
    url: "http://feeds.feedburner.com/hatena/b/hotentry",
    dataType: "xml",
    success: function(data) {
      return $(data).find("item").each(function() {
        var title;
	var  link;
	link = $(this).find("link").text();
        title = $(this).find("title").text();
        //return $(".feeds").append("<p>" + title + "</p>");
	return $(".feeds").append("<A href = " + link + ">" + title + "</A>");
      });
    }
  });
};


getHotEntry2 = function(){
    return $.ajax({
	url: "http://feeds.feedburner.com/hatena/b/hotentry",
	dataType: "xml",
	success: function(data){
	    return $(data).find("item").each(function() {
		var  link;
		link = $(this).find("link").text();
		return $(".feeds").append("<p>" + link + "</p>");
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

getLog();

$("button").on("click",function(){
    return getHotEntry();
});

/*
$("button").on("click", function() {
  return getHotEntry();
});
*/
