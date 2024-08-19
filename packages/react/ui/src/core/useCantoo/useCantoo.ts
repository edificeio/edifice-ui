import { useEffect } from "react";
import { useHasWorkflow } from "../useHasWorkflow";

export default function useCantoo() {
  const hasWorkflow = useHasWorkflow(
    "org.entcore.portal.controllers.PortalController|optionalFeatureCantoo",
  );

  useEffect(() => {
    if (hasWorkflow) {
      fetch("/optionalFeature/cantoo")
        .then((res) => res.json())
        .then((data) => {
          const script = document.createElement("script");
          script.src = data.scriptPath;
          script.async = true;
          document.body.appendChild(script);
        });
    }
  }, [hasWorkflow]);

  return null;
}
