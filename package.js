Package.describe({
  name: 'jimmiebtlr:react-scrollspy',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3-modules-beta.4');
  api.use([
    'ecmascript',
    'modules',
    'react@0.14.3_1',
    'velocityjs:velocityjs@1.2.1',
    'saeho:immutablejs@3.7.5',
  ],'client');
  api.addFiles([
    'scrollspy.jsx',
    'scrollspy.css',
  ],'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jimmiebtlr:react-scrollspy');
});
