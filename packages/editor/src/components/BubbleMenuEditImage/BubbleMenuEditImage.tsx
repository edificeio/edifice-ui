import { useMemo } from "react";

import {
  ImageSizeLarge,
  ImageSizeMedium,
  ImageSizeSmall,
  Wand,
} from "@edifice-ui/icons";
import { Button, IconButton, Tooltip } from "@edifice-ui/react";
import { Editor, BubbleMenu } from "@tiptap/react";
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
  openEditImage,
}: {
  editor: Editor;
  onEditImage: () => void;
  openEditImage: boolean;
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

  const tippyOptions: any = useMemo(() => {
    // Adjust a DOMRect to make it visible at a correct place.
    function adjustRect(rect: DOMRect) {
      let yOffset = 0;
      if (window.visualViewport) {
        const bottomScreen =
          window.innerHeight || document.documentElement.clientHeight;
        if (rect.bottom >= bottomScreen) {
          yOffset += rect.bottom - bottomScreen - rect.height;
        }
      }
      return new DOMRect(rect.x, rect.y - yOffset, rect.width, rect.height);
    }

    return {
      placement: "bottom-start",
      offset: [0, 0],
      zIndex: 999,
      duration: 100,
      // Try to get the bounding rect of the table.
      getReferenceClientRect: () => {
        const parentDiv = editor?.isActive("custom-image")
          ? editor.state.selection.$anchor
          : null;

        if (parentDiv) {
          const parentDomNode = editor?.view.nodeDOM(parentDiv.pos) as
            | HTMLElement
            | undefined;

          if (parentDomNode) {
            return adjustRect(parentDomNode.getBoundingClientRect());
          }
        }

        // This should never happen... but it keeps the transpiler happy.
        return new DOMRect(0, 0, 100, 100);
      },
    };
  }, [editor]);

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
    <BubbleMenu
      className={openEditImage ? "d-none" : ""}
      shouldShow={({ editor }) => {
        return editor.isActive("custom-image") && !openEditImage;
      }}
      editor={editor}
      tippyOptions={tippyOptions}
    >
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
    </BubbleMenu>
  );
};

export default BubbleMenuEditImage;
