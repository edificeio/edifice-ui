import { RefAttributes } from "react";

import { Smiley } from "@edifice-ui/icons";
import { Dropdown, IconButton, IconButtonProps } from "@edifice-ui/react";
import EmojiPicker, { Categories } from "emoji-picker-react";
import { useTranslation } from "react-i18next";

import { useEditorContext } from "../../hooks/useEditorContext";

interface Props {
  /**
   * Props for the trigger
   */
  triggerProps: JSX.IntrinsicAttributes &
    Omit<IconButtonProps, "ref"> &
    RefAttributes<HTMLButtonElement>;
  /**
   * Tracks refs on ColorPickers.
   */
  itemRefs: any;
}

export const EditorToolbarEmoji = ({ triggerProps, itemRefs }: Props) => {
  const { t } = useTranslation();
  const { editor } = useEditorContext();

  return (
    <>
      <IconButton
        {...triggerProps}
        type="button"
        variant="ghost"
        color="tertiary"
        icon={<Smiley />}
        aria-label={t("Emojis")}
      />
      <Dropdown.Menu>
        <div ref={(el) => (itemRefs.current["emoji-picker"] = el)}>
          <EmojiPicker
            height={400}
            width={316}
            onEmojiClick={(emoji) =>
              editor?.commands.insertContentAt(
                editor.view.state.selection,
                emoji.emoji,
              )
            }
            previewConfig={{ showPreview: false }}
            searchPlaceHolder={t("Recherche")}
            categories={[
              {
                category: Categories.SUGGESTED,
                name: `${t("Utilisés récemment")}`,
              },
              {
                category: Categories.SMILEYS_PEOPLE,
                name: `${t("Personnes")}`,
              },
              {
                category: Categories.ANIMALS_NATURE,
                name: `${t("Animaux et nature")}`,
              },
              {
                category: Categories.FOOD_DRINK,
                name: `${t("Aliments et boissons")}`,
              },
              {
                category: Categories.TRAVEL_PLACES,
                name: `${t("Voyages et lieux")}`,
              },
              {
                category: Categories.ACTIVITIES,
                name: `${t("Activités")}`,
              },
              {
                category: Categories.OBJECTS,
                name: `${t("Objets")}`,
              },
              {
                category: Categories.SYMBOLS,
                name: `${t("Symbôles")}`,
              },
              {
                category: Categories.FLAGS,
                name: `${t("Drapeaux")}`,
              },
            ]}
          />
        </div>
      </Dropdown.Menu>
    </>
  );
};
