import { Meta, StoryObj } from '@storybook/react';

import Dropdown from '../Dropdown';
import { useState } from 'react';
import { Filter } from '@edifice-ui/icons';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Dropdown Radio Item',
  component: Dropdown,
  decorators: [(Story) => <div style={{ height: '25em' }}>{Story()}</div>],
  args: {
    label: 'Dropdown',
    icon: <Filter />,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Use `Dropdown.RadioItem` when only one choice can be selected at a time',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const RadioGroup: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');

    const handleOnChangeRadio = (value: string) => {
      setValue(value);
    };

    const radioOptions = [
      {
        label: 'Classe préparatoire',
        value: 'CP',
      },
      {
        label: 'Cours élémentaire 1',
        value: 'CM1',
      },
      {
        label: 'Cours élémentaire 2',
        value: 'CM2',
      },
    ];

    return (
      <Dropdown>
        <Dropdown.Trigger label={args.label} icon={args.icon} />
        <Dropdown.Menu>
          {radioOptions.map((option, index) => (
            <Dropdown.RadioItem
              key={index}
              value={option.value}
              model={value}
              onChange={() => handleOnChangeRadio(option.value)}
            >
              {option.label}
            </Dropdown.RadioItem>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  },
};
