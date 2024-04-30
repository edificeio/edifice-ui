import TableExplorer from "./TableExplorer";
import { Meta, StoryObj } from "@storybook/react";
import { Checklist, Globe, Lock, Users } from "@edifice-ui/icons";
import { useState } from "react";
import { Checkbox } from "../Checkbox";

interface IRow {
  id: string;
  name: string;
  createdAt: number;
  creatorId: string;
  creatorName: string;
  modifiedAt: number;
  modifierId: string;
  modifierName: string;
  thumbnail: string;
  trashed: boolean;
  shared: boolean;
  numberOfShares: number;
  public: boolean;
  currentRole: string;
}

const sampleData: IRow[] = [
  {
    id: "1",
    name: "The form user",
    createdAt: 1677163550,
    creatorId: "1",
    creatorName: "Guillaume Tell",
    modifiedAt: 1677163550,
    modifierId: "1",
    modifierName: "Guillaume Tell",
    thumbnail:
      "https://media.istockphoto.com/id/1322277517/fr/photo/herbe-sauvage-dans-les-montagnes-au-coucher-du-soleil.jpg?s=612x612&w=0&k=20&c=tQ19uZQLlIFy8J6QWMyOL6lPt3pdSHBSDFHoXr1K_g0=",
    trashed: false,
    shared: true,
    numberOfShares: 49,
    public: true,
    currentRole: "Gestionnaire",
  },
  {
    id: "2",
    name: "Le blog des éco-délégués",
    createdAt: 1677163550,
    creatorId: "1",
    creatorName: "Guillaume Tell",
    modifiedAt: 1677163550,
    modifierId: "1",
    modifierName: "Guillaume Tell",
    thumbnail:
      "https://media.istockphoto.com/id/1322277517/fr/photo/herbe-sauvage-dans-les-montagnes-au-coucher-du-soleil.jpg?s=612x612&w=0&k=20&c=tQ19uZQLlIFy8J6QWMyOL6lPt3pdSHBSDFHoXr1K_g0=",
    trashed: false,
    shared: true,
    numberOfShares: 26,
    public: false,
    currentRole: "Gestionnaire",
  },
  {
    id: "3",
    name: "Le roman de renard",
    createdAt: 1677163550,
    creatorId: "1",
    creatorName: "Guillaume Tell",
    modifiedAt: 1677163550,
    modifierId: "1",
    modifierName: "Guillaume Tell",
    thumbnail:
      "https://media.istockphoto.com/id/1322277517/fr/photo/herbe-sauvage-dans-les-montagnes-au-coucher-du-soleil.jpg?s=612x612&w=0&k=20&c=tQ19uZQLlIFy8J6QWMyOL6lPt3pdSHBSDFHoXr1K_g0=",
    trashed: false,
    shared: true,
    numberOfShares: 12,
    public: true,
    currentRole: "Gestionnaire",
  },
  {
    id: "4",
    name: "La conjugaison pour les Nuls",
    createdAt: 1677163550,
    creatorId: "1",
    creatorName: "Guillaume Tell",
    modifiedAt: 1677163550,
    modifierId: "1",
    modifierName: "Guillaume Tell",
    thumbnail:
      "https://media.istockphoto.com/id/1322277517/fr/photo/herbe-sauvage-dans-les-montagnes-au-coucher-du-soleil.jpg?s=612x612&w=0&k=20&c=tQ19uZQLlIFy8J6QWMyOL6lPt3pdSHBSDFHoXr1K_g0=",
    trashed: false,
    shared: false,
    numberOfShares: 0,
    public: false,
    currentRole: "Gestionnaire",
  },
  {
    id: "5",
    name: "Qui était Jules César?",
    createdAt: 1677163550,
    creatorId: "1",
    creatorName: "Guillaume Tell",
    modifiedAt: 1677163550,
    modifierId: "1",
    modifierName: "Guillaume Tell",
    thumbnail:
      "https://media.istockphoto.com/id/1322277517/fr/photo/herbe-sauvage-dans-les-montagnes-au-coucher-du-soleil.jpg?s=612x612&w=0&k=20&c=tQ19uZQLlIFy8J6QWMyOL6lPt3pdSHBSDFHoXr1K_g0=",
    trashed: false,
    shared: true,
    numberOfShares: 29,
    public: false,
    currentRole: "Gestionnaire",
  },
];

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TableExplorer> = {
  title: "Components/TableExplorer",
  component: TableExplorer,
  parameters: {
    docs: {
      description: {
        component: "List view of resources.",
      },
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

export default meta;
type Story = StoryObj<typeof TableExplorer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: any) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const onSelectItem = (itemId: string) => {
    setSelectedItems((currentSelection: string[]) => {
      //state need to be immutable
      const newSelection = [...currentSelection];
      if (!newSelection.includes(itemId)) {
        newSelection.push(itemId);
      } else {
        newSelection.splice(newSelection.indexOf(itemId), 1); //deleting
      }
      return newSelection;
    });
  };

  const onSelectAllItems = (deselect: boolean) => {
    setSelectedItems(() => {
      return deselect ? [] : sampleData.map((item) => item.id);
    });
  };

  return (
    <div>
      <TableExplorer>
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={selectedItems.length === sampleData.length}
                indeterminate={
                  0 < selectedItems.length &&
                  selectedItems.length < sampleData.length
                }
                onChange={(e) => {
                  onSelectAllItems(selectedItems.length === sampleData.length);
                }}
              />
            </th>
            <th>Nom de la ressource</th>
            <th>Création</th>
            <th>Auteur</th>
            <th>Partage</th>
            <th>Dernière modif</th>
            <th>Rôle</th>
          </tr>
        </thead>

        <tbody>
          {sampleData.map((item: IRow) => (
            <tr>
              <td
                onClick={() => {
                  //On peut simplifier la sélection en la placant sur la cellule ou la ligne
                  onSelectItem(item.id);
                }}
              >
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onChange={() => {
                    //Logique déplaçée sur la cellule td
                    //onSelectItem(item.id);
                  }}
                />
              </td>
              <td>
                <div className="d-flex gap-8 align-items-center">
                  <Checklist width={20} height={20} /> <div>{item.name}</div>
                </div>
              </td>
              <td>{new Date(item.createdAt * 1000).toLocaleDateString()}</td>
              <td className="text-blue">{item.creatorName}</td>
              <td>
                <div className="d-flex align-items-center gap-4">
                  {item.public && <Globe width="16" height="16" />}
                  {item.shared && (
                    <>
                      <Users width="16" height="16" /> {item.numberOfShares}
                    </>
                  )}
                  {!item.public && !item.shared && (
                    <Lock width="16" height="16" />
                  )}
                </div>
              </td>
              <td className="fst-italic text-gray-700">Il y a 2 heures</td>
              <td className="fst-italic text-gray-700">{item.currentRole}</td>
            </tr>
          ))}
        </tbody>
      </TableExplorer>
    </div>
  );
};

export const Base: Story = {
  render: (args) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const onSelectItem = (itemId: string) => {
      setSelectedItems((currentSelection: string[]) => {
        //state need to be immutable
        const newSelection = [...currentSelection];
        if (!newSelection.includes(itemId)) {
          newSelection.push(itemId);
        } else {
          newSelection.splice(newSelection.indexOf(itemId), 1); //deleting
        }
        return newSelection;
      });
    };

    const onSelectAllItems = (deselect: boolean) => {
      setSelectedItems(() => {
        return deselect ? [] : sampleData.map((item) => item.id);
      });
    };

    return (
      <div>
        <TableExplorer>
          <thead>
            <tr>
              <th>
                <Checkbox
                  checked={selectedItems.length === sampleData.length}
                  indeterminate={
                    0 < selectedItems.length &&
                    selectedItems.length < sampleData.length
                  }
                  onChange={(e) => {
                    onSelectAllItems(
                      selectedItems.length === sampleData.length,
                    );
                  }}
                />
              </th>
              <th>Nom de la ressource</th>
              <th>Création</th>
              <th>Auteur</th>
              <th>Partage</th>
              <th>Dernière modif</th>
              <th>Rôle</th>
            </tr>
          </thead>

          <tbody>
            {sampleData.map((item: IRow) => (
              <tr>
                <td
                  onClick={() => {
                    //On peut simplifier la sélection en la placant sur la cellule ou la ligne
                    onSelectItem(item.id);
                  }}
                >
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => {
                      //Logique déplaçée sur la cellule td
                      //onSelectItem(item.id);
                    }}
                  />
                </td>
                <td>
                  <div className="d-flex gap-8 align-items-center">
                    <Checklist width={20} height={20} /> <div>{item.name}</div>
                  </div>
                </td>
                <td>{new Date(item.createdAt * 1000).toLocaleDateString()}</td>
                <td className="text-blue">{item.creatorName}</td>
                <td>
                  <div className="d-flex align-items-center gap-4">
                    {item.public && <Globe width="16" height="16" />}
                    {item.shared && (
                      <>
                        <Users width="16" height="16" /> {item.numberOfShares}
                      </>
                    )}
                    {!item.public && !item.shared && (
                      <Lock width="16" height="16" />
                    )}
                  </div>
                </td>
                <td className="fst-italic text-gray-700">Il y a 2 heures</td>
                <td className="fst-italic text-gray-700">{item.currentRole}</td>
              </tr>
            ))}
          </tbody>
        </TableExplorer>
      </div>
    );
  },
};
