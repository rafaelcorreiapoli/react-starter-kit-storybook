import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/components/TodoList/stories');
  require('../src/components/Counter/stories');
  // require as many stories as you need.
}

configure(loadStories, module);
