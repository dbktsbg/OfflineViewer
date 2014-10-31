
// ===========================  SlideViewerViewModel =========================================

// Class Constructor
var SlideViewerViewModel = function (constructorParameters) {
    // ---------- Enumerations ----------
    TransitionEnumeration =
    {
        None: "none",
        Fade: "fade",
        CrossFade: "crossfade",
        FromRight: "right",
        FromLeft: "left"
    }

    // ---------- Properties ---------
    var self = this;  // had to use 'this' below... 'self' would not work!?!
    this.constructorParameters =
        $.extend
        (
            {
                id: "defaultSlideViewer",
                CurrentSlideImageSource: ""
            },
            constructorParameters
        );

    this.id = this.constructorParameters.id;
    this.CurrentSlideImageSource = this.constructorParameters.CurrentSlideImageSource;

    // Private Properties
    self.CurrentSlide;
    self.NewSlide;
    self.DefaultSlideImageSource = "";

    this.New();

};

// Class Implementation
SlideViewerViewModel.prototype =
    {
        // ------------ Methods -----------

        New: function () {
            // MUST render NEW slide first, so CURRENT slide is always "on top" of z-order
            self.NewSlide =
                jQuery("<img>")
                    .attr
                    (
                        {
                            "id": this.id + "NewSlide",
                            "class": "SlideImageStyle SlideImageScaleToWidthStyle"
                        }
                    );

            self.CurrentSlide =
                $("<img>")
                    .attr
                    (
                        {
                            "id": this.id + "CurrentSlide",
                            "class": "SlideImageStyle SlideImageScaleToWidthStyle"
                        }
                    );
        }
        ,
        appendView: function (parentElement) {
            parentElement.append(self.NewSlide);
            parentElement.append(self.CurrentSlide);
            return self.CurrentSlide;
        }
        ,
        SetDefaultSlideImageSource: function (NewDefaultSlideImageSource) {
            self.DefaultSlideImageSource = NewDefaultSlideImageSource;
        }
        ,
        ShowSlide: function (NewSlideImageSource, Transition) {
            var TransitionDuration = 1000;
            var FadeDuration = TransitionDuration;
            var NewSlideFadeBeginTime = 0;
            var NewSlideStartingLeftPosition = 0;
            var NewSlideXFrom = "0%";
            var NewSlideXTo = "0%";
            var CurrentSlideXFrom = "0%";
            var CurrentSlideXTo = "0%";

            // setup for specified transistion
            switch (Transition) {
                case TransitionEnumeration.None:
                    NewSlideStartingLeftPosition = 0;
                    NewSlideXFrom = "0%";
                    NewSlideXTo = "0%";
                    CurrentSlideXFrom = "0%";
                    CurrentSlideXTo = "0%";
                    break;
                case TransitionEnumeration.Fade:
                    NewSlideStartingLeftPosition = 0;
                    NewSlideXFrom = "0%";
                    NewSlideXTo = "0%";
                    NewSlideFadeBeginTime = TransitionDuration / 2;
                    FadeDuration = TransitionDuration / 2;
                    CurrentSlideXFrom = "0%";
                    CurrentSlideXTo = "0%";
                    break;
                case TransitionEnumeration.CrossFade:
                    NewSlideStartingLeftPosition = 0;
                    NewSlideXFrom = "0%";
                    NewSlideXTo = "0%";
                    NewSlideFadeBeginTime = 0;
                    FadeDuration = TransitionDuration;
                    CurrentSlideXFrom = "0%";
                    CurrentSlideXTo = "0%";
                    break;
                case TransitionEnumeration.FromLeft:
                    NewSlideStartingLeftPosition = -self.CurrentSlide.width();
                    NewSlideXFrom = "-100%";
                    NewSlideXTo = "0%";
                    CurrentSlideXFrom = "0%";
                    CurrentSlideXTo = "100%";
                    break;
                case TransitionEnumeration.FromRight:
                    NewSlideStartingLeftPosition = self.CurrentSlide.width();
                    NewSlideXFrom = "100%";
                    NewSlideXTo = "0%";
                    CurrentSlideXFrom = "0%";
                    CurrentSlideXTo = "-100%";
                    break;

            }

            // position NEW slide
            self.NewSlide.css({ "left": NewSlideStartingLeftPosition });

            // load image for NEW slide
            if (NewSlideImageSource == "") {
                NewSlideImageSource = self.DefaultSlideImageSource;
            }
            self.NewSlide
                .attr
                    (
                        {
                            "src": NewSlideImageSource
                        }
                    );

            // translate slides
            var CurrentSlideID = this.id + "CurrentSlide";
            var CurrentSlideTranslateAnimation = new TranslateAnimation({ XFrom: CurrentSlideXFrom, XTo: CurrentSlideXTo, YFrom: "0%", YTo: "0%", Duration: TransitionDuration });
            var CurrentSlideStoryboard = new Storyboard({ TargetName: CurrentSlideID });
            CurrentSlideStoryboard.setTranslateAnimation(CurrentSlideTranslateAnimation);
            CurrentSlideStoryboard.Begin();
            if (Transition == TransitionEnumeration.Fade || Transition == TransitionEnumeration.CrossFade) {
                var CurrentSlideOpacityAnimation = new OpacityAnimation({ From: "1.0", To: "0.0", Duration: FadeDuration });
                var CurrentSlideOpacityStoryboard = new Storyboard({ TargetName: CurrentSlideID });
                CurrentSlideOpacityStoryboard.setOpacityAnimation(CurrentSlideOpacityAnimation);
                CurrentSlideOpacityStoryboard.Begin();
            }

            var NewSlideID = this.id + "NewSlide";
            var NewSlideTranslateAnimation = new TranslateAnimation({ XFrom: NewSlideXFrom, XTo: NewSlideXTo, YFrom: "0%", YTo: "0%", Duration: TransitionDuration });
            var NewSlideStoryboard = new Storyboard({ TargetName: NewSlideID });
            NewSlideStoryboard.setTranslateAnimation(NewSlideTranslateAnimation);
            NewSlideStoryboard.Begin();
            if (Transition == TransitionEnumeration.Fade || Transition == TransitionEnumeration.CrossFade) {
                var NewSlideOpacityAnimation = new OpacityAnimation({ From: "0.0", To: "1.0", BeginTime: NewSlideFadeBeginTime, Duration: FadeDuration });
                var NewSlideOpacityStoryboard = new Storyboard({ TargetName: NewSlideID });
                NewSlideOpacityStoryboard.setOpacityAnimation(NewSlideOpacityAnimation);
                NewSlideOpacityStoryboard.Begin();
            }

            // clean-up for transition 
            this.CurrentSlideImageSource = NewSlideImageSource;
            self.CurrentSlideImageSource = this.CurrentSlideImageSource;

            window.setTimeout
                (
                    function () {
                        // load image for CURRENT slide
                        self.CurrentSlide
                            .attr
                                (
                                    {
                                        "src": self.CurrentSlideImageSource
                                    }
                                );

                        // position CURRENT slide
                        self.CurrentSlide
                            .css
                                (
                                    {
                                        "left": 0,
                                        "opacity": 1.0
                                    }
                                );

                        // reset image for NEW slide
                        self.NewSlide
                            .attr
                                (
                                    {
                                        "src": ""
                                    }
                                );
                    },
                    TransitionDuration
                );

        }
    }

