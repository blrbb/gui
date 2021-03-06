import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';

const configurationStub = Ember.Service.extend({
  apiKey: null
});

moduleForComponent('track-action-menu', 'Integration | Component | track action menu', {
  integration: true,
  beforeEach() {
    this.register('service:configuration', configurationStub);
    this.inject.service('configuration', { as: 'configuration' });

  }
});

test('it disables actions if api track is null', function(assert) {
  this.set('configuration.apiKey', 'aabbcc');
  this.set('track', null);
  this.render(hbs`{{track-action-menu track=track}}`);

  assert.ok(this.$(testSelector('fetch-btn')).hasClass('disabled'));
  assert.ok(this.$(testSelector('status-btn')).hasClass('disabled'));
});

test('it disables actions if api key is unset', function(assert) {
  this.set('track', {});
  this.render(hbs`{{track-action-menu track=track}}`);

  assert.ok(this.$(testSelector('fetch-btn')).hasClass('disabled'));
  assert.ok(this.$(testSelector('status-btn')).hasClass('disabled'));
});

test('it enables actions if api key is set', function(assert) {
  this.set('configuration.apiKey', 'aabbcc');
  this.set('track', {});
  this.render(hbs`{{track-action-menu track=track}}`);

  assert.notOk(this.$(testSelector('fetch-btn')).hasClass('disabled'));
  assert.notOk(this.$(testSelector('status-btn')).hasClass('disabled'));
});
