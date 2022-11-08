const chai = require('chai');

const { assert } = chai;

const Translator = require('../components/translator');

const translator = new Translator();

suite('Unit Tests', () => {
  suite('To British English', () => {
    test('#1', (done) => {
      assert.equal(
        translator.translate('Mangoes are my favorite fruit.', 'american-to-british'),
        'Mangoes are my favourite fruit.',
      );
      done();
    });
    test('#2', (done) => {
      assert.equal(
        translator.translate('I ate yogurt for breakfast.', 'american-to-british'),
        'I ate yoghurt for breakfast.',
      );
      done();
    });
    test('#3', (done) => {
      assert.equal(
        translator.translate("We had a party at my friend's condo.", 'american-to-british'),
        "We had a party at my friend's flat.",
      );
      done();
    });
    test('#4', (done) => {
      assert.equal(
        translator.translate('Can you toss this in the trashcan for me?', 'american-to-british'),
        'Can you toss this in the bin for me?',
      );
      done();
    });
    test('#5', (done) => {
      assert.equal(
        translator.translate('The parking lot was full.', 'american-to-british'),
        'The car park was full.',
      );
      done();
    });
    test('#6', (done) => {
      assert.equal(
        translator.translate('Like a high tech Rube Goldberg machine.', 'american-to-british'),
        'Like a high tech Heath Robinson device.',
      );
      done();
    });
    test('#7', (done) => {
      assert.equal(
        translator.translate('To play hooky means to skip class or work.', 'american-to-british'),
        'To bunk off means to skip class or work.',
      );
      done();
    });
    test('#8', (done) => {
      assert.equal(
        translator.translate('No Mr. Bond, I expect you to die.', 'american-to-british'),
        'No Mr Bond, I expect you to die.',
      );
      done();
    });
    test('#9', (done) => {
      assert.equal(
        translator.translate('Dr. Grosh will see you now.', 'american-to-british'),
        'Dr Grosh will see you now.',
      );
      done();
    });
    test('#10', (done) => {
      assert.equal(
        translator.translate('Lunch is at 12:15 today.', 'american-to-british'),
        'Lunch is at 12.15 today.',
      );
      done();
    });
  });

  suite('To American English', () => {
    test('#1', (done) => {
      assert.equal(
        translator.translate('We watched the footie match for a while.', 'british-to-american'),
        'We watched the soccer match for a while.',
      );
      done();
    });
    test('#2', (done) => {
      assert.equal(
        translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american'),
        'Tylenol takes up to an hour to work.',
      );
      done();
    });
    test('#3', (done) => {
      assert.equal(
        translator.translate('First, caramelise the onions.', 'british-to-american'),
        'First, caramelize the onions.',
      );
      done();
    });
    test('#4', (done) => {
      assert.equal(
        translator.translate('I spent the bank holiday at the funfair.', 'british-to-american'),
        'I spent the public holiday at the carnival.',
      );
      done();
    });
    test('#5', (done) => {
      assert.equal(
        translator.translate('I had a bicky then went to the chippy.', 'british-to-american'),
        'I had a cookie then went to the fish-and-chip shop.',
      );
      done();
    });
    test('#6', (done) => {
      assert.equal(
        translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american'),
        "I've just got odds and ends in my fanny pack.",
      );
      done();
    });
    test('#7', (done) => {
      assert.equal(
        translator.translate('The car boot sale at Boxted Airfield was called off.', 'british-to-american'),
        'The swap meet at Boxted Airfield was called off.',
      );
      done();
    });
    test('#8', (done) => {
      assert.equal(
        translator.translate('Have you met Mrs Kalyani?', 'british-to-american'),
        'Have you met Mrs. Kalyani?',
      );
      done();
    });
    test('#9', (done) => {
      assert.equal(
        translator.translate("Prof Joyner of King's College, London.", 'british-to-american'),
        "Prof. Joyner of King's College, London.",
      );
      done();
    });
    test('#10', (done) => {
      assert.equal(
        translator.translate('Tea time is usually around 4 or 4.30.', 'british-to-american'),
        'Tea time is usually around 4 or 4:30.',
      );
      done();
    });
  });
  suite('Highlight translation', () => {
    test('#21', (done) => {
      assert.equal(
        translator.translate('Mangoes are my favorite fruit.', 'american-to-british', true),
        'Mangoes are my <span class="highlight">favourite</span> fruit.',
      );
      done();
    });
    test('#22', (done) => {
      assert.equal(
        translator.translate('I ate yogurt for breakfast.', 'american-to-british', true),
        'I ate <span class="highlight">yoghurt</span> for breakfast.',
      );
      done();
    });
    test('#23', (done) => {
      assert.equal(
        translator.translate('We watched the footie match for a while.', 'british-to-american', true),
        'We watched the <span class="highlight">soccer</span> match for a while.',
      );
      done();
    });
    test('#24', (done) => {
      assert.equal(
        translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american', true),
        '<span class="highlight">Tylenol</span> takes up to an hour to work.',
      );
      done();
    });
  });
});
