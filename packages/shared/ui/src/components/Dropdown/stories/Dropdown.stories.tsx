import { Meta, StoryObj } from '@storybook/react';

import { RefAttributes, useState } from 'react';
import {
  Copy,
  Cut,
  Delete,
  Edit,
  Filter,
  Print,
} from '../../../../../icons/dist';
import IconButton, { IconButtonProps } from '../../Button/IconButton';
import { ColorPicker, DefaultPalette } from '../../ColorPicker';
import Dropdown from '../Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Base',
  component: Dropdown,
  decorators: [(Story) => <div style={{ height: '400px' }}>{Story()}</div>],
  args: {
    block: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          '`Dropdown` Component with accessibility in mind (keyboard, mouse). It is fully customizable and accepts `Item`, `CheckboxItem`, `RadioItem`, `Separator` as compound components. A custom trigger can be used with a render prop. It comes with a custom hook `useDropdown` and can be use to create others dropdowns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Base: Story = {
  render: (args) => {
    return (
      <Dropdown {...args}>
        <Dropdown.Trigger label="Dropdown" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => alert('click')}>
            Dropdown Item
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  },
};

export const Hover: Story = {
  render: (args) => {
    return (
      <Dropdown isTriggerHovered={true}>
        <Dropdown.Trigger label="Dropdown" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => alert('click')}>
            Dropdown Item
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  },
};

export const MenuGroup: Story = {
  render: (args) => {
    return (
      <Dropdown>
        <Dropdown.Trigger label="Dropdown" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => alert('click')}>
            Dropdown Item
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.MenuGroup label="Title label">
            <Dropdown.Item>Dropdown Item</Dropdown.Item>
            <Dropdown.Item>Dropdown Item</Dropdown.Item>
          </Dropdown.MenuGroup>
          <Dropdown.Separator />
          <Dropdown.MenuGroup label="Title label">
            <Dropdown.Item>Dropdown Item</Dropdown.Item>
            <Dropdown.Item>Dropdown Item</Dropdown.Item>
          </Dropdown.MenuGroup>
          <Dropdown.Separator />
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`Dropdown.MenuGroup` is used when we need to have different sections. It accepts a prop `label` ',
      },
    },
  },
};

export const ActionMenu: Story = {
  render: (args) => {
    return (
      <Dropdown>
        <Dropdown.Trigger label="Action menu" />
        <Dropdown.Menu>
          <Dropdown.Item icon={<Edit />} onClick={() => alert('edit')}>
            Edit
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item icon={<Copy />} onClick={() => alert('copy')}>
            Copy
          </Dropdown.Item>
          <Dropdown.Item icon={<Cut />} onClick={() => alert('cut')}>
            Cut
          </Dropdown.Item>
          <Dropdown.Item icon={<Print />} onClick={() => alert('print')}>
            Print
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item icon={<Delete />} onClick={() => alert('delete')}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown.Trigger accepts a prop `icon`',
      },
    },
  },
};

export const CheckboxGroup: Story = {
  render: (args) => {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<
      (string | number)[]
    >([]);

    const handleMultiCheckbox = (value: string | number) => {
      let checked = [...selectedCheckboxes];
      const findIndex = checked.findIndex(
        (item: string | number): boolean => item === value,
      );

      if (!selectedCheckboxes.includes(value)) {
        checked = [...selectedCheckboxes, value];
      } else {
        checked = selectedCheckboxes.filter(
          (_, index: number) => index !== findIndex,
        );
      }

      setSelectedCheckboxes(checked);
    };

    const checkboxOptions = [
      { label: 'Choice 1', value: 1 },
      { label: 'Choice 2', value: 2 },
      { label: 'Choice 3', value: 3 },
    ];

    const count = selectedCheckboxes.length;

    return (
      <Dropdown>
        <Dropdown.Trigger
          label="Dropdown"
          icon={<Filter />}
          badgeContent={count}
        />
        <Dropdown.Menu>
          {checkboxOptions.map((option, index) => (
            <Dropdown.CheckboxItem
              key={index}
              value={option.value}
              model={selectedCheckboxes}
              onChange={() => handleMultiCheckbox(option.value)}
            >
              {option.label}
            </Dropdown.CheckboxItem>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  },
};

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
        <Dropdown.Trigger label="Dropdown" icon={<Filter />} />
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

export const Stack: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<
      (string | number)[]
    >([]);

    const handleOnChangeRadio = (value: string) => {
      setValue(value);
    };

    const handleMultiCheckbox = (value: string | number) => {
      let checked = [...selectedCheckboxes];
      const findIndex = checked.findIndex(
        (item: string | number): boolean => item === value,
      );

      if (!selectedCheckboxes.includes(value)) {
        checked = [...selectedCheckboxes, value];
      } else {
        checked = selectedCheckboxes.filter(
          (_, index: number) => index !== findIndex,
        );
      }

      setSelectedCheckboxes(checked);
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

    const checkboxOptions = [
      { label: 'Choice 1', value: 1 },
      { label: 'Choice 2', value: 2 },
      { label: 'Choice 3', value: 3 },
    ];

    return (
      <Dropdown>
        <Dropdown.Trigger label="Dropdown" icon={<Filter />} />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => console.log('click')}>
            Action label
          </Dropdown.Item>
          <Dropdown.Separator />
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
          <Dropdown.Separator />
          {checkboxOptions.map((option, index) => (
            <Dropdown.CheckboxItem
              key={index}
              value={option.value}
              model={selectedCheckboxes}
              onChange={() => handleMultiCheckbox(option.value)}
            >
              {option.label}
            </Dropdown.CheckboxItem>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`Dropdown` Component can accept any Dropdown Item to make your own custom dropdown',
      },
    },
  },
};

export const CustomTrigger: Story = {
  render: (args) => {
    return (
      <Dropdown>
        {(
          triggerProps: JSX.IntrinsicAttributes &
            Omit<IconButtonProps, 'ref'> &
            RefAttributes<HTMLButtonElement>,
        ) => (
          <>
            <IconButton
              {...triggerProps}
              type="button"
              aria-label="label"
              color="tertiary"
              variant="ghost"
              icon={<Edit />}
            />

            <Dropdown.Menu>
              <Dropdown.Item>Dropdown Item</Dropdown.Item>
              <Dropdown.Item>Dropdown Item</Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Any component can be used as a custom trigger when use as a function as children (render prop). It can access `triggerProps` to get required a11y attributes.',
      },
    },
  },
};

export const CustomMenu: Story = {
  render: (args) => {
    const [currentColor, setCurrentColor] = useState<string>('#4A4A4A');
    const handleOnChange = (color: string) => setCurrentColor(color);
    return (
      <Dropdown>
        {(
          triggerProps: JSX.IntrinsicAttributes &
            Omit<IconButtonProps, 'ref'> &
            RefAttributes<HTMLButtonElement>,
          itemRefs,
        ) => (
          <>
            <IconButton
              {...triggerProps}
              type="button"
              aria-label="label"
              color="tertiary"
              variant="ghost"
              icon={<Edit />}
            />

            <Dropdown.Menu>
              <ColorPicker
                ref={(el) => (itemRefs.current['color-picker'] = el)}
                palettes={[
                  {
                    ...DefaultPalette,
                    reset: { value: 'transparent', description: 'None' },
                  },
                ]}
                model={currentColor}
                onChange={handleOnChange}
              />
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'You can pass any Component inside `Dropdown.Menu` by exposing `itemRefs` (render prop) and adding a ref to your component `ref={(el) => (itemRefs.current[id] = el)}`',
      },
    },
  },
};
