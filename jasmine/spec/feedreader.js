/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have valid URLs', function(){
            var expression = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            var regularExpressionUrl = new RegExp(expression);

            for (var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toMatch(regularExpressionUrl);
            }
         });

         it('have names', function(){
            for (var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    });


    /* TODO: Write a new test suite named "The menu" */

    describe('The Menu', function(){
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         var body; 
         var menuIconLink;

         beforeEach(function(){
            body = $('body');
            menuIconLink = $('menu-icon-link');
         });

         it('is hidden by default', function(){
            expect($(body[0]).hasClass('menu-hidden')).toBeTruthy();
         });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('becomes visible when the menu button is clicked', function(){
            $(".menu-icon-link").click();
            expect(body[0].className.indexOf('menu-hidden')).toBe(-1);
            $(".menu-icon-link").click();
            expect(body[0].className.indexOf('menu-hidden')).not.toBe(-1);
          });
    });

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    describe('Initial Entries', function(){

        beforeEach(function(done){
                loadFeed(0, function(){
                    done();
                });
        });

        it('has at least one entry in the feed container after loading the feed', function(done){
            expect($('.feed .entry')).toBeDefined();
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"*/
    
    describe('News Feed Selection', function(){
        var feed0, feed1; 
        beforeEach(function(done){
            setTimeout(function(){
                loadFeed(0, function(){
                    feed0 = $('.feed').text();
                    loadFeed(1, function(){
                        feed1 = $('.feed').text();
                        done();
                 });
            });
            }, 1);
        });

        it('content changed when the loadFeed function was called', function(done){
            console.log(feed0.localeCompare(feed1));
            expect(feed0.localeCompare(feed1)).not.toBe(0);
            done();
        })
    });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
