var getHotEntry;
var getLog;
var createTab;

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
        $("#article-tmpl").tmpl({link: link, title: title}).appendTo(".feeds");
        $("a:last").on("click", createTab);
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

createTab = function(event){
  event.preventDefault();
  var $target = $(event.target);
  return chrome.tabs.create({url: $target.attr("href")});
};


/*実行部*/
getLog();

$("button").on("click",function(){
  return getHotEntry();
});

/*
$("button").on("click", function() {
  return getHotEntry();
});
*/
