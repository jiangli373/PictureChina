/**
 * Created with JetBrains WebStorm.
 * User: jiangli
 * Date: 12-10-19
 * Time: 上午11:17
 * To change this template use File | Settings | File Templates.
 */
var picture = {
    init:function () {
    }
}
$(picture).init();

(function (picture) {

    picture.top_bar_flag = false;
    picture.data = {
        "columns":[
            { "picurl":"http://images.china.com.cn/attachement/jpg/site1000/20120912/002564bb20a211ba79f44e.jpg", "name":"新闻", "url":"http://www.china.com.cn/photo/zhuanti/7121183.xml", "color":"red" },
            { "picurl":"http://images.china.com.cn/attachement/jpg/site1000/20120914/002564bb20a211bd2c7006.jpg", "name":"人文", "url":"http://www.china.com.cn/photo/zhuanti/7121184.xml", "color":"blue" },
            { "picurl":"http://images.china.com.cn/attachement/jpg/site1000/20120914/002564bb20a211bd14be4c.jpg", "name":"美图", "url":"http://www.china.com.cn/photo/zhuanti/7121185.xml", "color":"green" },
            { "picurl":"http://images.china.com.cn/attachement/jpg/site1000/20120831/002564bb20a211aa6d741d.jpg", "name":"趣图", "url":"http://www.china.com.cn/photo/zhuanti/7121186.xml ", "color":"pink"}
        ]
    };
    //
    picture.columns_child = Backbone.View.extend({
        id:'columns-child',
        tagName:'div',
        render:function () {
            var view = this;
            $.each(picture.data.columns, function (index, value) {
                var template = Handlebars.compile($('#top_list_template').html());
                $(template(value)).appendTo(view.$el);
            });
            return this;
        }
    });
    picture.columns_parent = Backbone.View.extend({
        id:'columns-parent',
        render:function () {
            var view = this;
            var template = Handlebars.compile($('#top_bar_template').html());
            $(template()).appendTo(view.$el);
            var top_child = new picture.TopChild;
            top_child.render().$el.appendTo(view.$el);

            return this;
        },
        events:{
            'touchend #columns-bar':'changeStatus'
        },
        changeStatus:function () {
            var view = this;
            if (picture.top_bar_flag) {
                view.$el.css({
                    "-webkit-transform":"translate3d(0px,0px,0px)"
                });
                picture.top_bar_flag = false;
            } else {
                view.$el.css({
                    "-webkit-transform":"translate3d(0px,190px,0px)"
                });
                picture.top_bar_flag = true;
            }

        }
    });
})
    (picture);