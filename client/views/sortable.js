Template.sortable.helpers({
    
    getValue: function(ctx) {
        return this[ctx.listValue||'value'];
    },
    
    getLabel: function(ctx) {
        return this[ctx.listLabel||'text'];
    },
    
    getKey: function(ctx) {
        return ctx.sortKeys ? ctx.sortKeys[this.__count] : '';
    }
    
});

Template.sortable.created = function() {
    Meteor.Loader.loadCss('/lib/jquery-ui/jquery-ui-1.10.3.custom.min.css');
    Meteor.Loader.loadJs('/lib/jquery-ui/jquery-ui-1.10.3.custom.min.js', function() {
        Session.set('hasJqueryUI',true);
    });
};

Template.sortable.rendered = function() {
    var that = this;
    Session.whenTrue('hasJqueryUI', function() {
        $('.sortable').sortable({
            connectWith:    ".sortable",
            cancel:         ".dontsort",
            update: function(evt,ui) {

                var list = $(evt.target);
                if(!list.hasClass('ui-sortable'))   return;
                var children = list.children(),
                    count = children.length;
                if(count>1 && list.has('li.dontsort'))
                    list.find('.dontsort').remove();
                else if(count==0)
                    list.append('<li class="dontsort">Nothing to sort.</li>');
                
                var ids =_.map(children, function(child) {
                        return $(child).data('id');
                    });
                
                if(this.data && this.data.session)
                    Session.set(this.data.session, ids);
            }
        });
    });
};