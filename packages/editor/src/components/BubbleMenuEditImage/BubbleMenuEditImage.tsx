import {
  ImageSizeLarge,
  ImageSizeMedium,
  ImageSizeSmall,
  Wand,
} from "@edifice-ui/icons";
import { Button, IconButton, Tooltip } from "@edifice-ui/react";
import { Editor } from "@tiptap/react";
import { useTranslation } from "react-i18next";

interface ButtonSize {
  icon: JSX.Element;
  sizeName: string;
  size: {
    width: number;
    height: number | string;
  };
}

const BubbleMenuEditImage = ({
  editor,
  onEditImage,
}: {
  editor: Editor;
  onEditImage: () => void;
}) => {
  const { t } = useTranslation();

  const buttonSizeList = [
    {
      icon: <ImageSizeSmall />,
      label: "tiptap.tooltip.bubblemenu.image.small",
      sizeName: "small",
      size: {
        width: 250,
        height: "auto",
      },
    },
    {
      icon: <ImageSizeMedium />,
      label: "tiptap.tooltip.bubblemenu.image.medium",
      sizeName: "medium",
      size: {
        width: 350,
        height: "auto",
      },
    },
    {
      icon: <ImageSizeLarge />,
      label: "tiptap.tooltip.bubblemenu.image.big",
      sizeName: "large",
      size: {
        width: 500,
        height: "auto",
      },
    },
  ];

  const handleButtonClick = (buttonSize: ButtonSize) => {
    editor
      .chain()
      .focus()
      .setAttributes({
        width: buttonSize.size.width,
        height: buttonSize.size.height,
        size: buttonSize.sizeName,
      })
      .run();
  };

  const { selection } = editor.view.state;

  const selectedNode = editor.view.state.doc.nodeAt(selection.anchor);

  return (
    <div className="bubble-menu">
      <Tooltip
        message={t("tiptap.tooltip.bubblemenu.image.edit")}
        placement="top"
      >
        <Button
          size="lg"
          variant="ghost"
          leftIcon={<Wand />}
          color="secondary"
          onClick={onEditImage}
        >
          {t("tiptap.bubblemenu.edit")}
        </Button>
      </Tooltip>
      <div className="vr"></div>
      {buttonSizeList.map((button, index) => (
        <Tooltip key={index} message={t(button.label)} placement="top">
          <IconButton
            className={
              selectedNode?.attrs?.size === button.sizeName &&
              selectedNode?.attrs?.width === button.size.width
                ? "is-selected"
                : ""
            }
            aria-label="Delete"
            icon={button.icon}
            variant="ghost"
            color="tertiary"
            onClick={() => {
              handleButtonClick(button);
            }}
          />
        </Tooltip>
      ))}
    </div>
  );
};

export default BubbleMenuEditImage;
