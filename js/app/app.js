/**
 * Created by psellars on 10/11/14.
 */
var Notes = Ember.Application.create({

});

Notes.Router.map(function () {
    this.resource('notes', {path: "/"}, function() {
        this.route('note', {path: "/note/:note_id"});
    });
})