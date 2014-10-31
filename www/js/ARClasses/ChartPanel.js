

// ===========================  BarChartViewModel =========================================

// Class Constructor
var BarChartViewModel = function (constructorParameters)
{
    // ---------- Enumerations ----------

    // ---------- Properties ---------
    var self = this;  // had to use 'this' below... 'self' would not work!?!
    this.constructorParameters =
        $.extend
        (
            {
                TotalDataPointCount: 10,
                TotalDataPointHeightInPixels: 900,
                DisplayLabelType: "ALPHA",
                Foreground: "gold"
            },
            constructorParameters
        );
    this.TotalDataPointCount = this.constructorParameters.TotalDataPointCount;
    this.TotalDataPointHeightInPixels = this.constructorParameters.TotalDataPointHeightInPixels;
    this.DisplayLabelType = this.constructorParameters.DisplayLabelType;
    this.Foreground = this.constructorParameters.Foreground;

    // Private Properties
    this.DataPointViewModels = new Array();

    // Constructor 
    this.New();

};

// Class Implementation
BarChartViewModel.prototype =
    {
        // ------------ Methods -----------

        New: function ()
        {

        }
        ,
        appendView: function (parentElement)
        {

            // Chart Outermost Panel
            var $ChartPanel = $("<div>")
                                .attr("id", "ChartPanel")
                                .css(
                                        {
                                            "position": "relative",
                                            "height": "95%",
                                            "width": "95%",
                                            "left": "2%",
                                            "top": "2.5%"
                                        }
                                    );

            // Construct Data Point View Models
            this.DataPointViewModels = new Array();

            for (targetOrdinal = 1; targetOrdinal <= this.TotalDataPointCount; targetOrdinal++) {
                this.DataPointViewModels.push
                    (
                        new DataPointViewModel
                        (
                            {
                                Ordinal: targetOrdinal,
                                DisplayValue: (100 - ((targetOrdinal - 1) * 10)) + "%",
                                TotalDataPointCount: this.TotalDataPointCount,
                                TotalDataPointHeightInPixels: this.TotalDataPointHeightInPixels,
                                Foreground: this.Foreground
                            }
                        )
                    );
            }

            // Construct View
            parentElement.append($ChartPanel);
            $.each
            (
                this.DataPointViewModels,
                function (index, targetDataPointViewModel) {
                    targetDataPointViewModel.appendView(jQuery("#ChartPanel"))
                    targetDataPointViewModel.updateView();
                }
            );

            jQuery("#ChartPanel").hide();

            return $ChartPanel;
        }
        ,
        animateView: function ()
        {
            this.updateView();
            $.each
            (
                this.DataPointViewModels,
                function (index, targetDataPointViewModel) {
                    targetDataPointViewModel.animateView();
                }
            );
        }
        ,
        RecalculateViewProperties: function ()
        {
        }
        ,
        updateView: function ()
        {
            this.RecalculateViewProperties();

            jQuery("#ChartPanel").show();

        }

    };


// ===========================  DataPointViewModel =========================================

// Class Constructor
var DataPointViewModel = function (constructorParameters)
{
    // ---------- Enumerations ----------

    // ---------- Properties ---------
    var self = this;  // had to use 'this' below... 'self' would not work!?!
    this.constructorParameters =
        $.extend
        (
            {
                Ordinal: 0,
                DisplayValue: "0",
                TotalDataPointCount: 10,
                TotalDataPointHeightInPixels: 900,
                DisplayLabelType: "ALPHA",
                Foreground: "gold"
            },
            constructorParameters
        );
    this.Ordinal = this.constructorParameters.Ordinal;
    this.TotalDataPointCount = this.constructorParameters.TotalDataPointCount;
    this.TotalDataPointHeightInPixels = this.constructorParameters.TotalDataPointHeightInPixels;
    this.DisplayValue = this.constructorParameters.DisplayValue;
    this.DisplayLabelType = this.constructorParameters.DisplayLabelType;
    this.Foreground = this.constructorParameters.Foreground;

    // Private Properties
    this.DisplayLabel = "?";
    this.DisplayHeight = "8%";
    this.MarginBottom = "3%";
    this.BorderRadius = "10px";

    // Constructor 
    this.New();

};

