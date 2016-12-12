/**
 * Created by Alekhya on 12/1/2016.
 */
(function () {
    angular
        .module("MovieApp")
        .controller("MovieDetailsController", MovieDetailsController);

    function MovieDetailsController(UserService,$location,MovieService,MyMovieService,$routeParams,$sce) {
        console.log("in controller");
                 var vm =this;
        var imdbID = $routeParams.mid;
        vm.uid = $routeParams.uid;
        vm.title = $routeParams.title;
                    vm.RateMovie = RateMovie;

        vm.checkRating = checkRating;
        function init() {


                console.log(imdbID)
                getMovieInfo(imdbID);
                getReviewsandRatings(imdbID);
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


        function checkRating(rating,review,movie){
            UserService
                .findUserById(vm.uid)
                .then(function (response) {
                    var usersReviews = response.data.reviews;

                    console.log(usersReviews);
                    for (var i in usersReviews) {
                        if (usersReviews[i].tmdbId == imdbID) {

                            console.log("Dear user, you have already submitted review!")
                            vm.error = "Dear user, you have already submitted review!";
                            vm.checkFailed = 1;

                            return;
                        }
                    }

                    console.log("at the end of the loop");

                   RateMovie(rating,review,movie);

                });
        }

      function RateMovie(rating,review,movie) {

          var imageUrl = "https://image.tmdb.org/t/p/w130/" + movie.poster_path;

          var usergivenrating = {
              movieName: movie.title,
              rating: parseInt(rating),
              tmdbId: imdbID,
              poster_url: imageUrl
          };
          console.log(usergivenrating);
          var usergivenreview = {
              movieName: movie.title,
              review: review,
              tmdbId: imdbID,
              poster_url: imageUrl
          };
          console.log(usergivenreview);
          var userrateandreview = {
              rating: usergivenrating,
              review: usergivenreview
          };

          var ratings = {
              userId: vm.uid,
              username: vm.userName,
              value: parseInt(rating)
          };

          var reviews = {
              userId: vm.uid,
              username: vm.userName,
              text: review

          };

          var ratingsandreviews = {
              ratings: ratings,
              reviews: reviews
          };

          console.log(ratings);
          console.log(reviews);
          var mynewmovie = {
              tmdbId: imdbID,
              title: movie.title,
              imageUrl: imageUrl,
              ratings: [ratings],
              reviews: [reviews]

          };

          console.log(vm.uid);
          console.log("vm check failed");
          console.log(vm.checkFailed);
          if (vm.checkFailed != 1) {
              UserService
                  .submitReviewandRating(vm.uid, userrateandreview)
                  .then(function (response) {
                      var i = 1;
                  });

              MyMovieService
                  .findMovieById(imdbID)
                  .then(function (response) {
                      var movieresponse = response.data;
                      if (movieresponse.tmdbId) {
                          MyMovieService
                              .updateRatingAndReview(movieresponse.tmdbId, ratingsandreviews)
                              .then(function (response) {
                                  if (response) {
                                      console.log(" in update movie");
                                      console.log(response);

                                      $location.url("/user/" + vm.uid + "/movie/" + vm.movie.id + "/" + vm.movie.title);
                                  } else {
                                      vm.error = "unable to add review";
                                  }
                              });
                      } else {

                          MyMovieService
                              .createMovie(mynewmovie)
                              .then(function (response) {

                                  var newmovie = response.data;
                                  console.log(" in create movie");
                                  if (newmovie) {
                                      // console.log("newmovie");
                                      //console.log(newmovie);
                                      //console.log(newmovie._id);

                                      $location.url("/user/" + vm.uid + "/movie/" + vm.movie.id + "/" + vm.movie.title);

                                  }
                                  else {
                                      vm.error = "unable to add new Movie Object";
                                  }


                              });
                      }

                  });
          }

          }

          function getMovieInfo(imdbID) {
              MovieService.searchMovieByID(imdbID)
                  .success(function (response) {

                      if (response.videos.results.length > 0) {
                          var embedUrl = 'https://www.youtube.com/embed/';
                          response.video_path = $sce.trustAsResourceUrl(embedUrl + response.videos.results[0].key);
                          response.untrusted_video_url = embedUrl + response.videos.results[0].key;
                      }
                      response.credits.cast.splice(8, response.credits.cast.length - 8);
                      vm.movie = response;
                      //console.log("here is the id to look for");
                      //console.log(response.id);
                      vm.movie.tmdbId = response.id;
                      vm.movie.criticsRating = response.vote_average / 2;
                      vm.movie.ratings = [];
                      vm.movie.reviews = [];
                      var now = new Date();
                      var releaseDate = new Date(response.release_date);
                      if (now > releaseDate) {
                          vm.released = true;
                      }

                  });
          }

          function getReviewsandRatings(imdbID) {

              console.log(imdbID);
              MyMovieService
                  .findMovieById(imdbID)
                  .then(function (response) {
                      console.log("watch out!")
                      console.log(response)
                      if(response.data) {
                          vm.movieReviews = response.data;
                          console.log(vm.movieReviews);
                          var noOfRatings = vm.movieReviews.ratings.length;
                          var ratingsum = 0;
                          for (var i in vm.movieReviews.ratings) {
                              var ratingsum = ratingsum + vm.movieReviews.ratings[i].value;
                          }
                          var ratingAvg = ratingsum / noOfRatings;
                          vm.ratingAvg = ratingAvg.toFixed(1);
                      }
                      else{
                          vm.ratingAvg = 0;
                          vm.movieReviews = [];
                      }

                  });
          }

    }
}());
