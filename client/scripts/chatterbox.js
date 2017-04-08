// jQuery utility functions to update Chatterbox index.html
$(function() {
  app.init();
  $('.submit').on('click', function() {
    app.handleSubmit();
  });
});