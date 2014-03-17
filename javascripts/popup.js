var getHotEntry;
var getLog;
var createTab;

getHotEntry = function() {
  return $.ajax({
    url: "http://feeds.feedburner.com/hatena/b/hotentry",
    dataType: "xml",
    success: function(data) {
      return $(data).find("item").each(function() {
        var title=$(this).find("title").text();
        var link= $(this).find("link").text();
        var hateb="";
        $(this).children().each(function(){
            if($(this)[0].tagname === "hatena:bookmarkcount"){
              hateb = $(this).text();
            }
        });
        $("#article-tmpl").tmpl({link: link, title: title,hateb: hateb}).appendTo(".feeds");
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

createTab = function(url){
  return chrome.tabs.create({url: url});
};



$.fn.eachsort = function(callback){
  return this.each(function(){
    return $(this).html(
      $(this).children().sort(callback)
    );
  });
}

function sortByHatebAsc(){
  $("ul.feeds").eachsort(function(a,b){
    return +$(b).attr("data-hateb") - +$(a).attr("data-hateb");
  });
}

function sortByHatebDesc(){
  $("ul.feeds").eachsort(function(a,b){
    return +$(a).attr("data-hateb") - +$(b).attr("data-hateb");
  });
}

function addEvent(){

    //Reload XML
    var clickEventManager = [
    // Reload hot entry
    {
    "selector":"button#reload",
    "func":function(){getHotEntry();}
    },

    //Sort by hatena book mark asc
    {
    "selector":"button#hateb-sort-asc",
    "func":function(){sortByHatebAsc();}
    },

    //Sort by hatena book mark desc
    {
    "selector":"button#hateb-sort-desc",
    "func":function(){sortByHatebDesc();}
    },

    //Open Tab
    {
    "selector":"ul.feeds a",
    "func" : function(event){
        event.preventDefault();
        var url=$(this).attr("href");
        createTab(url);
        }
    }
    ];

    //use deligate
    for(var i=0,iz=clickEventManager.length;i<iz;i++){
      (function(cem){
          $(document).on("click",cem.selector,cem.func);
      })(clickEventManager[i]);
    }
}

/*Process*/
function processCode(){
  //Debug Counter
  var debugCount = 0;
  if(debugCount == 1){
    getLog();
  } else{
    getHotEntry();
  }
  addEvent();
}

processCode();
