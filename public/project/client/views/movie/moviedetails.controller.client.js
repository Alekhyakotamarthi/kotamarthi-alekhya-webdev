/**
 * Created by Alekhya on 12/1/2016.
 */
(function () {
    angular
        .module("MovieApp")
        .controller("MovieDetailsController", MovieDetailsController);

    function MovieDetailsController(UserService,MovieService,$routeParams,$sce) {
        console.log("in controller");
                 var vm =this;
                    vm.RateMovie = RateMovie;
        function init() {
            var imdbID = $routeParams.mid;

                      vm.uid = $routeParams.uid;

            vm.title = $routeParams.title;


                getMovieInfo(imdbID);
                getUnamefromId(vm.uid);
            //LoggedinUser();


        }
        init();

        function getUnamefromId(userId){

            UserService
                .findUserById(userId)
                .then(function (response) {
                    var User = response.data;
                    if(User._id){
                        vm.userName = User.username;
                    }else{
                        vm.error = "unable to add review";
                    }
                });



        }

        function LoggedinUser(){

            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }

        }



      function RateMovie(rating)  {
        console.log(vm.uid);
          console.log(vm.userName);
          console.log(rating);

          var imageUrl = "https://image.tmdb.org/t/p/w130/"+ movie.poster_path;

          var usergivenrating = {
              name : movie.title,
              tmdbId : tmdbId,
              rating : parseInt(rating),
              imageUrl : imageUrl
          };
          var usergivenreview = {
              name: movie.title,
              tmdbId : tmdbId,
              review : reviewtext,
              imageUrl : imageUrl
          };
          var userrateandreview ={
              rating : usergivenrating,
              review : usergivenreview
          };

          var ratings = {
              userId :userId,
              username: userName,
              value : parseInt(rating)
          };

          var reviews = {
              userId : userId,
              username: userName,
              text : reviewtext,
              visible : "true",
              flagged : "false"

          };

          var ratingsandreviews = {
              ratings : ratings,
              reviews : reviews
          };

          var movie ={
              tmdbId : tmdbId,
              title: movie.title,
              imageUrl : imageUrl,
              ratings : [ratings],
              reviews : [reviews]

          };

          UserService
              .submitRatingReview(userId,rateandreview)
              .then(function (response) {
                  var i = 1;
              });


          /*
          MovieService
              .findMovieById(tmdbId)
              .then(function (response) {
                  var returnedmovie = response.data;
                  if (returnedmovie.tmdbId) {
                      MovieService
                          .updateRatingAndReview(tmdbId, ratingsandreviews)
                          .then(function (response) {
                              var addedObject = response.data;
                              if (addedObject) {
                                  $location.url("/movie/" + tmdbId);
                              } else {
                                  vm.error = "unable to add review";
                              }
                          });
                  } else {
                      MovieService
                          .createMovie(movie)
                          .then(function (response) {
                              var addedObject = response.data;
                              if (addedObject) {
                                  $location.url("/movie/" + tmdbId);
                              } else {
                                  vm.error = "unable to add new Movie Object";
                              }
                          });
                  }

              });
              */
      }

      function getMovieInfo(imdbID){
          MovieService.searchMovieByID(imdbID)
              .success(function(response){
                  console.log()
                  if (response.videos.results.length > 0) {
                      var embedUrl = 'https://www.youtube.com/embed/';
                      response.video_path = $sce.trustAsResourceUrl(embedUrl + response.videos.results[0].key);
                      response.untrusted_video_url = embedUrl + response.videos.results[0].key;
                  }
                  response.credits.cast.splice(8, response.credits.cast.length - 8);
                  vm.movie = response;

              });
      }
    }
}());
