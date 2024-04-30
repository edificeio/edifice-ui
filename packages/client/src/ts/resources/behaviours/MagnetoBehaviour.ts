import { AbstractBehaviourService } from "./AbstractBehaviourService";

type MagnetoData = {
  _id: string;
  title: string;
  imageUrl: string;
  ownerId: string;
  ownerName: string;
  shared?: [];
  modificationDate: string | number;
};

export class MagnetoBehaviour extends AbstractBehaviourService {
  APP = "magneto";
  RESOURCE = "magneto";

  async loadResources() {
    const magnetos = await this.httpGet<MagnetoData[]>(
      `/magneto/boards/editable`,
    );
    return magnetos.map((data) => {
      return this.dataToResource({
        _id: data._id,
        title: data.title,
        icon: data.imageUrl,
        owner: data.ownerId,
        ownerName: data.ownerName,
        path: `/magneto#/board/view/${data._id}`,
        shared: data.shared && data.shared.length >= 0 ? true : false,
        modified: "" + data.modificationDate,
      });
    });
  }
}
