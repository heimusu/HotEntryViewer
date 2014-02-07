(function(global){

  //define
  var _BROWSER = !!global.self;
  //var _NODE_JS = !!global.process;

  //interface
  function HotEntryViewer(){
    var _self = this;

    // Initialize
    this.req = null;
    this.getHotEntry();

    var button = document.getElementById("reload-button");
    button.addEventListener("click",function(){
      return _self.getHotEntry();
    }, false);

  }
  HotEntryViewer.prototype.getHotEntry = getHotEntry;
  HotEntryViewer.prototype.createTab = createTab;
  HotEntryViewer.prototype.handleResponse = handleResponse;

  //Get Hot Entry
  function getHotEntry() {
    var _self = this;
    var feedUrl = "http://feeds.feedburner.com/hatena/b/hotentry";

    this.req = new XMLHttpRequest();
    this.req.addEventListener("load", function(){
      _self.handleResponse();
    });
    // this.req.onerror = this.handleError; //ToDo
    this.req.open('GET', feedUrl, true);
    this.req.send(null);

  }

  function handleResponse(){
    var _self = this;
    var doc = this.req.responseXML;
    if (!doc) {
      //To Do
      return;
    }

    var entries = doc.getElementsByTagName('item');

    var fragment = document.createDocumentFragment();
    for (var i = 0, iz = entries.length; i < iz; i++) {
      var item = entries[i];
      var itemTitle = item.getElementsByTagName('title')[0].textContent;
      var itemLink = item.getElementsByTagName('link')[0].textContent;
      var li = fragment.appendChild(document.createElement("li"));
      var aTag = li.appendChild(document.createElement("a"));
      aTag.appendChild(document.createTextNode(itemTitle));
      aTag.href = itemLink;
      (function(node){
        node.addEventListener("click", _self.createTab);
      })(aTag);
    }

    document.getElementById("feeds").appendChild(fragment);

  }

  // Open new tab.
  function createTab(event){
    event.preventDefault();
    var url = event.target.href;
    chrome.tabs.create({url: url });
  }

  //export
  global.HotEntryViewer = HotEntryViewer;

})(this.self || global);  //this.self as window object.
