let images_urls = [];
let images_names = [];
let cur_image = 0;
// Загрузка файла галереи с помощью AJAX
$(document).ready(function()
{
    $.ajax
    ({ 
        url: "gallery/gallery.json",
        success: function(data)
        {
            let gallery_name = data.gallery;
            let gallery_size = data.images.length;
            $(".ajax_load_info #json_no_info").attr('id',"json_good");
            $("#json_good").text('JSON-файл галереи "' + gallery_name +
            '" успешно загружен.');
            for(let i = 0; i < gallery_size; i++)
            {
                images_urls.push(data.images[i].file);
                images_names.push(data.images[i].name);
            }

            showPicture();
            setTimeout(checkStyle,200);
            setTimeout(doSlider,200);
        },
        error: function()
        {
            $(".ajax_load_info #json_no_info").attr('id',"json_bad");
            $("#json_bad").text('Не удалось загрузить файл галереи');
        }
    });

});

function showPicture()
{
    $(".ajax_load_demonstrate .gallery img").attr(
        {
            'src': images_urls[cur_image],
            'alt': images_names[cur_image]
        }
    );
    checkStyle();
}

$(".show_button#prev").click(function()
{
    if(cur_image > 0)
    {
        cur_image--;
        checkStyle();
        showPicture();
    }
});

$(".show_button#next").click(function()
{
    if(cur_image < images_urls.length-1)
    {
        cur_image++;
        checkStyle();
        showPicture();
    }
});

function checkStyle()
{
    if(cur_image == images_urls.length-1)
    {
        $('.show_button#next').css(
            {
                'background-color': 'gray',
                'color': 'rgb(223, 223, 223);'
            });
    } 
    else
    {
        $('.show_button#next').css(
            {
                'background-color': 'rgb(101, 214, 214)',
                'color': 'rgb(172, 172, 172);'
            });
    }
    if(cur_image == 0)
    {
        $('.show_button#prev').css(
            {
                'background-color': 'gray',
                'color': 'rgb(223, 223, 223);'
            });
    } 
    else
    {
        $('.show_button#prev').css(
            {
                'background-color': 'rgb(101, 214, 214)',
                'color': 'rgb(172, 172, 172);'
            });
    }
    let img = $('.ajax_load_demonstrate .gallery img');
    $('.ajax_load_demonstrate .gallery').css(
        {
            'width' : img.width(),
            'height': img.height()
        }
    );
    if(resize == 0)
    $('.slider_div').css(
        {
            'margin-top' : img.height()/(10) + 'px' 
        }
    );
    if(resize == 1)
    $('.slider_div').css(
        {
            'margin-top' : img.height()/(3) + 'px' 
        }
    );
};

let resize = 0;

// Обработка клика по img
$('.ajax_load_demonstrate .gallery img').click(function()
{
    let img = $('.ajax_load_demonstrate .gallery img');
    if(resize == 0)
    {
        img.width(img.width()*1.3);
        resize = 1;
    }
    else
    if(resize == 1)
    {
        img.width(img.width()/1.3);
        resize = 0;
    }
    checkStyle();
});

// Слайдер
function doSlider()
{
    $('#slider').slider(
        {
            value: 0,
            min: 0,
            max: images_urls.length-1,
            step: 1,
            slide: function(event,ui)
            {
                cur_image = ui.value;
                showPicture();
            }
        }
    );
}