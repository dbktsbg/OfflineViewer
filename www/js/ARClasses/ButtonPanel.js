
// ===========================  TouchKeypadViewModel =========================================

// Class Constructor
var TouchKeypadViewModel = function (constructorParameters)
{
    // ---------- Properties ---------
    var self = this;  // had to use 'this' below... 'self' would not work!?!
    this.constructorParameters =
        $.extend
        (
            {
                //id: "defaultKeypadPanel",
                TotalButtonCount: 10,
                HeightPercent: "100",
                WidthPercent: "100",
                Background: "rgba(0,0,0,0.4)",
                HighlightBackground: "rgba(0,0,0,1.0)",
                Foreground: "Gold",
                Opacity: 0.5
            },
            constructorParameters
        );

    //this.id = this.constructorParameters.id;
    this.TotalButtonCount = this.constructorParameters.TotalButtonCount;
    this.WidthPercent = this.constructorParameters.WidthPercent;  // *** TO DO: implement methiod to alter...
    this.HeightPercent = this.constructorParameters.HeightPercent;  // *** TO DO: implement methiod to alter...
    this.Background = this.constructorParameters.Background;  // *** TO DO: implement methiod to alter...
    this.HighlightBackground = this.constructorParameters.HighlightBackground;  // *** TO DO: implement methiod to alter...
    this.Foreground = this.constructorParameters.Foreground;
    this.Opacity = this.constructorParameters.Opacity;  // *** TO DO: implement methiod to alter...

    // Private Properties
    this.MaxButtonCount = 10;

    this.New();

};

// Class Implementation
TouchKeypadViewModel.prototype =
    {
        // ------------ Methods -----------

        New: function ()
        {
        }
        ,
        appendView: function (parentElement)
        {
            var self = this;

            // Keypad Outermost Panel
            var $KeypadPanel =
                $("<div>")
                    .attr
                    (
                        {
                            "id": "myKeypadPanel", //this.id,
                            "class": "KeypadHideClass"
                        }
                    )
                    .css
                    (
                        {
                            "position": "relative",
                            "height": "95%",
                            "width": "95%",
                            "left": "2.5%",
                            "top": "2.5%"
                        }
                    )
            ;

            // Construct Button View Models
            this.ButtonViewModels = new Array();

            for (targetOrdinal = 1; targetOrdinal <= this.MaxButtonCount; targetOrdinal++)
            {
                this.ButtonViewModels.push
                    (
                        new ButtonViewModel
                        (
                            {
                                ParentID: "myKeypadPanel", //this.id
                                Ordinal: targetOrdinal,
                                TotalButtonCount: this.TotalButtonCount,
                                Foreground: this.Foreground
                            }
                        )
                    );
            }

            // Construct View
            parentElement.append($KeypadPanel);
            jQuery.each
            (
                this.ButtonViewModels,
                function (index, targetButtonViewModel)
                {
                    //targetButtonViewModel.appendView(jQuery("#" + this.id));
                    targetButtonViewModel.appendView(jQuery("#myKeypadPanel"));
                    targetButtonViewModel.updateView();
                }
            );

            // event handlers
            $KeypadPanel
                .on
                    (
                        "event_ButtonViewModel_Click"
                        ,
                        {
                            ButtonViewModels: this.ButtonViewModels,
                            HighlightBackground: this.HighlightBackground,
                            Background: this.Background
                        }
                        ,
                        function (event, parameters) {
                            //alert("eventParticipantResponse=" + parameters.SelectedOrdinal);

                            // highlight selected button
                            jQuery.each
                            (
                                event.data.ButtonViewModels,
                                function (index, targetButtonViewModel) {
                                    //alert("targetButtonViewModel.Ordinal=" + targetButtonViewModel.Ordinal);
                                    if (targetButtonViewModel.Ordinal == parameters.SelectedOrdinal) {
                                        targetButtonViewModel.setBackground(event.data.HighlightBackground);
                                    }
                                    else {
                                        targetButtonViewModel.setBackground(event.data.Background);
                                    }
                                }
                            );

                            // raise ParticipantResponse event to parent
                            jQuery(this)
                                .parent()
                                    .trigger
                                    (
                                        "event_TouchKeypadViewModel_ParticipantResponse",
                                        [
                                            {
                                                SelectedOrdinal: parameters.SelectedOrdinal
                                            }
                                        ]
                                    );
                        }
                    )
            ;

            return $KeypadPanel;
        }
        ,
        animateView: function (targetAnimationType) {
            this.updateView();

            switch (targetAnimationType) {
                case "EntranceAnimation":
                    this.beginEntranceAnimation();
                    break;
                case "EmphasisAnimation":
                    this.beginEmphasisAnimation();
                    break;
                case "ExitAnimation":
                    this.beginExitAnimation();
                    break;
            }
        }
        ,
        beginEntranceAnimation: function () {
            var ResponseSummaryPanelOpacityAnimation = new OpacityAnimation({ From: "0.0", To: "1.0", Duration: 1000 });

            var ResponseSummaryPanelStoryboard = new Storyboard({ TargetName: this.id });
            ResponseSummaryPanelStoryboard.setOpacityAnimation(ResponseSummaryPanelOpacityAnimation);
            ResponseSummaryPanelStoryboard.Begin();
        }
        ,
        beginEmphasisAnimation: function () {

        }
        ,
        beginExitAnimation: function () {
            var ResponseSummaryPanelOpacityAnimation = new OpacityAnimation({ From: "1.0", To: "0.0", Duration: 1000 });

            var ResponseSummaryPanelStoryboard = new Storyboard({ TargetName: this.id });
            ResponseSummaryPanelStoryboard.setOpacityAnimation(ResponseSummaryPanelOpacityAnimation);
            ResponseSummaryPanelStoryboard.Begin();
        }
        ,
        RecalculateViewProperties: function ()
        {
        }
        ,
        updateView: function ()
        {
            this.RecalculateViewProperties();

            //jQuery.each
            //(
            //    this.ButtonViewModels,
            //    function (index, targetButtonViewModel)
            //    {
            //        if (index + 1 <= TotalButtonCount)
            //        {
            //            targetButtonViewModel.setIsEnabled(true);
            //        }
            //        else
            //        {
            //            targetButtonViewModel.setIsEnabled(false);
            //        }
            //        targetButtonViewModel.updateView();
            //    }
            //);

        }
    };


