const assert = require('power-assert');
const render = require('../src/render.js');

const template = `
import 'react' from React;

export default class <%= name %> {
  render {
    return (
      <h1>Hello, <%= name %> Component!</h1>
    )
  }
}
`;

describe('render', () => {
  describe('valid params', () => {
    it('can render ejs', () => {
      const rendered = render(template, { name: 'Test' });
      assert(rendered.match('<h1>(.*)</h1>')[1], 'Hello, Test Component!');
    });
  });

  describe('invalid params', () => {
    it('causes ReferenceError', () => {
      assert.throws(render.bind(null, template, { }), (error) => {
        assert(error instanceof ReferenceError);
        assert(error.message.match('name is not defined'));
        return true;
      });
    });
  });
});

