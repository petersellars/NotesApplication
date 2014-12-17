/**
 * Created by psellars on 10/11/14.
 */
var Notes = Ember.Application.create({

});

// Define the Application Router
Notes.Router.map(function () {
    this.resource('notes', {path: "/"}, function() {
        // Define subroute notes.note responding to URL '/note/:noteid'
        this.route('note', {path: "/note/:note_id"});
    });
})

// Define the Notes Route
Notes.NotesRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('note');
    }
})

// Define the NotesNote Route
Notes.NotesNoteRoute = Ember.Route.extend({
    model: function(note) {
        return this.store.find('note', note.note_id);
    }
})

// Create Notes.Store class extending Ember Data's DS.Store
Notes.ApplicationStore = DS.Store.extend({
    adapter: DS.LSAdapter // Use Local Storage Adapter
})

// Create Note model object definition
Notes.Note = DS.Model.extend({
    name: DS.attr('string'),
    value: DS.attr('string')
})