// ===========================  ButtonViewModel =========================================

// Class Constructor
var ButtonViewModel = function (constructorParameters)
{
    // ---------- Enumerations ----------

    // ---------- Properties ---------
    var self = this;  // had to use 'this' below... 'self' would not work!?!
    this.constructorParameters =
        $.extend
        (
            {
                ParentID: "",
                Ordinal: 0,
                DisplayLabelType: "ALPHA",
                Foreground: "gold",
                Background: "rgba(0,0,0,0.4)",
                MaxButtonCount: 10,
                TotalButtonCount: 10
            },
            constructorParameters
        );
    this.ParentID = this.constructorParameters.ParentID;
    this.Ordinal = this.constructorParameters.Ordinal;
    this.DisplayLabelType = this.constructorParameters.DisplayLabelType;
    this.Foreground = this.constructorParameters.Foreground;
    this.Background = this.constructorParameters.Background;
    this.MaxButtonCount = this.constructorParameters.MaxButtonCount;
    this.TotalButtonCount = this.constructorParameters.TotalButtonCount;

    // Private Properties
    this.IsEnabled = true;
    this.ActiveForeground = this.Foreground;
    this.DisplayLabel = "?";
    this.DisplayHeight = "8%";
    this.MarginBottom = "3%";
    this.BorderRadius = "10px";

    // Constructor 
    this.New();

};

