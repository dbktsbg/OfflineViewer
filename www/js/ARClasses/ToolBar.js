
// ===========================  ToolBar  =========================================

// Class Constructor
var ToolBar = function (constructorParameters)
{
    // ---------- Enumerations ----------

    // ---------- Properties ---------
    var self = this;  // had to use 'this' below... 'self' would not work!?!
    this.constructorParameters =
        $.extend
        (
            {
                HeightPercent: "100",
                WidthPercent: "100",
                Foreground: "white",
                Background: "rgba(0,0,0,0.4)"
            },
            constructorParameters
        );
    this.HeightPercent = this.constructorParameters.HeightPercent;
    this.WidthPercent = this.constructorParameters.WidthPercent;
    this.Foreground = this.constructorParameters.Foreground;
    this.Background = this.constructorParameters.Background;

    // Private Properties

    // Constructor 
    this.New();

};

// Class Implementation
ToolBar.prototype =
    {
        // ------------ Methods -----------

        New: function ()
        {
            this.ButtonViewModels = new Array();
        }
        ,
        appendView: function (parentElement)
        {
            var self = this;

            // ToolBar Outermost Panel
            var $ToolBarPanel =
                $("<div>")
                    .attr
                    (
                        {
                            "id": "myToolBarPanel", //this.id,
                            "class": "ToolBarHideClass"
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
            for (targetOrdinal = 1; targetOrdinal <= this.MaxButtonCount; targetOrdinal++)
            {
                this.ButtonViewModels.push
                    (
                        new ButtonViewModel
                        (
                            {
                                ParentID: "myToolBarPanel", //this.id
                                Ordinal: targetOrdinal,
                                TotalButtonCount: this.TotalButtonCount,
                                Foreground: this.Foreground
                            }
                        )
                    );
            }

            // Construct View
            parentElement.append($ToolBarPanel);
            jQuery.each
            (
                this.ButtonViewModels,
                function (index, targetButtonViewModel) {
                    //targetButtonViewModel.appendView(jQuery("#" + this.id));
                    targetButtonViewModel.appendView(jQuery("#myToolBarPanel"));
                    targetButtonViewModel.updateView();
                }
            );

            // event handlers
            $ToolBarPanel
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

            return $ToolBarPanel;
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
        RecalculateViewProperties: function () {
        }
        ,
        updateView: function () {
            this.RecalculateViewProperties();
        }
    };



// ===========================  CommandButton  =========================================

// Class Constructor
var CommandButton = function (constructorParameters)
{
    // ---------- Enumerations ----------

    // ---------- Properties ---------
    var self = this;  // had to use 'this' below... 'self' would not work!?!
    this.constructorParameters =
        $.extend
        (
            {
                CommandVerb: "",
                Label: "???",
                ImageSource: "",
                IsEnabled: true
            },
            constructorParameters
        );
    this.CommandVerb = this.constructorParameters.CommandVerb;
    this.Label = this.constructorParameters.Label;
    this.ImageSource = this.constructorParameters.ImageSource;
    this.IsEnabled = this.constructorParameters.IsEnabled;

    // Private Properties
    this.Foreground = "white";

    // Constructor 
    this.New();

};

// Class Implementation
CommandButton.prototype =
    {
        // ------------ Methods -----------

        New: function ()
        {
        }
        ,
        setCommandVerb: function (targetCommandVerb)
        {
            this.CommandVerb = targetCommandVerb;
        }
        ,
        setLabel: function (targetLabel)
        {
            this.Label = targetLabel;
            this.updateView();  // do this in ea "Set" func?  or in "Update" func called by parent?
        }
        ,
        setImageSource: function (targetImageSource)
        {
            this.ImageSource = targetImageSource;
            this.updateView();  // do this in ea "Set" func?  or in "Update" func called by parent?
        }
        ,
        setIsEnabled: function (targetIsEnabled)
        {
            this.IsEnabled = targetIsEnabled;
            this.updateView();  // do this in ea "Set" func?  or in "Update" func called by parent?
        }
        ,
        setForeground: function (targetForeground)
        {
            this.Foreground = targetForeground;
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
                            "id": "CommandButtonPanel_" + this.CommandVerb
                        }
                    )
                    .css
                    (
                        {
                            "float": "left",
                            "position": "relative",
                            "width": "15.4%",
                            "height": "15%",
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
                            CommandVerb: this.CommandVerb,
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
                                            "event_CommandButton_Click",
                                            [
                                                {
                                                    CommandVerb: event.data.CommandVerb
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
                            "id": "CommandButtonLabelPanel_" + this.CommandVerb,
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

            jQuery("#CommandButtonPanel_" + this.CommandVerb).append($ButtonLabelPanel);

            return $ButtonPanel;
        }
        ,
        animateView: function ()
        {
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

            switch (this.TotalButtonCount) {
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

            if (this.DisplayLabelType == "NUMERIC") {
                this.DisplayLabel = Ordinal;
            }
            else {
                switch (this.Ordinal) {
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
