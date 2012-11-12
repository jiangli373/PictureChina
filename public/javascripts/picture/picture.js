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
    picture.currentIndex = 0;
    picture.movelength = 0;
    picture.pageLength = 1024;
    picture.beginX;
    picture.sumpages = 1;
    picture.maxMoveLength = 300;
    picture.flexflag = false;
    picture.imgscale = true;
    picture.data = {
        "columns":[
            { "picurl":"http://images.china.com.cn/attachement/jpg/site1000/20120912/002564bb20a211ba79f44e.jpg", "name":"新闻", "url":"http://www.china.com.cn/photo/zhuanti/7121183.xml", "color":"red" },
            { "picurl":"http://images.china.com.cn/attachement/jpg/site1000/20120914/002564bb20a211bd2c7006.jpg", "name":"人文", "url":"http://www.china.com.cn/photo/zhuanti/7121184.xml", "color":"blue" },
            { "picurl":"http://images.china.com.cn/attachement/jpg/site1000/20120914/002564bb20a211bd14be4c.jpg", "name":"美图", "url":"http://www.china.com.cn/photo/zhuanti/7121185.xml", "color":"green" },
            { "picurl":"http://images.china.com.cn/attachement/jpg/site1000/20120831/002564bb20a211aa6d741d.jpg", "name":"趣图", "url":"http://www.china.com.cn/photo/zhuanti/7121186.xml ", "color":"pink"}
        ]
    };
    //
    picture.columns_child_view = Backbone.View.extend({
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

    picture.columns_bar_view = Backbone.View.extend({
        id:'columns-bar',
        render:function () {
            var view = this;
            var template = Handlebars.compile($('#top_bar_template').html());
            $(template()).appendTo(view.$el);
            return this;
        }
    });

    picture.columns_parent_view = Backbone.View.extend({
        id:'columns-parent',
        initialize:function () {
            this.columns_bar = new picture.columns_bar_view;
            this.top_child = new picture.columns_child_view;
        },
        render:function () {
            var view = this;
            this.columns_bar.render().$el.appendTo(view.$el);
            this.top_child.render().$el.appendTo(view.$el);
            return this;
        },
        events:{
            'touchend':'changeStatus'
        },
        changeStatus:function () {
            var view = this;
            if (picture.top_bar_flag) {
                view.$el.css({
                    '-webkit-transform':'translate3d(0px,0px,10px)',
                    '-webkit-transform-style':'preserve-3d',
                    '-webkit-transition-duration':'0.5s',
                    '-webkit-transition-timing-function':'easy-out'
                });
                picture.top_bar_flag = false;
            } else {
                view.$el.css({
                    "-webkit-transform":"translate3d(0px,190px,10px)",
                    '-webkit-transform-style':'preserve-3d',
                    '-webkit-transition-duration':'0.5s',
                    '-webkit-transition-timing-function':'easy-out'
                });
                picture.top_bar_flag = true;
            }
        }
    });
    picture.main_page_view = Backbone.View.extend({
        id:'',
        tagName:'div',
        render:function () {

        }
    });


    picture.imageView = Backbone.View.extend({
        'tagName':'div',
        'className':'imgdiv',
        render:function (left, top) {
            var template = Handlebars.compile($('#innner_img_template').html());
            $(template()).appendTo(this.$el);
            this.$el.css({
                "-webkit-transform-style":"preserve-3d",
                "top":top + "px",
                "left":left + "px"
            });
            return this;
        },
        events:{
            "touchend":"touchend"
        },
        touchend:function () {
            if (picture.imgscale) {
                console.log(this.$el.position().left);
                console.log(picture.currentIndex);
                console.log(picture.pageLength);
                var thisleft = this.$el.position().left;
                console.log(thisleft);
                this.$el.css({
                    'width':'1024px',
                    'height':'768px',
                    '-webkit-transform-origin':'0 0',
                    "-webkit-transform":"translate3d(-" + thisleft + "px,-" + (this.$el.position().top) + "px,2px)",
                    "-webkit-transition-duration":"0.5s",
                    "-webkit-transform-style":"preserve-3d"
                });
            } else {
                this.$el.css({
                    'width':"206px",
                    'height':"180px",
                    "-webkit-transform":"translate3d(0px,0px,0px)",
                    "-webkit-transition-duration":"0.5s",
                    "-webkit-transform-style":"preserve-3d"
                });
            }
            picture.imgscale = !picture.imgscale;
        }
    });

    picture.PageContentView = Backbone.View.extend({
        'tagName':'div',
        'id':'innerContent',
        render:function () {
            this.$el.css({
                "-webkit-transform-style":"preserve-3d",
                width:'2048px'
            });
            var j = 0, k = 0;
            for (var i = 0; i < 24; i++) {
                if (i % 4 == 0 && i != 0 && i % 12 != 0) {
                    j++;
                }
                if (i % 12 == 0 && i != 0) {
                    k++;
                    j = 0;
                }
                var imgview = new picture.imageView;
                imgview.render((k) * picture.pageLength + (i % 4) * 236 + 40, 0 + (j) * 200).$el.appendTo(this.$el);
            }
            return this;
        },
        touchmove:function (positionX) {
            this.$el.css({
                "-webkit-transform-style":"preserve-3d",
                '-webkit-transform':'translate(' + positionX + 'px,0)',
                '-webkit-transition-duration':'0s'
            });
        },

        touchend:function (currentIndex) {
            this.$el.css({
                "-webkit-transform-style":"preserve-3d",
                "-webkit-transition-duration":"0.5s",
                "-webkit-transition-timing-function":"ease-out",
                "-webkit-transform":"translate(-" + (picture.pageLength * currentIndex) + "px,0)"
            });
        },

        touchendBack:function (currentIndex) {
            this.$el.css({
                "-webkit-transform-style":"preserve-3d",
                "-webkit-transition-duration":"0.2s",
                "-webkit-transition-timing-function":"linear",
                "-webkit-transform":"translate(-" + (picture.pageLength * currentIndex) + "px,0)"
            });
        }
    });

    picture.PageControlView = Backbone.View.extend({
        'tagName':'div',
        'id':'content',
        initialize:function () {
            this.pageContentView = new picture.PageContentView;
        },
        render:function () {
            this.pageContentView.render().$el.appendTo(this.el);
            return this;
        },
        events:{
            'touchstart  ':'touchstart',
            'touchmove  ':'touchmove',
            'touchend  ':'touchend'
        },
        touchstart:function (e) {
            e.preventDefault();
            picture.movelength = 0;
            picture.beginX = e.originalEvent.targetTouches[0].pageX;
        },
        touchmove:function (e) {
            e.preventDefault();
            picture.movelength = e.originalEvent.targetTouches[0].pageX - picture.beginX;
            if ((picture.currentIndex == 0 && picture.movelength > 0) || (picture.currentIndex == picture.sumpages && picture.movelength < 0)) {
                picture.flexflag = true;
                var positionX = -picture.currentIndex * picture.pageLength + picture.movelength / 3;
                this.pageContentView.touchmove(positionX);
            } else {
                picture.flexflag = false;
                var positionX = -picture.currentIndex * picture.pageLength + picture.movelength;
                this.pageContentView.touchmove(positionX);
            }
        },
        touchend:function (e) {
            e.preventDefault();

            if (picture.flexflag) {
                this.pageContentView.touchendBack(picture.currentIndex);
            } else {
                if (Math.abs(picture.movelength) > picture.maxMoveLength) {
                    if (picture.movelength < 0) {
                        if (picture.currentIndex < this.pageContentView.$el.width() / picture.pageLength - 1) {
                            picture.currentIndex++;
                        }
                    } else {
                        if (picture.currentIndex > 0) {
                            picture.currentIndex--;
                        }
                    }
                }
                this.pageContentView.touchend(picture.currentIndex);
            }

        }
    });

})(picture);