/**
 * kSearchHint
 * 
 * Displays hints for search string
 * 
 * requires jQuery JavaScript Library >= v1.3.2
 * 
 * copyright (c) 2011-2012 Kopolo
 * http://kopolo.ru/ 
 * @author: Andrey Kondratev andr@kopolo.ru
 * 
 * Dual licensed under MIT and GPL 2+ licenses
 * https://github.com/andruhon/kSearchHint
 */

(function(jQuery){
    
    kSearchHintVersion = '1.0.1';
    
    /*Class*/
    kSearchHint = function(user_options) {
        
        /*Default parameters*/
        var defaults = {
              /**
                 * Processing INPIT element
                 * var string | object
                 */
                input: false,
                
              /**
                 * Request url
                 * var string
                 */
                url: '/search/',
                    
              /**
                 * Name of request variable
                 * var string
                 */
                textName: 'name',
                
              /**
                 * Name of result text value
                 * request should contain array or object with strings if null
                 * var string
                 */
                valueName: null,
                
              /**
                 * Request type post or get
                 * var string - POST|GET
                 */
                requestType: 'POST',
                
              /**
                 * CSS class for hints wrapper
                 * container will be positioned relatively to the wrapper
                 * var string
                 */
                hintWrapperClass: 'hintWrapper',
                    
              /**
                 * CSS class for hints container
                 * container is the wrapper's only child
                 * var string
                 */
                hintContainerClass: 'hintContainer',
                
              /**
                 * CSS class for hint item
                 * var string
                 */
                hintItemClass: 'hintItem',
                
              /**
                 * CSS class for hovered hint item
                 * var string
                 */
                hintItemHoverClass: 'hintItemHovered',
                
              /**
                 * CSS class for hints spinner
                 * var string
                 */
                spinnerClass: 'hintsSpinner',
                
              /**
                 * Ability for selecting hints with up/down arrows on keyboard
                 */
                keyboardControl: true,
                
              /**
                 * prevent submitting form, when one hint is selected
                 * - just set hint text as INPUT value
                 */
                preventFormSubmit: false,
                
              /**
                 * Hide hints, when INPUT lost focus (blur)
                 * var boolean
                 */
                hideHintsOnBlur: true,
                
              /**
                 * Reload hints, when INPUT got focus
                 */
                reloadOnFocus: false,
                
              /**
                 * Display spinner, while hints are loading
                 * var boolean
                 */
                displaySpinner: true,
                
              /**
                 * Message displayed, when the search didn't return any results
                 * Display nothing if FALSE
                 * var boolean|string
                 */
                notFoundMessage: false,
                
              /**
                 * Timeout before the hint is shown, ms
                 * var integer
                 */
                hintTimeout: 500,
                
              /**
                 * Timeout before the hint is hidden, ms
                 * var integer
                 */
                hideTimeout: 2000,
                
              /**
                 * Timeout before the hint is hidden after scrolling or hovering results container, ms
                 * var integer
                 */
                hideAfterScrollTimeout: 4000,
                
              /**
                 * Minimal string length for hints
                 * var integer
                 */
                minStringLength: 2,
                
              /**
                 * A string or number (ms) determining how long the animation will run.
                 * var integer|string
                 */
                fadeInDuration: 200,
                
              /**
                 * A string or number (ms) determining how long the animation will run.
                 * var integer|string
                 */
                fadeOutDuration: 400,
                
              /**
                 * function to preprocess request before sending it to server
                 * for example:
                 * function(value) {return value.replace(/"/m, '&#34;');}
                 * var function
                 */
                preProcessRequest: false,
                
              /**
                 * function to preprocess selected hint
                 * for example:
                 * function(index,value) {GLOBAL_selected_index = index; return value;}
                 * var function
                 */
                preProcessSelected: false
        };
        
       /**
         * Link to kSearchHint itself ( like "this" operator)
         * available anywhere in the jQuery wrapper
         * returned by kSearchHint
         */
        var instance = {};
        
       /**
         * Options after megring defaults and user options
         * var object
         */
        var options;

       /**
         * jQuery.element of processing INPUT
         * var object
         */
        instance.hintInput;
        
       /**
         * jQuery.element of hints container
         * wrapper's only child
         * var object
         */
        instance.hintContainer;
        
       /**
         * jQuery.element of hints wrapper
         * container will be positioned relatively to it
         * var object
         */
        instance.hintWrapper;
        
       /**
         * Blur timer, sets FALSE if INPTUT is in focus again
         * var boolean|timer
         */
        instance.blurTimer = false;
        
       /**
         * Display timer
         * var boolean|timer
         */
        instance.displayTimer = false;

        
       /**
         * Merging of defaults and user options
         * @param object user_options
         */
        function setOptions(user_options) {
            if (jQuery.type(user_options)==='string') {
                /*if options is string then assume it's INPUT's CSS selector*/
                options = jQuery.extend({}, defaults, options);
                options.input = user_options;
            } else {
                options = jQuery.extend({}, defaults, options, user_options);
            }
        };
        
       /**
         * Initialization of the main elements
         */
        instance.init = function () {
            instance.input = jQuery(options.input);
            
            /*creating wrapper*/
            instance.hintWrapper = jQuery('<div></div>').insertAfter(instance.input);
            instance.hintWrapper.addClass(options.hintWrapperClass);
            
            /*creating container*/
            instance.hintContainer = jQuery('<ul></ul>').appendTo(instance.hintWrapper);
            instance.hintContainer.addClass(options.hintContainerClass);
            instance.hintContainer.hide();
            
            instance.initTyping();
            
            instance.initBlurEvents();
            
            if (options.keyboardControl==true) {
                instance.initKeyboardControls();
            }
        };
        
       /**
         * Initialization of typing events
         */
        instance.initTyping = function()
        {
            instance.input.keyup(function(event){
                /*not control buttons*/
                if (
                    event.keyCode!='40' &&
                    event.keyCode!='38' &&
                    event.keyCode!='12' &&
                    event.keyCode!='37' &&
                    event.keyCode!='39' &&
                    event.keyCode!='13'
                ) {
                    if (instance.displayTimer != false) {
                        clearTimeout(instance.displayTimer);
                    }
                    
                    instance.displayTimer = setTimeout(function(){ 
                        var value = jQuery(instance.input).val();
                        instance.getHints(value,function(data){instance.showHints(data);});
                    }, options.hintTimeout);
                }
            });
        };
        
       /**
         * Gets hints 
         * @param string value - processed text
         * @param function onSuccess - function called when jQuery.ajax success event is fired
         */
        instance.getHints = function(value,onSuccess)
        {
            if (value.length >= options.minStringLength) {
                if (options.displaySpinner==true) {
                    /*loading indicator*/
                    if (instance.hintContainer.find('.'+options.spinnerClass).length==0){
                        var spinner = jQuery('<li></li>').prependTo(instance.hintContainer);
                        spinner.addClass(options.spinnerClass);
                        instance.hintContainer.fadeIn(options.fadeInDuration);
                    }
                }
                var params = {};
                params[options.textName] = value; /*parameters that sent to the server*/
                if (options.preProcessRequest) {
                    params = options.preProcessRequest(value);
                }
                jQuery.ajax({
                    url: options.url,
                    data: params,
                    type: options.requestType,
                    dataType: 'json',
                    success: function(data,textStatus){
                        if (textStatus == 'success') {
                            onSuccess(data);
                        };
                    }
                });
            } else {
                /*Hide hints if deleted too many letters from INPUT*/
                instance.hintContainer.fadeOut(options.fadeOutDuration);
            };
        };
        
       /**
         * Displays block with hints
         * @param array data - simple not indexed array with hint texts
         */
        instance.showHints = function(data)
        {
            instance.hintContainer.html('');
            if (data.length>0 || Object.keys(data).length>0) {
                /*found something*/
                jQuery.each(data,function(hintIndex,hintValue){
                    instance.addHintItem(hintIndex, hintValue);
                });
                instance.fadeInHints();
            } else {
                /*found nothing*/
                if (options.notFoundMessage != false) {
                    instance.hintContainer.html('');
                    var nothing = jQuery('<li></li>').appendTo(instance.hintContainer);
                    nothing.html(options.notFoundMessage);
                } else {
                    /*do nothing*/
                }
            }
        };
        
       /**
         * Adds one hint item 
         * @param string - hint text
         */
        instance.addHintItem = function(hintIndex, hintValue)
        {
            var hintItem = jQuery('<li></li>');
            hintItem.addClass(options.hintItemClass);
            if (options.valueName) {
                hintItem.html(hintValue[options.valueName]);
            } else {
                hintItem.html(hintValue);
            }
            hintItem.data('index',hintIndex);
            hintItem.appendTo(instance.hintContainer);
            
            hintItem.click(function(){
               instance.setHintToInput();
               if (options.preventFormSubmit==false) {
                   instance.input.parentsUntil('form').last().parent().submit();
               };
            });
            
            hintItem.hover(function(){
                instance.hintContainer.find('.'+options.hintItemHoverClass).removeClass(options.hintItemHoverClass);
                $(this).addClass(options.hintItemHoverClass);
            },function(){
                instance.hintContainer.find('.'+options.hintItemHoverClass).removeClass(options.hintItemHoverClass);
                $(this).removeClass(options.hintItemHoverClass);
            });
        };
        
       /**
         * Initialization of blur and focus events
         */
        instance.initBlurEvents = function()
        {
            if (options.hideHintsOnBlur == true) {
                instance.input.blur(function(){
                    instance.fadeOutHints(options.hideTimeout);
                });
                instance.input.focus(function(){
                    var value = jQuery(instance.input).val();
                    if (value.length >= options.minStringLength) {
                        instance.fadeInHints();
                    };
                });
                instance.hintContainer.scroll(function(){
                    if (instance.blurTimer!=false){
                        instance.fadeOutHints(options.hideAfterScrollTimeout);
                    };
                });
                instance.hintContainer.mousemove(function(){
                    if (instance.blurTimer!=false){
                        instance.fadeOutHints(options.hideAfterScrollTimeout);
                    }
                });
            }
            if (options.reloadOnFocus == true) {
                instance.input.focus(function(){
                    var value = jQuery(instance.input).val();
                    instance.getHints(value,function(data){instance.showHints(data);});
                });
            };
        };
        
       /**
         * Hides hints with delay
         * calling this method second time will reset timer to {delay}
         * @param integer delay - in milliseconds
         */
        instance.fadeOutHints = function(delay)
        {
            if (instance.blurTimer!=false){
                clearTimeout(instance.blurTimer);
                instance.blurTimer = false;
            };
            instance.blurTimer = setTimeout(function(){
                instance.hintContainer.fadeOut(options.fadeOutDuration);
            },delay);
        };
        
       /**
         * Shows hints
         */
        instance.fadeInHints = function()
        {
            if (instance.blurTimer!=false){
                clearTimeout(instance.blurTimer);
                instance.blurTimer = false;
            };
            instance.hintContainer.fadeIn(options.fadeInDuration,function(){
                var windowHeight = $(window).height();
                instance.hintContainer.css({
                    'height': 'auto',
                });                
                if (instance.hintContainer.height()>300 && instance.hintContainer.height() > windowHeight*0.7) {
                    instance.hintContainer.height(windowHeight*0.7);
                    instance.hintContainer.css({
                        'height': windowHeight*0.7,
                        'overflow': 'auto'
                    });
                }
            });
        };
        
       /**
         * Initialization of keyboard controls
         * arrows and enter
         */
        instance.initKeyboardControls = function()
        {
            instance.input.keydown(function(event){
                /*down arrow*/
                if (event.keyCode=='40') {
                    instance.nextHintItem();
                }
                /*up arrow*/
                if (event.keyCode=='38') {
                    instance.prevHintItem();
                }
                /*left arrow - selects currently selected(hovered) hint*/
                if (event.keyCode=='39') {
                    instance.setHintToInput();
                }
                /*right arrow - deselect selected input*/
                if (event.keyCode=='37') {
                    instance.hintContainer.find('.'+options.hintItemHoverClass).removeClass(options.hintItemHoverClass);
                }
                /*enter*/
                if (event.keyCode=='13') {
                    instance.setHintToInput();
                    if (options.preventFormSubmit==true) {
                        event.preventDefault();
                    };
                }
                /*enter - Some browsers like opera fires keypress event*/
                instance.input.keypress(function(event){
                    if (event.keyCode=='13' && options.preventFormSubmit==true) {
                        event.preventDefault();
                    }
                });
            });
        };
        
       /**
         * Selects the next hint if one is selected
         * Selects first hint if no hint is selected
         * keyboard down arrow
         */
        instance.nextHintItem = function()
        {
            var nextHint = instance.hintContainer.find('.'+options.hintItemHoverClass).next();
            if (nextHint.length==0) {
                nextHint = instance.hintContainer.find('.'+options.hintItemClass).first();
            }
            instance.hintContainer.find('.'+options.hintItemHoverClass).removeClass(options.hintItemHoverClass);
            nextHint.addClass(options.hintItemHoverClass);
        };
        
       /**
         * Selects the previous hint if one is selected
         * Selects the last hint if no hint is selected
         * keyboard up arrow
         */
        instance.prevHintItem = function()
        {
            var currentHint = instance.hintContainer.find('.'+options.hintItemHoverClass);
            if (currentHint.length==0) {
                var prevHint = instance.hintContainer.find('.'+options.hintItemClass).last();
            } else {
                var prevHint = instance.hintContainer.find('.'+options.hintItemHoverClass).prev();
            }
            instance.hintContainer.find('.'+options.hintItemHoverClass).removeClass(options.hintItemHoverClass);
            if (prevHint.length!=0) {
                prevHint.addClass(options.hintItemHoverClass);
            }
        };
        
       /**
         * Sets selected hint text to INPUT value
         * - for keyboard manipulation
         */
        instance.setHintToInput = function()
        {
            var selectedHint = instance.hintContainer.find('.'+options.hintItemHoverClass);
            if (selectedHint.length>0) {
                var value = selectedHint.text();
                var index = selectedHint.data('index');
                if (options.preProcessSelected) {
                    value = options.preProcessSelected(index, value);
                }
                instance.input.val(value);
                instance.fadeOutHints(2);
            }
        };
        
       /**
         * Constructor
         */
        {
            setOptions(user_options);
            if (options.input!=false) {
                instance.init();
            } else {
                /*do nothing if INPUT (options.input) is not defined*/
            };
            return instance;
        };
        
    };
    
})(jQuery);