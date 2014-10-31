
// ===========================  Storyboard =========================================

// Class Constructor
var Storyboard = function (constructorParameters)
{
    // ---------- Enumerations ----------

    // ---------- Properties ---------
    var self = this;  // had to use 'this' below... 'self' would not work!?!
    this.constructorParameters =
        $.extend
        (
            {
                TargetName: ""
            },
            constructorParameters
        );
    this.TargetName = this.constructorParameters.TargetName;
    this.OpacityAnimation = null; //new OpacityAnimation();
    this.WidthAnimation = null; //new WidthAnimation();
    this.TranslateAnimation = null; //new TranslateAnimation();
};

// Class Implementation
Storyboard.prototype =
    {
        // ------------ Methods -----------

        setTargetName: function (targetTargetName)
        {
            this.TargetName = targetTargetName;
        },

        setOpacityAnimation: function (targetOpacityAnimation)
        {
            this.OpacityAnimation = targetOpacityAnimation;
        },

        setWidthAnimation: function (targetWidthAnimation)
        {
            this.WidthAnimation = targetWidthAnimation;
        },

        setTranslateAnimation: function (targetTranslateAnimation)
        {
            this.TranslateAnimation = targetTranslateAnimation;
        },

        Begin: function ()
        {
            var self = this;

            // Reset to FROM State
            if (this.OpacityAnimation != null)
            {
                if (this.OpacityAnimation.From != null)
                {
                    $("#" + this.TargetName).css({ opacity: this.OpacityAnimation.From });
                }
            }
            if (this.WidthAnimation != null)
            {
                if (this.WidthAnimation.From != null)
                {
                    $("#" + this.TargetName).css({ width: this.WidthAnimation.From });
                }
            }
            if (this.TranslateAnimation != null)
            {
                if (this.TranslateAnimation.XFrom != null)
                {
                    $("#" + this.TargetName).css({ left: this.TranslateAnimation.XFrom });
                }
                if (this.TranslateAnimation.YFrom != null)
                {
                    $("#" + this.TargetName).css({ top: this.TranslateAnimation.YFrom });
                }
            }

            // Animate to TO State
            if (this.OpacityAnimation != null)
            {
                var queueAnimation = false;
                if (this.OpacityAnimation.BeginTime > 0)
                {
                    $("#" + self.TargetName).delay(self.OpacityAnimation.BeginTime);
                    queueAnimation = true;
                }
                if (this.OpacityAnimation.To != null)
                {
                    $("#" + this.TargetName).animate({ opacity: this.OpacityAnimation.To }, { duration: this.OpacityAnimation.Duration, queueAnimation: false });
                }
            }
            if (this.WidthAnimation != null)
            {
                var queueAnimation = false;
                if (this.WidthAnimation.BeginTime > 0)
                {
                    $("#" + self.TargetName).delay(self.WidthAnimation.BeginTime);
                    queueAnimation = true;
                }
                if (this.WidthAnimation.To != null)
                {
                    $("#" + this.TargetName).animate({ width: this.WidthAnimation.To }, { duration: this.WidthAnimation.Duration, queue: queueAnimation });
                }
            }
            if (this.TranslateAnimation != null)
            {
                var queueAnimation = false;
                var animationProperties = "";
                if (this.TranslateAnimation.BeginTime > 0)
                {
                    $("#" + self.TargetName).delay(self.TranslateAnimation.BeginTime);
                    queueAnimation = true;
                }
                if (this.TranslateAnimation.XTo != null)
                {
                    animationProperties = "XOnly";
                }
                if (this.TranslateAnimation.YTo != null)
                {
                    if (animationProperties == "")
                    {
                        animationProperties = "YOnly";
                    }
                    else
                    {
                        animationProperties = "XYBoth";
                    }
                }
                switch (animationProperties)
                {
                    case "XOnly":
                        $("#" + self.TargetName).animate({ left: self.TranslateAnimation.XTo }, { duration: self.TranslateAnimation.Duration, queue: queueAnimation });
                    case "YOnly":
                        $("#" + self.TargetName).animate({ top: self.TranslateAnimation.YTo }, { duration: self.TranslateAnimation.Duration, queue: queueAnimation });
                    case "XYBoth":
                        $("#" + self.TargetName).animate
                                                    (
                                                        {
                                                            left: self.TranslateAnimation.XTo,
                                                            top: self.TranslateAnimation.YTo
                                                        },
                                                        {
                                                            duration: self.TranslateAnimation.Duration,
                                                            queue: queueAnimation
                                                        }
                                                    );
                }
            }
        }

    };

