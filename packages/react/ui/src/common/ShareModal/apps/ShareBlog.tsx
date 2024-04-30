import { useState, ChangeEvent } from "react";

import { UseMutationResult } from "@tanstack/react-query";
import {
  BlogResource,
  BlogUpdate,
  UpdateParameters,
  UpdateResult,
  odeServices,
} from "edifice-ts-client";
import { useTranslation } from "react-i18next";

import { useOdeClient, Heading, Radio } from "../../..";

export type PublicationType = "RESTRAINT" | "IMMEDIATE" | undefined;

export interface ShareBlogProps {
  resource: BlogResource;
  updateResource?: UseMutationResult<
    UpdateResult,
    unknown,
    UpdateParameters,
    unknown
  >;
}

export default function ShareBlog({
  resource,
  updateResource,
}: ShareBlogProps) {
  const { appCode } = useOdeClient();
  const { t } = useTranslation(appCode);

  const publishType = resource && resource["publish-type"];

  const [radioPublicationValue, setRadioPublicationValue] =
    useState<PublicationType>(publishType ?? "RESTRAINT");

  const handleRadioPublicationChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value as PublicationType;
    (async () => {
      const params = {
        description: resource.description || "",
        entId: resource.assetId,
        name: resource.name,
        public: !!resource.public,
        slug: resource.slug || "",
        thumbnail: resource.thumbnail,
        trashed: resource.trashed,
        "publish-type": value,
      } as BlogUpdate;

      if (updateResource) {
        await updateResource.mutateAsync(params);
      } else {
        await odeServices.resource("blog").update(params);
      }

      setRadioPublicationValue(value);
    })();
  };

  return (
    <>
      <hr />

      <Heading headingStyle="h4" level="h3" className="mb-16">
        {t("explorer.publication.steps")}
      </Heading>
      <Radio
        label={t("explorer.immediat.publication")}
        id="publication-now"
        name="publication"
        value={"IMMEDIATE" as PublicationType}
        model={radioPublicationValue as string}
        checked={radioPublicationValue === "IMMEDIATE"}
        onChange={handleRadioPublicationChange}
      />
      <Radio
        label={t("explorer.validate.publication")}
        id="publication-validate"
        name="publication"
        value={"RESTRAINT" as PublicationType}
        checked={radioPublicationValue === "RESTRAINT"}
        model={radioPublicationValue as string}
        onChange={handleRadioPublicationChange}
      />
    </>
  );
}
