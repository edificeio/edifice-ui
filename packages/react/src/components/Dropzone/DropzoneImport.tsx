import { Download } from "@edifice-ui/icons";
import { useTranslation } from "react-i18next";

import { useDropzoneContext } from "./DropzoneContext";
import { Button } from "../Button";

const DropzoneImport = () => {
  const { t } = useTranslation();
  const { inputRef, importMessage } = useDropzoneContext();

  return (
    <div className="import-wrapper">
      <Download height={48} width={48} />
      <p className="my-16">{importMessage}</p>
      <Button onClick={() => inputRef?.current?.click()}>{t("import")}</Button>
    </div>
  );
};

DropzoneImport.displayName = "Dropzone.Import";

export default DropzoneImport;
