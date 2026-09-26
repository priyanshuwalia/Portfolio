import { stack, levelLabel } from '../data/stack';
import { Section, SectionHead, Reveal } from '../components/ui';

const LEVELS = ['core', 'building', 'familiar'];

const Item = ({ item }) => {
  const Icon = item.icon;
  return (
    <li className="stack__item" data-level={item.level}>
      <span className="stack__icon" aria-hidden="true">
        {typeof Icon === 'string' ? Icon : <Icon />}
      </span>
      <span className="stack__name">{item.name}</span>
      <span className="stack__level">{levelLabel[item.level]}</span>
      <span className="stack__sheen" aria-hidden="true" />
    </li>
  );
};

const Group = ({ group, index }) => (
  <Reveal as="article" index={index} className="stack__group">
    <header className="stack__group-head">
      <h3 className="h3 stack__group-name">{group.name}</h3>
      <p className="stack__group-summary dim">{group.summary}</p>
    </header>

    <ul className="stack__items">
      {group.items.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </ul>
  </Reveal>
);

export const Stack = ({ section }) => {
  /**
   * One delegated listener for the whole grid instead of one per item. The
   * pointer offset is published as custom properties so the spotlight can be
   * pure CSS, which keeps 19 items off the React render path.
   */
  const trackPointer = (event) => {
    const item = event.target.closest('.stack__item');
    if (!item) return;
    const rect = item.getBoundingClientRect();
    item.style.setProperty('--x', `${event.clientX - rect.left}px`);
    item.style.setProperty('--y', `${event.clientY - rect.top}px`);
  };

  return (
    <Section id={section.id} aria-labelledby="stack-heading">
      <SectionHead
        index={section.index}
        label={section.label}
        title="What I reach for"
        lede="Weighted by how often something actually ends up in production. The learning column is honest about what's still in progress."
        aside={
          <ul className="stack__legend">
            {LEVELS.map((level) => (
              <li key={level} data-level={level}>
                {levelLabel[level]}
              </li>
            ))}
          </ul>
        }
      />

      <div className="stack__grid" onPointerMove={trackPointer}>
        {stack.map((group, index) => (
          <Group key={group.name} group={group} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default Stack;
