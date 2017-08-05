$('#login').click(function() {

    // Creates the greetr object
    var loginGrtr = G$('John', 'Doe');

    // Hides the UI
    $('#logindiv').hide();

    // Chainable methods
    // Sets language, then appends greeting based on laguage to html greeting element, then finally logs output to console. All chained!
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});