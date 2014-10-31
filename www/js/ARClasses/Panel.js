// ===========================  OverlayPanelViewModel =========================================

// Class Constructor
var OverlayPanelViewModel = function (constructorParameters)
{
    // ---------- Enumerations ----------
    EntranceAnimationEnumeration =
    {
        Pop: "pop",
        Fade: "fade",
        Right: "right",
        Left: "left",
        Bottom: "bottom",
        Top: "top"
    }

    // ---------- Properties ---------
    var self = this;  // had to use 'this' below... 'self' would not work!?!
    this.constructorParameters =
        $.extend
        (
            {
                id: "defaultOverlayPanel",
                HeightPercent: "100",
                WidthPercent: "100",
                EntranceAnimation: EntranceAnimationEnumeration.Pop,
                Background: "Black",
                Opacity: 0.5
            },
            constructorParameters
        );

    this.id = this.constructorParameters.id;
    switch (this.constructorParameters.EntranceAnimation)
    {
        case EntranceAnimationEnumeration.Right:
            this.EntranceAnimation = EntranceAnimationEnumeration.Right;
            break;
        case EntranceAnimationEnumeration.Left:
            this.EntranceAnimation = EntranceAnimationEnumeration.Left;
            break;
        case EntranceAnimationEnumeration.Top:
            this.EntranceAnimation = EntranceAnimationEnumeration.Top;
            break;
        case EntranceAnimationEnumeration.Bottom:
            this.EntranceAnimation = EntranceAnimationEnumeration.Bottom;
            break;
        case EntranceAnimationEnumeration.Fade:
            this.EntranceAnimation = EntranceAnimationEnumeration.Fade;
            break;
        default:
            this.EntranceAnimation = EntranceAnimationEnumeration.Pop;
            break;
    }
    this.Background = this.constructorParameters.Background;  // *** TO DO: implement methiod to alter...
    this.Opacity = this.constructorParameters.Opacity;  // *** TO DO: implement methiod to alter...
    this.WidthPercent = this.constructorParameters.WidthPercent;  // *** TO DO: implement methiod to alter...
    this.HeightPercent = this.constructorParameters.HeightPercent;  // *** TO DO: implement methiod to alter...

    // Private Properties
    this.EntranceAnimationRightX = "60%"
    this.EntranceAnimationLeftX = "40%"
    this.EntranceAnimationTopY = "40%"
    this.EntranceAnimationBottomY = "60%"

    this.New();

};

