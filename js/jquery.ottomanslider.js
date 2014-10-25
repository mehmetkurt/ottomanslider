/* MEHMET KURT - 2013 - Telif Hakkı falan yok :) 
 * info@mehmetkurt.com.tr
 * http://www.mehmetkurt.com.tr
 * 
 */
$(document).ready(function () {
    //alert('a');
    $('#ottomanslider').ottomanslider({
        padding: 10,
        copyTitle: true
    });

});

/* */
(function ($) {
    $.fn.ottomanslider = function (options) {

        var defaults = {
            caret: 'bigcaret',
            animate: true,
            padLeft: 10,
            padRight: 10,
            padTop: 10,
            padBottom: 10,
            padding: 0,
            copyTitle: false
        };

        var settings = $.extend(defaults, options);

        var mainImage = this.find('.main-image');
        var _height = mainImage.height();

        var oldBg = '';
        this.find('.thumb').hover(
                 function () {
                     var bg = $(this).attr('data-bg');
                     oldBg = mainImage.css('background-image');
                     mainImage.css('background-image', 'url(' + bg + ')');
                 },
                 function () {
                     mainImage.css('background-image', 'url(' + oldBg + ')');
                 }
             );

        this.find('.thumb').each(function () {
            var id = $(this).attr('data-id');
            var bg = $(this).attr('data-bg');
            var thumb = $(this);

            var menuString = '<div class="menu"><h5>Başlık</h5></div>';
            thumb.append(menuString);

            $.each(data, function (key, value) {
                var menu = value.menu;
                if (menu.id == id) {
                    var innerMenu = thumb.find('.menu');
                    innerMenu.find('h5').html(menu.title);

                    if (menu.item.length > 0)
                        innerMenu.append('<ul></ul>');

                    $.each(menu.item, function (k, item) {
                        var text = item.text;
                        var url = item.url;
                        var title = item.title;

                        innerMenu.find('ul').append(
                            $('<li/>', {
                                html: $('<a/>', {
                                    href: url,
                                    text: text,
                                    title: title
                                })
                            })
                        );
                    });
                }
            });

            /* DOSYADAN OKUYOR. LOCALDE ÇALIŞMAZ. IIS üzerinde yayınlamak için .json mime type tanımlanmalı. Eğer aşağıdaki satır açılırsa bir üstteki each kapatılmalı. bunuda bir ara otomatiğe bağlıcaz inşallah. */
            //var uri = "../slidermenu.json";
            //$.ajax({
            //    url: uri,
            //    async: true,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    cache: false,
            //    success: function (data) {
            //        $.each(data, function (key, value) {
            //            var menu = value.menu;
            //            if (menu.id == id) {
            //                var innerMenu = thumb.find('.menu');
            //                innerMenu.find('h5').html(menu.title);

            //                if (menu.item.length > 0)
            //                    innerMenu.append('<ul></ul>');

            //                $.each(menu.item, function (k, item) {
            //                    var text = item.text;
            //                    var url = item.url;
            //                    var title = item.title;

            //                    innerMenu.find('ul').append(
            //                        $('<li/>', {
            //                            html: $('<a/>', {
            //                                href: url,
            //                                text: text,
            //                                title: title
            //                            })
            //                        })
            //                    );
            //                });
            //            }
            //        });
            //    },
            //    error: function (xhr, ajaxOptions, thrownError) {
            //        console.log(thrownError);
            //    }
            //});

            var padLR = settings.padLeft + settings.padRight;
            var padTB = settings.padTop + settings.padBottom;

            if (settings.padding > 0) {
                padLR = settings.padding * 2;
                padTB = settings.padding * 2;
            }

            var _width = $(this).width() - padLR;
            $(this).find('.menu').width(_width).height(_height - padTB);

            if (settings.copyTitle) {
                $(this).find('.menu h5').html($(this).find('.button').html());
            }

            return this;
        });
    }
}(jQuery));