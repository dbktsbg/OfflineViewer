
jQuery
    (
        function ()
        {
            //MaxHeightInPixels: $(window).height(),

            OfflineSlideViewModel = 
                function ()
                {

                    // ========== Properties ==========
                    var self = this;
                    self.MyCredential = new Credential();
                    self.MySlideViewerViewModel = new Object(0);
                    self.CurrentSlideOrdinal = 0;

                    // ========== Event Handlers =========


                    // ========== Methods =========

                    self.initializeViewModel =
                        function ()
                        {
                            try
                            {
                                //debug("operatorSlideShowViewModel.initialize()");
                                initializeSlideShowUI();
                                //$.mobile.loading("hide");
                            }
                            catch (e) {
                                error(e.message);
                            }
                        }

                    initializeSlideShowUI =
                        function ()
                        {
                            try
                            {
                                initializeAppState();
                                //ShowView("PollingView");
                                //MySlideViewerViewModel.appendView(jQuery("#SlideView"));
                                initializeSlideViewer();
                            }
                            catch (e) {
                                error(e.message);
                            }
                        }

                    initializeAppState =
                        function () {
                            try {
                                self.MyCredential.SubscriptionKey = "000000"; // jQuery("#Credential_SubscriptionKey").val();
                                self.MyCredential.SessionKey = "266000"; //jQuery("#Credential_SessionKey").val();
                                self.MyCredential.ParticipantKey = "000001"; //jQuery("#Credential_ParticipantKey").val();
                                self.MyCredential.SessionAdminKey = "000000"; //jQuery("#Credential_SessionAdminKey").val();
                                self.MyCredential.IsAuthenticated = "true"; //jQuery("#Credential_IsAuthenticated").val();
                                self.MyCredential.AuthenticationDateTime = "0"; //jQuery("#Credential_AuthenticationDateTime").val();
                                self.MyCredential.WebAppID = 17; //jQuery("#Credential_WebAppID").val();
                            }
                            catch (e) {
                                error(e.message);
                            }
                        }

                    initializeSlideViewer =
                        function ()
                        {
                            self.MySlideViewerViewModel = new SlideViewerViewModel;
                            self.MySlideViewerViewModel.appendView(jQuery("#SlideViewerParentContainter"));
                            self.MySlideViewerViewModel.SetDefaultSlideImageSource("./sessions/v1/Sub000000/App17/Tem/Ses266000/Res/Slide1.jpg");
                        }

                    self.renderSlideImageURL =
                        function
                            (
                                targetSlideOrdinal
                            )
                        {

                            var TransitionType = "fade";
                            if (targetSlideOrdinal == self.CurrentSlideOrdinal) { TransitionType = "none"; }
                            if (targetSlideOrdinal == (self.CurrentSlideOrdinal + 1)) { TransitionType = "right"; }
                            if (targetSlideOrdinal == (self.C0urrentSlideOrdinal - 1)) { TransitionType = "left"; }
                            //self.MySlideViewerViewModel.ShowSlide(self.CurrentSlideImageURL, TransitionType);
                            self.MySlideViewerViewModel.ShowSlide("./sessions/v1/Sub000000/App17/Tem/Ses266000/Res/Slide" + targetSlideOrdinal + ".jpg", TransitionType);
                            self.CurrentSlideOrdinal = targetSlideOrdinal;

                        }

                }

            function Credential()
            {
                self.SubscriptionKey = "";
                self.WebAppID = "";
                self.SessionKey = "";
                self.ParticipantKey = "";
                self.SessionAdminKey = "";
                self.IsAuthenticated = "";
                self.AuthenticationDateTime = "";
            }


            // ========== Main =========

            var SlideOrdinal = 0;
            var myOfflineSlideViewModel = new OfflineSlideViewModel();
            myOfflineSlideViewModel.initializeViewModel();

            // *** TO DO : temp for testing
            SlideOrdinal = 1;
            myOfflineSlideViewModel.renderSlideImageURL(SlideOrdinal);

            jQuery("#SlideViewerParentContainter")
                .click
                (
                    function ()
                    {
                        SlideOrdinal += 1;
                        myOfflineSlideViewModel.renderSlideImageURL(SlideOrdinal);
                    }
                );
            


        }
    );