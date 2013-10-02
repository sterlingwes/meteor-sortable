Package.describe({
    summary: "Sortable widget using jQuery UI"
});

Package.on_use(function(api) {
    
    api.use('standard-app-packages');
    api.use('external-file-loader');
    api.use('session-extras');
    
    api.add_files([
        'client/views/sortable.html',
        'client/views/sortable.js'
        
    ],'client');
    
});