import { useState } from "react";

import { Blur, Crop, Reset, Undo } from "@edifice-ui/icons";
import { useTranslation } from "react-i18next";

import { Button } from "../../../components";

export type ImageEditorAction = "ROTATE" | "UNDO" | "CROP" | "BLUR" | "RESIZE";
interface ImageEditorToolbarProps {
  historyCount: number;
  handle(operation: ImageEditorAction): void;
}

const ImageEditorToolbar = ({
  historyCount,
  handle,
}: ImageEditorToolbarProps) => {
  const { t } = useTranslation();
  const [action, setAction] = useState<ImageEditorAction | undefined>(
    undefined,
  );
  const handleAndSave = (action: ImageEditorAction) => {
    setAction(action);
    handle(action);
  };
  return (
    <div
      className="d-flex flex-row align-items-center justify-content-start gap-2 align-self-start mw-100"
      style={{ overflowX: "scroll" }}
    >
      <Button
        color="tertiary"
        type="button"
        variant="ghost"
        leftIcon={<Undo />}
        disabled={historyCount === 0}
        onClick={() => handleAndSave("UNDO")}
      >
        {t("cancel")}
      </Button>
      <span className="text-gray-400">&#10072;</span>
      <Button
        color="tertiary"
        type="button"
        variant="ghost"
        leftIcon={<Reset />}
        onClick={() => handleAndSave("ROTATE")}
      >
        {t("rotate")}
      </Button>
      <Button
        color="tertiary"
        type="button"
        variant="ghost"
        leftIcon={<Crop />}
        className={action === "CROP" ? "is-selected" : ""}
        onClick={() => handleAndSave("CROP")}
      >
        {t("crop")}
      </Button>
      <Button
        color="tertiary"
        type="button"
        variant="ghost"
        leftIcon={<Blur />}
        className={action === "BLUR" ? "is-selected" : ""}
        onClick={() => handleAndSave("BLUR")}
      >
        {t("blur")}
      </Button>
    </div>
  );
};
export default ImageEditorToolbar;