// Class Implementation
DataPointViewModel.prototype =
    {
        // ------------ Methods -----------

        New: function () {
            this.RecalculateViewProperties();
        }
        ,
        setOrdinal: function (targetOrdinal)
        {
            this.Ordinal = targetOrdinal;
            this.RecalculateViewProperties();
        }
        ,
        setTotalDataPointCount: function (targetTotalDataPointCount)
        {
            this.TotalDataPointCount = targetTotalDataPointCount;
            this.RecalculateViewProperties();
        }
        ,
        setTotalDataPointHeightInPixels: function (targetTotalDataPointHeightInPixels)
        {
            this.TotalDataPointHeightInPixels = targetTotalDataPointHeightInPixels;
            this.RecalculateViewProperties();
        }
        ,
        setDisplayValue: function (targetDisplayValue)
        {
            this.DisplayValue = targetDisplayValue;
        }
        ,
        setDisplayLabel: function (targetDisplayLabel)
        {
            this.DisplayLabel = targetDisplayLabel;
        }
        ,
        setForeground: function (targetForeground)
        {
            this.Foreground = targetForeground;
        }
        ,
        appendView: function (parentElement)
        {

            // Chart Data Point Outermost Panel (Template)
            var $DataPointPanel = $("<div>")
                                .attr("id", "DataPointPanel" + this.Ordinal)
                                .css(
                                        {
                                            "position": "relative",
                                            "width": "72%",
                                            "height": this.DisplayHeight,
                                            "margin-top": "0%",
                                            "margin-bottom": "0%",
                                            "margin-left": "3%",
                                            "margin-right": "3%"
                                        }
                                    );

            // Data Point Bar Panel (Template)
            var $DataPointBarPanel = $("<div>")
                                .attr
                                (
                                    {
                                        "id": "DataPointBarPanel" + this.Ordinal
                                    }
                                )
                                .css(
                                        {
                                            "position": "relative",
                                            "left": "37%",
                                            "height": "95%"
                                        }
                                    );

            // Data Point Bar (Template)
            var $DataPointBar = $("<div>")
                                .attr
                                (
                                    {
                                        "id": "DataPointBar" + this.Ordinal,
                                        "class": "DataPointBarBaseClass"
                                    }
                                )
                                .css(
                                        {
                                            "position": "absolute",
                                            "top": "5%",
                                            "height": "90%"
                                        }
                                    );

            // Data Point Label Panel (Template)
            var $DataPointLabelPanel = $("<div>")
                                .attr
                                (
                                    {
                                        "id": "DataPointLabelPanel" + this.Ordinal,
                                    }
                                )
                                .css(
                                        {
                                            "position": "absolute",
                                            "top": "5%",
                                            "height": "90%",
                                            "left": "0%"
                                        }
                                    )
                                .text(this.DisplayLabel);

            // Data Point Value Panel (Template)
            var $DataPointValuePanel = $("<div>")
                                .attr("id", "DataPointValuePanel" + this.Ordinal)
                                .css(
                                        {
                                            "position": "absolute",
                                            "top": "5%",
                                            "height": "90%",
                                            "left": "10%"
                                        }
                                    )
                                .text(this.DisplayValue);

            // Construct View
            parentElement.append($DataPointPanel);

            jQuery("#DataPointPanel" + this.Ordinal).append($DataPointBarPanel);
            jQuery("#DataPointBarPanel" + this.Ordinal).append($DataPointBar);

            jQuery("#DataPointPanel" + this.Ordinal).append($DataPointLabelPanel);

            jQuery("#DataPointPanel" + this.Ordinal).append($DataPointValuePanel);

            return $DataPointPanel;
        }
        ,
        animateView: function ()
        {
            //updateView();

            // Data Point Bar Animation
            var DataPointBarWidthAnimation = new WidthAnimation({ From: "0%", To: this.DisplayValue, BeginTime: 1000, Duration: 1875 });
            var DataPointBarStoryboard = new Storyboard({ TargetName: "DataPointBar" + this.Ordinal });
            DataPointBarStoryboard.setWidthAnimation(DataPointBarWidthAnimation);
            DataPointBarStoryboard.Begin();

            // Data Point Text Animation
            var DataPointValueOpacityAnimation = new OpacityAnimation({ From: 0.0, To: 1.0, BeginTime: 2500, Duration: 500 });
            var DataPointValueStoryboard = new Storyboard({ TargetName: "DataPointValuePanel" + this.Ordinal });
            DataPointValueStoryboard.setOpacityAnimation(DataPointValueOpacityAnimation);
            DataPointValueStoryboard.Begin();
        }
        ,
        // Private Methods
        RecalculateViewProperties: function ()
        {
            var HorizontalRadius = "1em"; //(5 / this.TotalDataPointCount) + "em";

            switch (this.TotalDataPointCount)
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
                this.DisplayLabel = Ordinal + ".";
            }
            else {
                switch (this.Ordinal) {
                    case 1:
                        this.DisplayLabel = "A.";
                        break;
                    case 2:
                        this.DisplayLabel = "B.";
                        break;
                    case 3:
                        this.DisplayLabel = "C.";
                        break;
                    case 4:
                        this.DisplayLabel = "D.";
                        break;
                    case 5:
                        this.DisplayLabel = "E.";
                        break;
                    case 6:
                        this.DisplayLabel = "F.";
                        break;
                    case 7:
                        this.DisplayLabel = "G.";
                        break;
                    case 8:
                        this.DisplayLabel = "H.";
                        break;
                    case 9:
                        this.DisplayLabel = "I.";
                        break;
                    case 10:
                        this.DisplayLabel = "J.";
                        break;
                }
            }
        }
        ,
        updateView: function ()
        {
            this.RecalculateViewProperties();

            jQuery("#DataPointLabelPanel" + this.Ordinal)
                    .removeClass()
                    .addClass("DataPointTextBaseClass")
                    .addClass("DataPointTextSize" + this.TotalDataPointCount + "AnswerClass")
                    .css
                    (
                        {
                            color: this.Foreground
                        }
                    );

            jQuery("#DataPointValuePanel" + this.Ordinal)
                    .removeClass()
                    .addClass("DataPointTextBaseClass")
                    .addClass("DataPointTextSize" + this.TotalDataPointCount + "AnswerClass")
                    .css
                    (
                        {
                            color: this.Foreground
                        }
                    );

            jQuery("#DataPointBar" + this.Ordinal)
                    .css
                    (
                        {
                            "background-color": this.Foreground,
                            "border-radius": this.BorderRadius
                        }
                    );

        }

    };
