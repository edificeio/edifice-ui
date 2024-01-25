import ExternalLinker, { IExternalLink } from "../../Linker/ExternalLinker";
import { useMediaLibraryContext } from "../MediaLibraryContext";

export type ExternalLinkTabProps = {
  enabledTextEdition?: boolean;
  link?: Partial<IExternalLink>;
};

export const ExternalLink = ({
  link,
  enabledTextEdition = true,
}: ExternalLinkTabProps) => {
  const { setResult } = useMediaLibraryContext();

  const handleLinkChange = (link?: IExternalLink) => {
    setResult(link);
  };

  return (
    <ExternalLinker
      link={link}
      onChange={handleLinkChange}
      enabledTextEdition={enabledTextEdition}
    />
  );
};
