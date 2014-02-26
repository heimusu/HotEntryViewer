function getHotEntry() {
  return $.ajax({
    url: "http://feeds.feedburner.com/hatena/b/hotentry",
    dataType: "xml",
    success: function(data) {
      $(".feeds").empty();
      return $(data).find("item").each(function() {
        var link = $(this).find("link").text();
        var title = $(this).find("title").text();
        var hateb = "";
        $(this).children().each(function() {
          if ($(this)[0].tagName == "hatena:bookmarkcount") {
            hateb = $(this).text();
          }
        });

        $("#article-tmpl").tmpl({link: link, title: title, hateb: hateb }).appendTo(".feeds");
      });
    }
  });
};


function getLog(){
  return $.ajax({
    url:"http://feeds.feedburner.com/hatena/b/hotentry",
    dataType:"xml",
    success:function(data){
      return console.log(data);
    }
  });
};

function createTab (url){
  return chrome.tabs.create({url: url});
};


// Sort node func add to jQuery.
$.fn.eachsort = function(callback) {
    return this.each(function(){
        return $(this).html(
            $(this).children().sort(callback)
        );
    });
}

// Sort by hateb count
function sortByHatebAsc(){
  $("ul.feeds").eachsort(function(a,b){
    return +$(b).attr("data-hateb") - +$(a).attr("data-hateb");
  });
}

// Sort by hateb count
function sortByHatebDesc(){
  $("ul.feeds").eachsort(function(a,b){
    return +$(a).attr("data-hateb") - +$(b).attr("data-hateb");
  });
}

function addEvent(){

  var clickEventManager = [
    // Reload XML
    {
      "selector" : "button#reload",
      "func" : function(){ getHotEntry(); }
    },
    // Sort by hatena bookmark count asc.
    {
      "selector" : "button#hateb-sort-asc",
      "func" : function(){ sortByHatebAsc(); }
    },
    // Sort by hatena bookmark count desc.
    {
      "selector" : "button#hateb-sort-desc",
      "func" : function(){ sortByHatebDesc(); }
    },
    // Open Tab
    {
      "selector" : "ul.feeds a",
      "func" : function(){
        var url = $(this).attr("href");
        createTab(url);
      }
    }
  ];

  // Use deligate
  for( var i=0, iz = clickEventManager.length; i<iz; i++ ){
    (function(ce){
      $(document).on("click", ce.selector, ce.func );
    })(clickEventManager[i]);
  }

}


/* Process */
function processCode(){
  getLog();
  getHotEntry();

  addEvent();
}

processCode();
