import { CompositeDecorator } from 'draft-js';
import FakeSelect from './FakeSelect';

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

const generateDecorator = EntityChip => {
  if (EntityChip) {
    return new CompositeDecorator([
      {
        strategy: findEntities,
        component: EntityChip()
      },
      {
        strategy: findSelectedEntity,
        component: FakeSelect
      }
    ]);
  }
  return new CompositeDecorator([
    {
      strategy: findEntities,
      component: EntityChip
    },
    {
      strategy: findSelectedEntity,
      component: FakeSelect
    }
  ]);
};

export default generateDecorator;