// Class Implementation
OverlayPanelViewModel.prototype =
    {
        // ------------ Methods -----------

        New: function ()
        {
        }
        ,
        appendView: function (parentElement)
        {
            var $OverlayPanel =
                $("<div>")
                    .attr
                    (
                        {
                            "id": this.id,
                            "class": "OverlayHideClass"
                        }
                    )
                    .css
                    (
                        {
                            "position": "absolute",
                            "background-color": "rgba(0,0,0," + this.Opacity + ")"
                        }
                    );

            // Construct View
            parentElement.append($OverlayPanel);

            return $OverlayPanel;
        }
        ,
        animateView: function (targetAnimationType)
        {
            this.updateView();

            switch (targetAnimationType)
            {
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
        beginEntranceAnimation: function ()
        {
            var ResponseSummaryPanelOpacityAnimation = new OpacityAnimation({ From: "100%", To: "100%", Duration: 1 });
            var ResponseSummaryPanelTranslateAnimation = new TranslateAnimation({ XFrom: "0%", XTo: "0%", YFrom: "0%", YTo: "0%", Duration: 1 });

            switch (this.EntranceAnimation)
            {
                case EntranceAnimationEnumeration.Right:
                    var ResponseSummaryPanelTranslateAnimation = new TranslateAnimation({ XFrom: "100%", XTo: this.EntranceAnimationRightX, Duration: 1000 });
                    break;
                case EntranceAnimationEnumeration.Left:
                    var ResponseSummaryPanelTranslateAnimation = new TranslateAnimation({ XFrom: "-" + this.WidthPercent + "%", XTo: "0%", Duration: 1000 });
                    break;
                case EntranceAnimationEnumeration.Top:
                    var ResponseSummaryPanelTranslateAnimation = new TranslateAnimation({ XFrom: "0%", XTo: "0%", YFrom: "-" + this.EntranceAnimationTopY, YTo: "0%", Duration: 1000 });
                    break;
                case EntranceAnimationEnumeration.Bottom:
                    var ResponseSummaryPanelTranslateAnimation = new TranslateAnimation({ XFrom: "0%", XTo: "0%", YFrom: "100%", YTo: this.EntranceAnimationBottomY, Duration: 1000 });
                    break;
                case EntranceAnimationEnumeration.Fade:
                    var ResponseSummaryPanelOpacityAnimation = new OpacityAnimation({ From: "0.0", To: "1.0", Duration: 1000 });
                    break;
                default:
                    break;
            }

            var ResponseSummaryPanelStoryboard = new Storyboard({ TargetName: this.id });
            ResponseSummaryPanelStoryboard.setTranslateAnimation(ResponseSummaryPanelTranslateAnimation);
            ResponseSummaryPanelStoryboard.setOpacityAnimation(ResponseSummaryPanelOpacityAnimation);
            ResponseSummaryPanelStoryboard.Begin();
        }
        ,
        beginEmphasisAnimation: function ()
        {

        }
        ,
        beginExitAnimation: function ()
        {
            var ResponseSummaryPanelOpacityAnimation = new OpacityAnimation({ From: "100%", To: "100%", Duration: 1 });
            var ResponseSummaryPanelTranslateAnimation = new TranslateAnimation({ XFrom: "0%", XTo: "0%", YFrom: "0%", YTo: "0%", Duration: 1 });

            switch (this.EntranceAnimation)
            {
                case EntranceAnimationEnumeration.Right:
                    var ResponseSummaryPanelTranslateAnimation = new TranslateAnimation({ XFrom: this.EntranceAnimationRightX, XTo: "100%", Duration: 1000 });
                    break;
                case EntranceAnimationEnumeration.Left:
                    var ResponseSummaryPanelTranslateAnimation = new TranslateAnimation({ XFrom: "0%", XTo: "-" + this.WidthPercent + "%", Duration: 1000 });
                    break;
                case EntranceAnimationEnumeration.Top:
                    var ResponseSummaryPanelTranslateAnimation = new TranslateAnimation({ XFrom: "0%", XTo: "0%", YFrom: "0%", YTo: "-" + this.EntranceAnimationTopY, Duration: 1000 });
                    break;
                case EntranceAnimationEnumeration.Bottom:
                    var ResponseSummaryPanelTranslateAnimation = new TranslateAnimation({ XFrom: "0%", XTo: "0%", YFrom: this.EntranceAnimationBottomY, YTo: "100%", Duration: 1000 });
                    break;
                case EntranceAnimationEnumeration.Fade:
                    var ResponseSummaryPanelOpacityAnimation = new OpacityAnimation({ From: "0.0", To: "1.0", Duration: 1000 });
                    break;
                default:
                    break;
            }

            var ResponseSummaryPanelStoryboard = new Storyboard({ TargetName: this.id });
            ResponseSummaryPanelStoryboard.setTranslateAnimation(ResponseSummaryPanelTranslateAnimation);
            ResponseSummaryPanelStoryboard.setOpacityAnimation(ResponseSummaryPanelOpacityAnimation);
            ResponseSummaryPanelStoryboard.Begin();

        }
        ,
        RecalculateViewProperties: function ()
        {
            // strip any suffix 
            var IndexOfSuffix;
            IndexOfSuffix = this.HeightPercent.search("%");
            if (IndexOfSuffix >= 0) { this.HeightPercent = this.HeightPercent.substr(0, IndexOfSuffix); }
            IndexOfSuffix = this.WidthPercent.search("%");
            if (IndexOfSuffix >= 0) { this.WidthPercent = this.WidthPercent.substr(0, IndexOfSuffix); }

            // Animation Properties
            this.EntranceAnimationRightX = (100 - this.WidthPercent) + "%"
            this.EntranceAnimationLeftX = this.WidthPercent + "%"
            this.EntranceAnimationTopY = this.HeightPercent + "%"
            this.EntranceAnimationBottomY = (100 - this.HeightPercent) + "%"
        }
        ,
        updateView: function ()
        {
            this.RecalculateViewProperties();

            jQuery("#" + this.id)
                .css
                (
                    {
                        "height": this.HeightPercent + "%",
                        "width": this.WidthPercent + "%"
                    }
                );

            //var TargetClass = "";

            //switch (this.EntranceAnimation)
            //{
            //    case EntranceAnimationEnumeration.Right:
            //        TargetClass = "OverlayRightClass";
            //        break;
            //    case EntranceAnimationEnumeration.Left:
            //        TargetClass = "OverlayLeftClass";
            //        break;
            //    case EntranceAnimationEnumeration.Top:
            //        TargetClass = "OverlayTopClass";
            //        break;
            //    case EntranceAnimationEnumeration.Bottom:
            //        TargetClass = "OverlayBottomClass";
            //        break;
            //    case EntranceAnimationEnumeration.Fade:
            //        TargetClass = "OverlayCenterClass";
            //        break;
            //    default:
            //        TargetClass = "OverlayHideClass";
            //        break;
            //}

            //jQuery("#" + this.id)
            //    .removeClass()
            //    .addClass(TargetClass);

        }

    };
