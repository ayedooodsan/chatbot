import { CompositeDecorator } from 'draft-js';
import EntityChip from '../EntityChip';
import FakeSelect from '../FakeSelect';

const findSelectedEntity = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'SELECT-WORD'
    );
  }, callback);
};

const findEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'ENTITY'
    );
  }, callback);
};

const decorator = new CompositeDecorator([
  {
    strategy: findEntities,
    component: EntityChip
  },
  {
    strategy: findSelectedEntity,
    component: FakeSelect
  }
]);

export default decorator;
