
var AbstractApiSync = {
  loadAll: function(collection, options) {
  },
  
  ticket: "",
  
  login: function(user, password) {
    this.ticket = "x";
  },
  
  logout: function(user, password) {
    this.ticket = "";
  },
  
  isLoggedIn: function() {
    return this.ticket != "";
  }
}