(function(global, $) {

    // 'new' an object
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    // Hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'es'];

    // Informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    // Formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    // Logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    }

    // Prototype holds methods (to save memory space)
    // Adding functionality to the Greetr objects
    Greetr.prototype = {

        // 'this' refers to the calling object at execution time
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },


        // Checks that the language provided is valid
        // References the externally inaccesible 'supportedLangs' within the closure
        validate: function() {
            if(supportedLangs.indexOf(this.language) === -1) {
                throw "this language is not supported"
            }
        },

        // Retrieve messages from object by referring to properties using '[]' syntax
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName  + '!';
        },

        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        // Chainable methods returning their own containing object
        greet: function(formal) {
            var msg;

            // If undefined or null, it will be coerced into false
            if(formal) {
                msg = this.formalGreeting();
            }

            else {
                msg = this.greeting();
            }
            if(console) {
                console.log(msg);
            }

            //'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
            
        },

        log: function() {
            if(console) {
                console.log(logMessages[this.language] + ':' + this.fullName());
            }

            // Make chainable
            return this;
        },

        setLang: function(lang) {
            // Set the language
            this.language = lang;
           
            // Validate
            this.validate();

            // Make chainable
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            // Check if jQuery loaded and if selector is provided
            if(!$) {
                throw 'jQuery not loaded';
            }

            if(!selector) {
                throw 'Missing jQuery selector'
            }

            // Determine the message
            var msg;
            if(formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            // Inject the message in the chosen place in the DOM
            $(selector).html(msg);

            // Make chainable
            return this;
        }
    };

    // The actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstName, lastName, language) {

        var self = this;

        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();
    }

    // Trick borrowed from jQuery so we don't have tp use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // Attach our Greetr to the global object, and provide a shorthand '$G' to ease our poor fingers
    global.Greetr = global.G$ = Greetr;

})(window, jQuery); 