// ===========================  OpacityAnnimation =========================================

// Class Constructor
var OpacityAnimation = function (constructorParameters)
{
    // ---------- Enumerations ----------

    // ---------- Properties ---------
    var self = this;  // had to use 'this' below... 'self' would not work!?!
    this.constructorParameters =
        $.extend
        (
            {
                From: 1.0,
                To: 1.0,
                BeginTime: 0,
                Duration: 1
            },
            constructorParameters
        );
    this.From = this.constructorParameters.From;
    this.To = this.constructorParameters.To;
    this.BeginTime = this.constructorParameters.BeginTime;
    this.Duration = this.constructorParameters.Duration;
};

// Class Implementation
OpacityAnimation.prototype =
    {
        // ------------ Methods -----------

        setFrom: function (targetFrom)
        {
            this.From = targetFrom;
        },

        setTo: function (targetTo)
        {
            this.To = targetTo;
        },

        setBeginTime: function (targetBeginTime)
        {
            this.BeginTime = targetBeginTime;
        },

        setDuration: function (targetDuration)
        {
            this.Duration = targetDuration;
        }

    };


// ===========================  WidthAnimation =========================================

// Class Constructor
var WidthAnimation = function (constructorParameters)
{
    // ---------- Enumerations ----------

    // ---------- Properties ---------
    var self = this;  // had to use 'this' below... 'self' would not work!?!
    this.constructorParameters =
        $.extend
        (
            {
                From: 1.0,
                To: 1.0,
                BeginTime: 0,
                Duration: 1
            },
            constructorParameters
        );
    this.From = this.constructorParameters.From;
    this.To = this.constructorParameters.To;
    this.BeginTime = this.constructorParameters.BeginTime;
    this.Duration = this.constructorParameters.Duration;
};

// Class Implementation
WidthAnimation.prototype =
    {
        // ------------ Methods -----------

        setFrom: function (targetFrom)
        {
            this.From = targetFrom;
        },

        setTo: function (targetTo)
        {
            this.To = targetTo;
        },

        setBeginTime: function (targetBeginTime)
        {
            this.BeginTime = targetBeginTime;
        },

        setDuration: function (targetDuration)
        {
            this.Duration = targetDuration;
        }

    };

// ===========================  TranslateAnimation =========================================

// Class Constructor
var TranslateAnimation = function (constructorParameters)
{
    // ---------- Enumerations ----------

    // ---------- Properties ---------
    var self = this;  // had to use 'this' below... 'self' would not work!?!
    this.constructorParameters =
        $.extend
        (
            {
                XFrom: 0,
                XTo: 0,
                YFrom: 0,
                YTo: 0,
                BeginTime: 0,
                Duration: 1
            },
            constructorParameters
        );
    this.XFrom = this.constructorParameters.XFrom;
    this.XTo = this.constructorParameters.XTo;
    this.YFrom = this.constructorParameters.YFrom;
    this.YTo = this.constructorParameters.YTo;
    this.BeginTime = this.constructorParameters.BeginTime;
    this.Duration = this.constructorParameters.Duration;
};

// Class Implementation
TranslateAnimation.prototype =
    {
        // ------------ Methods -----------

        setXFrom: function (targetXFrom)
        {
            this.XFrom = targetXFrom;
        },

        setXTo: function (targetXTo)
        {
            this.XTo = targetXTo;
        },

        setYFrom: function (targetYFrom)
        {
            this.YFrom = targetYFrom;
        },

        setYTo: function (targetYTo)
        {
            this.YTo = targetYTo;
        },

        setBeginTime: function (targetBeginTime)
        {
            this.BeginTime = targetBeginTime;
        },

        setDuration: function (targetDuration)
        {
            this.Duration = targetDuration;
        }

    };
