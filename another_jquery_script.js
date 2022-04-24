$(document).ready(
    function()
    {
        $(".accordion #accordion").accordion(
            {
                collapsible:true
            }
        );
        $("#datepicker").datepicker(
            {
                dayNames:["Воскресенье", "Понедельник",
                          "Вторник", "Среда", "Четверг",
                          "Пятница", "Суббота"],
                dayNamesMin:["Вс", "Пн",
                             "Вт", "Ср", "Чт",
                             "Пт", "Сб"],
                firstDay: 1,
                monthNames:["Январь", "Февраль", "Март",
                            "Апрель", "Май", "Июнь",
                            "Июль", "Август", "Сентябрь",
                            "Октябрь", "Ноябрь", "Декабрь"],
                dateFormat: "dd/mm/yy",
                showAnim:"fadeIn"
            }
        );
        let progressbar = $("#progressbar");
        let progresslabel = $(".progress_label");
        let toggled = 0;
        progressbar.progressbar(
            {
                value:0,
                change: function()
                {
                    progresslabel.text(progressbar.progressbar("value") + "%");
                },
                complete: function()
                {
                    progresslabel.text("Изображение показано!");
                    if(toggled == 0)
                    {
                        $('#leo_image').toggleClass("shown_image hidden_image");
                        toggled++;
                    }
                }
            }
        )
        function progress()
        {
            let val = progressbar.progressbar("value") || 0;
            progressbar.progressbar("value", val+2);
            if(val<99)
            {
                setTimeout(progress,80)
            }
        }
        progressbar.click(
            function()
            {
                progress();
            }
        );
        $('#tabs').tabs();
    }
);

