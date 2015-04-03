Package.describe({
  "summary": "Performance Monitoring for Meteor",
  "version": "2.20.1",
  "name": "artpolikarpov:kadira-server-only"
});

var npmModules = {
  "debug": "0.7.4",
  "request": "2.51.0",
  "pidusage": "0.1.1"
};

Npm.depends(npmModules);

Package.on_use(function(api) {
  configurePackage(api);
  api.export(['Kadira'], 'server');
});

Package.on_test(function(api) {
  configurePackage(api);
  api.use([
    'tinytest',
    'test-helpers'
  ], 'server');

  // common before
  api.add_files([
    'tests/models/base_error.js'
  ], 'server');

  // common server
  api.add_files([
    'tests/utils.js',
    'tests/ntp.js',
    'tests/jobs.js',
    'tests/_helpers/globals.js',
    'tests/_helpers/helpers.js',
    'tests/_helpers/init.js',
    'tests/ping.js',
    'tests/hijack/info.js',
    'tests/hijack/user.js',
    'tests/hijack/email.js',
    'tests/hijack/base.js',
    'tests/hijack/async.js',
    'tests/hijack/http.js',
    'tests/hijack/db.js',
    'tests/hijack/subscriptions.js',
    'tests/hijack/error.js',
    'tests/models/methods.js',
    'tests/models/pubsub.js',
    'tests/models/system.js',
    'tests/models/errors.js',
    'tests/tracer/tracer_store.js',
    'tests/tracer/tracer.js',
    'tests/tracer/default_filters.js',
    'tests/check_for_oplog.js',
    'tests/error_tracking.js',
    'tests/wait_time_builder.js',
    'tests/hijack/set_labels.js',
    'tests/environment_variables.js'
  ], 'server');

  // common after
  api.add_files([
    'tests/common/default_error_filters.js',
    'tests/common/send.js'
  ], 'server');
});

function configurePackage(api) {
  if(api.versionsFrom) {
    api.versionsFrom('METEOR@0.9.1', 'server');
    api.use('meteorhacks:meteorx@1.3.1', 'server');
    api.use('meteorhacks:zones@1.2.1', 'server', {weak: true});
  } else {
    // for Meteor releases <= 0.8.3
    // now, zones is a weak dependancy!
    // kadira on the client side knows how to handle it
    // api.use('zones');
    api.use('meteorx', 'server');
  }

  api.use([
    'minimongo', 'livedata', 'mongo-livedata', 'ejson',
    'underscore', 'http', 'email', 'random'
  ], 'server');

  // common before
  api.add_files([
    'lib/common/unify.js',
    'lib/models/base_error.js'
  ], 'server');

  // only server
  api.add_files([
    'lib/jobs.js',
    'lib/retry.js',
    'lib/utils.js',
    'lib/ntp.js',
    'lib/wait_time_builder.js',
    'lib/models/0model.js',
    'lib/models/methods.js',
    'lib/models/pubsub.js',
    'lib/models/system.js',
    'lib/models/errors.js',
    'lib/kadira.js',
    'lib/check_for_oplog.js',
    'lib/tracer/tracer.js',
    'lib/tracer/default_filters.js',
    'lib/tracer/tracer_store.js',
    'lib/hijack/wrap_server.js',
    'lib/hijack/wrap_session.js',
    'lib/hijack/wrap_subscription.js',
    'lib/hijack/wrap_observers.js',
    'lib/hijack/session.js',
    'lib/hijack/db.js',
    'lib/hijack/http.js',
    'lib/hijack/email.js',
    'lib/hijack/async.js',
    'lib/hijack/error.js',
    'lib/hijack/set_labels.js',
    'lib/environment_variables.js',
    'lib/auto_connect.js'
  ], 'server');

  // common after
  api.add_files([
    'lib/common/default_error_filters.js',
    'lib/common/send.js'
  ], 'server');
}