// Class Implementation
ButtonViewModel.prototype =
    {
        // ------------ Methods -----------

        New: function ()
        {
            this.RecalculateViewProperties();
        }
        ,
        setOrdinal: function (targetOrdinal)
        {
            this.Ordinal = targetOrdinal;
            this.RecalculateViewProperties();
        }
        ,
        setTotalButtonCount: function (targetTotalButtonCount)
        {
            this.TotalButtonCount = targetTotalButtonCount;
            this.RecalculateViewProperties();
        }
        ,
        setForeground: function (targetForeground) {
            this.Foreground = targetForeground;
            this.updateView();  // do this in ea "Set" func?  or in "Update" func called by parent?
        }
        ,
        setBackground: function (targetBackground) {
            this.Background = targetBackground;
            this.updateView();  // do this in ea "Set" func?  or in "Update" func called by parent?
        }
        ,
        appendView: function (parentElement)
        {
            // Button Outermost Panel (Template)
            var $ButtonPanel =
                $("<div>")
                    .attr
                    (
                        {
                            "id": "ButtonPanel" + this.Ordinal
                        }
                    )
                    .css
                    (
                        {
                            "float": "left",
                            "background-color": this.Background,
                            "position": "relative",
                            "width": "15.4%",
                            "height": "43%",
                            "margin-top": "1%",
                            "margin-bottom": "1%",
                            "margin-left": "3.3%",
                            "margin-right": "1%"
                        }
                    )
                    .on
                    (
                        "click"
                        ,
                        {
                            AnswerOrdinal: this.Ordinal,
                            IsEnabled: this.IsEnabled
                        }
                        ,
                        function (event)
                        {
                            if (event.data.IsEnabled == true)
                            {
                                // raise event to parent
                                //event.stopPropagation(); // no other element in DOM should handle this
                                jQuery(this)
                                    .parent()
                                        .trigger
                                        (
                                            "event_ButtonViewModel_Click",
                                            [
                                                {
                                                    SelectedOrdinal: event.data.AnswerOrdinal
                                                }
                                            ]
                                        );
                            }
                        }
                    )
            ;

            // Button Label Panel (Template)
            var $ButtonLabelPanel =
                $("<div>")
                    .attr
                    (
                        {
                            "id": "ButtonLabelPanel" + this.Ordinal,
                            "class": "ButtonTextBaseClass"
                        }
                    )
                    .css
                    (
                        {
                            "position": "absolute",
                            "left": "40%",
                            "top": "35%"
                        }
                    )
                    .text
                    (
                        this.DisplayLabel
                    )
            ;

            // Construct View
            parentElement.append($ButtonPanel);

            jQuery("#ButtonPanel" + this.Ordinal).append($ButtonLabelPanel);

            return $ButtonPanel;
        }
        ,
        animateView: function () {
            // Data Point Text Animation
            var DataPointValueOpacityAnimation = new OpacityAnimation({ From: 0.0, To: 1.0, BeginTime: 2500, Duration: 500 });
            var DataPointValueStoryboard = new Storyboard({ TargetName: "DataPointValuePanel" + this.Ordinal });
            DataPointValueStoryboard.setOpacityAnimation(DataPointValueOpacityAnimation);
            DataPointValueStoryboard.Begin();
        }
        ,
        RecalculateViewProperties: function ()
        {
            var HorizontalRadius = "1em"; //(5 / this.TotalDataPointCount) + "em";

            switch (this.TotalButtonCount)
            {
                case 2:
                    this.DisplayHeight = "50%";
                    HorizontalRadius = "1.2em";
                    break;
                case 3:
                    this.DisplayHeight = "33%";
                    HorizontalRadius = "0.7em";
                    break;
                case 4:
                    this.DisplayHeight = "25%";
                    HorizontalRadius = "0.5em";
                    break;
                case 5:
                    this.DisplayHeight = "20%";
                    HorizontalRadius = "0.5em";
                    break;
                case 6:
                    this.DisplayHeight = "16.7%";
                    HorizontalRadius = "0.5em";
                    break;
                case 7:
                    this.DisplayHeight = "14.3%";
                    HorizontalRadius = "0.5em";
                    break;
                case 8:
                    this.DisplayHeight = "12.5%";
                    HorizontalRadius = "0.5em";
                    break;
                case 9:
                    this.DisplayHeight = "11%";
                    HorizontalRadius = "0.5em";
                    break;
                default:
                    this.DisplayHeight = "10%";
                    HorizontalRadius = "0.5em";
                    break;
            }

            this.BorderRadius = HorizontalRadius + " " +
                    HorizontalRadius + " " +
                    HorizontalRadius + " " +
                    HorizontalRadius + " / " +
                    "10% 10% 10% 10%";

            if (this.DisplayLabelType == "NUMERIC")
            {
                this.DisplayLabel = Ordinal;
            }
            else
            {
                switch (this.Ordinal)
                {
                    case 1:
                        this.DisplayLabel = "A";
                        break;
                    case 2:
                        this.DisplayLabel = "B";
                        break;
                    case 3:
                        this.DisplayLabel = "C";
                        break;
                    case 4:
                        this.DisplayLabel = "D";
                        break;
                    case 5:
                        this.DisplayLabel = "E";
                        break;
                    case 6:
                        this.DisplayLabel = "F";
                        break;
                    case 7:
                        this.DisplayLabel = "G";
                        break;
                    case 8:
                        this.DisplayLabel = "H";
                        break;
                    case 9:
                        this.DisplayLabel = "I";
                        break;
                    case 10:
                        this.DisplayLabel = "J";
                        break;
                }
            }

            if (this.Ordinal <= this.TotalButtonCount)
            {
                this.IsEnabled = true;
                this.ActiveForeground = this.Foreground;
            }
            else
            {
                this.IsEnabled = false;
                this.ActiveForeground = "#444444";
            }

        }
        ,
        updateView: function ()
        {
            // appendView appends the view (element) to the DOM
            // updateView makes any dynamic adjustments 
            // (including those that must be done only after the element has been appended to the DOM

            this.RecalculateViewProperties();

            jQuery("#ButtonPanel" + this.Ordinal)
                    .css
                    (
                        {
                            "background-color": this.Background
                        }
                    )
            ;

            jQuery("#ButtonLabelPanel" + this.Ordinal)
                    .removeClass()
                    .addClass("ButtonTextBaseClass")
                    .addClass("ButtonTextSize" + this.MaxButtonCount + "AnswerClass")
                    .css
                    (
                        {
                            "color": this.ActiveForeground
                        }
                    )
            ;

        }
    };
