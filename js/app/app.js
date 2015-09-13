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

// Define Notes Controller
Notes.NotesController = Ember.ArrayController.extend({
    needs: ['notesNote'],
    newNoteName: null, // Binds newNoteName property to text field
    selectedNoteBinding: 'controllers.notesNote.model',
    actions: {
        createNewNote: function() { // Define createNewNote action
            var content = this.get('content');
            var newNoteName = this.get('newNoteName');
            var unique = newNoteName != null && newNoteName.length > 1;
            content.forEach(function(note) {
                if (newNoteName === note.get('name')) {
                    unique = false;
                    return;
                }
            });
            if (unique) {
                var newNote = this.store.createRecord('note');
                newNote.set('id', newNoteName);
                newNote.set('name', newNoteName);
                newNote.save();

                this.set('newNoteName', null);
            } else {
                alert('Note must have a unique name of at least 2 characters!');
            }
        },
        doDeleteNote: function(note) {
            this.set('noteForDeletion', note);
            $("#confirmDeleteNoteDialog").modal({"show": true});
        },
        doCancelDelete: function() {
            this.set('noteForDeletion', null);
            $("#confirmDeleteNoteDialog").modal('hide');
        },
        doConfirmDelete: function() {
            var selectedNote = this.get('noteForDeletion');
            this.set('noteForDeletion', null);
            if (selectedNote) {
                this.store.deleteRecord(selectedNote);
                selectedNote.save();
                if (this.get('controllers.notesNote.model.id') === selectedNote.get('id')) {
                    this.transitionToRoute('notes');
                }
            }
            $("#confirmDeleteNoteDialog").modal('hide');
        }
    }
});

// Define NotesNoteController
Notes.NotesNoteController = Ember.ObjectController.extend({
   actions: {
       updateNote: function() {
           var content = this.get('content');
           console.log(content);
           if (content) {
               content.save();
           }
       }
   }
});

// Create Notes.Store class extending Ember Data's DS.Store
Notes.ApplicationStore = DS.Store.extend({
    adapter: DS.LSAdapter // Use Local Storage Adapter
})

// Create Note model object definition
Notes.Note = DS.Model.extend({
    name: DS.attr('string'),
    value: DS.attr('string'),

    introduction: function() {
        var intro = "";

        if (this.get('value')) {
            intro = this.get('value').substring(0,21);
        } 
        return intro; 
    }.property('value')
})
